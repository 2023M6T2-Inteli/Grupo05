import math
import numpy as np 
import rclpy
from rclpy.node import Node
from nav_msgs.msg import Odometry
from tf_transformations import euler_from_quaternion
from interfaces.msg import MovementInfo
from interfaces.srv import RouteInfo

from .simulation_files.algorithm import Algorithm
from .server_files.converter import Converter

class RobotController(Node):
    def __init__(self):
        super().__init__('robot_controller')
        self.subscription = self.create_subscription(
            msg_type=Odometry,
            topic='odom',
            callback=self.odometry_callback,
            qos_profile=10
        )

        self.publisher_ = self.create_publisher(
            msg_type = MovementInfo, 
            topic = '/movment_info', 
            qos_profile = 10
        )

        self.client = self.create_client(RouteInfo, '/route_info')

        self.timer = self.create_timer(1.0, self.timer_callback)

        self.request = RouteInfo.Request()

        self.maze = None
        self.origin = None
        self.points = None

    def timer_callback(self):
        if not self.client.wait_for_service(timeout_sec=1.0):
            self.get_logger().warn('Service not available')
            return

        self.request.maze   
        self.request.origin
        self.request.points

        future = self.client.call_async(self.request)
        future.add_done_callback(self.callback)

    def callback(self, future):
        try:
            response = future.result()
            self.response = response  
            self.get_logger().info(f'Result: {response.sum}')
    
        except Exception as e:
            self.get_logger().error(f'Service call failed: {e}')

    def odometry_callback(self, msg):
        x = msg.pose.pose.position.x
        y = msg.pose.pose.position.y
        orientation = msg.pose.pose.orientation
        _, _, theta = euler_from_quaternion([orientation.x, orientation.y, orientation.z, orientation.w])

        self.current_position = [x, y, theta]
    
    def process_responses(self):
        astar = Algorithm(self.maze, self.origin, self.points)
        self.path = Algorithm.find_path(astar)
        self.get_logger().info(f'Path: {self.path}')

    def process_path(self):
        if len(self.path) > 0:
            next_position = self.path.pop(0)
            self.get_logger().info(f'Next position: {next_position}')
            msg = MovementInfo()
            msg.x = next_position[0]
            msg.y = next_position[1]
            self.publisher_.publish(msg)
        else:
            self.get_logger().info('Path finished')

    # def publish_data(self):
    #     msg = MovementInfo()
    #     self.publisher_.publish(msg)

def main():
    rclpy.init()

    robot_controller = RobotController()
    rclpy.spin(robot_controller)
    robot_controller.destroy_node()
    rclpy.shutdown()
