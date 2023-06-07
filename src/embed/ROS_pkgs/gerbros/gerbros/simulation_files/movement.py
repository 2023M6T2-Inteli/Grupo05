import rclpy
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

        self.target_position = None


    def movement_callback(self, msg):
        x = msg.distance_x
        y = msg.distance_y
        theta = msg.angle
        self.target_position = [x, y, theta]

