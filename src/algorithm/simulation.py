#!/usr/bin/env python3 
 
import math 
import rclpy 
from rclpy.node import Node 
from geometry_msgs.msg import Twist 
from nav_msgs.msg import Odometry 
from tf_transformations import euler_from_quaternion 
 
class AStar: 
    class Node: 
 
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
         
        start_node = self.Node(None, self.start) 
        start_node.g = start_node.h = start_node.f = 0 
        end_node = self.Node(None, self.end) 
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
 
                 
                new_node = self.Node(current_node, node_position) 
 
                 
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
 
 
class RobotController(Node): 
    def __init__(self): 
        super().__init__('robot_controller') 
        self.pose_subscription = self.create_subscription( 
            msg_type=Odometry, 
            topic='odom', 
            callback=self.odometry_callback, 
            qos_profile=10 
        ) 

<<<<<<< Updated upstream
        self.publisher_ = self.create_publisher( 
            msg_type=Twist, 
            topic='cmd_vel', 
            qos_profile=10 
        ) 
=======
import math
import rclpy
import numpy as np 
from rclpy.node import Node
from geometry_msgs.msg import Twist
from nav_msgs.msg import Odometry
from tf_transformations import euler_from_quaternion
>>>>>>> Stashed changes

        self.current_position = [] 
         
        self.target_position = None 
         
        self.path = None 
         
        self.reached_target = True 

        self.currentTarget = 0  

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
        self.path = None 
        self.reached_target = False 
        self.calculate_path() 
 
    def calculate_path(self): 
        maze = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] 
  
        origin = maze[0][0] 
        astar = AStar(maze, (0, 0), self.target_position) 
        self.path = astar.find_path() 
 
    def move_to_target(self):
        if self.currentTarget >= len(self.path):  
            self.twist_msg_.linear.x = 0.0
            self.twist_msg_.angular.z = 0.0
            self.publisher_.publish(self.twist_msg_)
            return

        nextPose = self.path[self.currentTarget]

        dx = nextPose[0] - self.current_position[0]
        dy = nextPose[1] - self.current_position[1]
        dist = math.sqrt(dx*dx + dy*dy)
        ang = math.atan2(dy, dx) - self.current_position[2]
        direction = ang / abs(ang)

        if abs(ang) > 0.1:
            self.twist_msg_.linear.x = 0.0
            self.twist_msg_.angular.z = 0.1 * direction
        else:
            self.twist_msg_.angular.z = 0.0
            self.twist_msg_.linear.x = min(dist/2.0, 0.3)

        if dist < 0.1:
            self.currentTarget += 1

        self.publisher_.publish(self.twist_msg_)
<<<<<<< Updated upstream
 
def main(): 
    rclpy.init() 
    robot_controller = RobotController() 
 
    target_position = (1, 1) 
    robot_controller.set_target_position(target_position) 
 
    while rclpy.ok() and not robot_controller.reached_target: 
        rclpy.spin_once(robot_controller) 
 
    rclpy.shutdown() 
 
 
if __name__ == '__main__': 
    main()
=======

    def rotate(self, angular_velocity):
        self.twist_msg_.angular.z = angular_velocity
        self.publisher_.publish(self.twist_msg_)

    def move_forward(self, linear_velocity):
        self.twist_msg_.linear.x = linear_velocity
        self.publisher_.publish(self.twist_msg_)


def main():
    rclpy.init()
    robot_controller = RobotController()

    target_position = (7, 6)
    robot_controller.set_target_position(target_position)

    while rclpy.ok() and not robot_controller.reached_target:
        rclpy.spin_once(robot_controller)

    rclpy.shutdown()


if __name__ == '__main__':
    main()
>>>>>>> Stashed changes
