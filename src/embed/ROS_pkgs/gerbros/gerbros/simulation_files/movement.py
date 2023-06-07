import rclpy
from rclpy.clock import Clock
from rclpy.node import Node
from geometry_msgs.msg import Twist
from interfaces.msg import MovementInfo

class MovementMethods(Node):
    def __init__(self):
        super().__init__('movement_methods')
        self.publisher = self.create_publisher(
            msg_type = Twist,
            topic = '/cmd_vel',
            qos_profile = 10
        )
        self.subscription = self.create_subscription(
            msg_type = MovementInfo,
            topic = '/movement_info',
            callback = self.movement_callback,
            qos_profile = 10
        )
        self.get_logger().info('MovementMethods node has been started')

        self.twist_msg = Twist()

        self.timer = self.create_timer(1.0, self.rotate_interval)

    def rotate_interval(self):
        self.twist_msg.angular.z = 1.5708
        self.publisher.publish(self.twist_msg)

    def movement_callback(self, msg):
        distance_x = msg.distance_x
        distance_y = msg.distance_y
        angle = msg.angle
        if distance_x > distance_y and angle < 0.0:
            self.twist_msg.linear.x = min(1.0, distance_x)
            self.publisher.publish(self.twist_msg)
        elif distance_y > distance_x:
            self.twist_msg.linear.y = min(1.0, distance_y)
            self.publisher.publish(self.twist_msg)
        


