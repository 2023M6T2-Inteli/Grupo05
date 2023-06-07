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

        self.response = None
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
            self.get_logger().info(f'Result: {response}')
        except Exception as e:
            self.get_logger().error(f'Service call failed: {e}')

    def odometry_callback(self, msg):
        x = msg.pose.pose.position.x
        y = msg.pose.pose.position.y
        orientation = msg.pose.pose.orientation
        _, _, theta = euler_from_quaternion([orientation.x, orientation.y, orientation.z, orientation.w])

        self.current_position = [x, y, theta]
    
    def process_responses(self, response):
        self.maze = response.maze
        self.origin = response.origin
        self.points = response.points

        self.path = Algorithm.find_path(self.maze, self.origin, self.points)
        self.get_logger().info(f'Path: {self.path}')



    def publish_data(self):
        
        pass

def main():
    rclpy.init()

    robot_controller = RobotController()
    rclpy.spin(robot_controller)
    robot_controller.destroy_node()
    rclpy.shutdown()
