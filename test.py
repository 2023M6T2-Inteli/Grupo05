#! /usr/bin/env python3 

import math
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from nav_msgs.msg import Odometry
from tf_transformations import euler_from_quaternion


class AStar:
    class PointsPath:
        def __init__(self, parent=None, position=None):
            self.parent = parent
            self.position = position

            self.g = 0
            self.h = 0
            self.f = 0

        def __eq__(self, other):
            return self.position == other.position

    def __init__(self, maze, start, end):
        self.maze = maze
        self.start = start
        self.end = end

    def find_path(self):
        start_node = self.PointsPath(None, self.start)
        start_node.g = start_node.h = start_node.f = 0
        end_node = self.PointsPath(None, self.end)
        end_node.g = end_node.h = end_node.f = 0

        
        open_list = []
        closed_list = []

        open_list.append(start_node)

        while len(open_list) > 0:
            current_node = open_list[0]
            current_index = 0
            for index, item in enumerate(open_list):
                if item.f < current_node.f:
                    current_node = item
                    current_index = index

            open_list.pop(current_index)
            closed_list.append(current_node)


            if current_node == end_node:
                path = []
                current = current_node
                while current is not None:
                    path.append(current.position)
                    current = current.parent
                return path[::-1]  
            
            
            children = []
            for new_position in [(0, -1), (0, 1), (-1, 0), (1, 0), (-1, -1), (-1, 1), (1, -1), (1, 1)]:  

                node_position = (
                current_node.position[0] + new_position[0], current_node.position[1] + new_position[1])


                if node_position[0] > (len(self.maze) - 1) or node_position[0] < 0 or node_position[1] > (
                len(self.maze[len(self.maze) - 1]) - 1) or node_position[1] < 0:
                    continue

                
                if self.maze[node_position[0]][node_position[1]] != 0:
                    continue

                
                new_node = self.PointsPath(current_node, node_position)

                
                children.append(new_node)

            
            for child in children:

                for closed_child in closed_list:
                    if child == closed_child:
                        continue

                child.g = current_node.g + 1
                child.h = ((child.position[0] - end_node.position[0]) ** 2) + (
                (child.position[1] - end_node.position[1]) ** 2)
                child.f = child.g + child.h

                for open_node in open_list:
                    if child == open_node and child.g > open_node.g:
                        continue

                open_list.append(child)
    
        print(open_list)

class RobotController(Node):
    def __init__(self):
        super().__init__('robot_controller')
        self.pose_subscription = self.create_subscription(
            msg_type=Odometry,
            topic='odom',
            callback=self.odometry_callback,
            qos_profile=10
        )

        self.publisher_ = self.create_publisher(
            msg_type=Twist,
            topic='cmd_vel',
            qos_profile=10
        )

        self.current_position = []
        
        self.target_position = None
        
        self.path = None
        
        self.reached_target = True

        self.twist_msg_ = Twist()


    def odometry_callback(self, msg):
        x = msg.pose.pose.position.x
        y = msg.pose.pose.position.y
        orientation = msg.pose.pose.orientation
        _, _, theta = euler_from_quaternion([orientation.x, orientation.y, orientation.z, orientation.w])

        self.current_position = [x, y, theta]

        if self.target_position is not None and not self.reached_target:
            self.move_to_target()

    def set_target_position(self, position):
        self.target_position = position

        self.calculate_path()
            
        self.reached_target = False
        
        print(self.target_position)
               
    def calculate_path(self):
        print('calculando')
        maze = [[0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
                [0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
                [0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 1, 1, 0, 0, 0, 1, 0, 0, 1],
                [0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]

        astar = AStar(maze, (0, 0), self.target_position)
        print(self.target_position)
        self.path = astar.find_path()
        print(f'The path to be followed is: {self.path}')


    def move_to_target(self):
        if self.path is None or len(self.path) == 0: 
            self.stop_robot()
        else:
            target_x, target_y = self.target_position
            
            # print(f'Current target is: {self.target_position}')
            
            current_x, current_y, current_theta = self.current_position

            dist_x = target_x - current_x 
            dist_y = target_y - current_y

            euclidean_dist = math.sqrt(dist_x ** 2 + dist_y ** 2)
            # print(f'This is the e{euclidian_dist}')
            angle = math.atan2(dist_y, dist_x) - current_theta
            # print(f'This is the angle: {angle}')
            angle_diff = math.atan2(math.sin(angle), math.cos(angle))

            print(angle_diff)
            linear_velocity = min(euclidean_dist, 1.0) 
            # print(linear_velocity, angle_diff)
            
            angular_velocity = angle_diff

            self.twist_msg_.linear.x = linear_velocity
            self.twist_msg_.angular.z = angular_velocity
            self.publisher_.publish(self.twist_msg_)

        if euclidean_dist < 0.05: 
            self.path.pop(0)
            print(f'Current path is: {self.path}')
            #[(0, 0), (1, 1), (2, 1), (3, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 6)]

    def stop_robot(self): 
        # print('Robot has stopped')
        self.twist_msg_.linear.x = 0.0 
        self.twist_msg_.angular.z = 0.0        
        self.publisher_.publish(self.twist_msg_)

    def rotate(self, angular_velocity):
        self.twist_msg_.linear.x = 0.0
        self.twist_msg_.angular.z = min(angular_velocity, 0.05)
        self.publisher_.publish(self.twist_msg_)

    def move_forward(self, linear_velocity):
        print(f'The linear velocity is: {linear_velocity}')
        self.twist_msg_.linear.x = linear_velocity
        self.publisher_.publish(self.twist_msg_)


def main(args = None):
    rclpy.init(args = args)
    robot_controller = RobotController()

    target_position = ((7, 6))
    robot_controller.set_target_position(target_position)

    while rclpy.ok() and not robot_controller.reached_target:
        rclpy.spin_once(robot_controller)
    
    rclpy.shutdown()


if __name__ == '__main__':
    main()
