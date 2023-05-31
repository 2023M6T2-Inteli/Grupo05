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
                if (
                    node_position[0] >= 0 and
                    node_position[0] < len(self.maze) and
                    node_position[1] >= 0 and
                    node_position[1] < len(self.maze[node_position[0]]) and
                    self.maze[node_position[0]][node_position[1]] == 0
                ):
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

        self.publisher_ = self.create_publisher(
            msg_type=Twist,
            topic='cmd_vel',
            qos_profile=10
        )

        self.current_position = []

        self.target_position = None

        self.target_positions = []

        self.path = None

        self.reached_target = True

        self.currentTarget = 0

        self.twist_msg_ = Twist()

        self.origin = (0,0)

    def odometry_callback(self, msg):
        x = msg.pose.pose.position.x
        y = msg.pose.pose.position.y
        orientation = msg.pose.pose.orientation
        _, _, theta = euler_from_quaternion([orientation.x, orientation.y, orientation.z, orientation.w])

        self.current_position = [x, y, theta]

        if self.target_positions and not self.reached_target:
            self.move_to_target()

    def set_target_positions(self, positions):
        self.target_positions = positions
        self.path = None
        self.reached_target = False
        self.calculate_path()

    def calculate_path(self):
        maze = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]


        if (
            self.target_positions[0][0] < 0 or
            self.target_positions[0][0] >= len(maze) or
            self.target_positions[0][1] < 0 or
            self.target_positions[0][1] >= len(maze[0])
        ):
            raise ValueError('Invalid initial position')

        if (
            self.target_positions[-1][0] < 0 or
            self.target_positions[-1][0] >= len(maze) or
            self.target_positions[-1][1] < 0 or
            self.target_positions[-1][1] >= len(maze[0])
        ):
            raise ValueError('Invalid final position')

        astar = AStar(maze, self.origin, self.target_positions[-1])
        path = astar.find_path()

        if path is None:
            raise ValueError('No valid path found')

        self.path = path

    def move_to_target(self):
        if self.currentTarget >= len(self.target_positions):
            self.twist_msg_.linear.x = 0.0
            self.twist_msg_.angular.z = 0.0
            self.publisher_.publish(self.twist_msg_)
            return

        target_x, target_y = self.target_positions[self.currentTarget]
        current_x, current_y, current_theta = self.current_position

        distance = math.sqrt((target_x - current_x) ** 2 + (target_y - current_y) ** 2)
        angle = math.atan2(target_y - current_y, target_x - current_x)

        if distance < 0.2:
            self.currentTarget += 1
            if self.currentTarget >= len(self.target_positions):
                self.reached_target = True
                self.target_positions = []
                self.path = None
            return

        angle_diff = angle - current_theta
        if angle_diff > math.pi:
            angle_diff -= 2 * math.pi
        if angle_diff < -math.pi:
            angle_diff += 2 * math.pi

        if abs(angle_diff) > 0.15:
            self.twist_msg_.linear.x = 0.0
            self.twist_msg_.angular.z = 0.5 * angle_diff
        else:
            self.twist_msg_.linear.x = 0.5
            self.twist_msg_.angular.z = 0.0

        self.publisher_.publish(self.twist_msg_)  

def main():
    rclpy.init()

    robot_controller = RobotController()

    try:
        target_positions = [(3,3),(2,2),(3,1), robot_controller.origin]
        robot_controller.set_target_positions(target_positions)

        rclpy.spin(robot_controller)
    except KeyboardInterrupt:
        pass

    robot_controller.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
