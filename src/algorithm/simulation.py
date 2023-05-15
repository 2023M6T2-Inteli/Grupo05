import math
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from nav_msgs.msg import Odometry
from tf_transformations import euler_from_quaternion

class TargetPathFinding(Node):
    
    def __init__(self, simulation_timer=0.05):
        super().__init__('target_path_finding')
        
        self.pose_subscription = self.create_subscription(
            msg_type=Odometry,
            topic='odom',
            callback=self.position_callback,
            qos_profile=10
        )

        self.publisher_ = self.create_publisher(
            msg_type=Twist,
            topic='cmd_vel',
            qos_profile=10
        )
        
        self.timer_ = self.create_timer(
            simulation_timer, 
            self.updated_vertex_callback
        )
        
        self.twist_msg_ = Twist()
        
        self.current_pose_ = []
        self.target_pose_ = None
       

    def vertex_callback(self):
        if self.target_pose_ is None:
            return
        
        dx = self.target_pose_[0] - self.current_pose_[0]
        dy = self.target_pose_[1] - self.current_pose_[1]
        
        dist = math.sqrt(dx ** 2 + dy ** 2)
        ang = math.atan2(dy, dx) - self.current_pose_[2]

        ang_diff = math.atan2(math.sin(ang), math.cos(ang))

        linear_velocity = min(dist, 1.0) 
        angular_velocity = ang_diff

        self.twist_msg_.linear.x = linear_velocity
        self.twist_msg_.angular.z = angular_velocity

        self.publisher_.publish(self.twist_msg_)

    def position_callback(self, msg):
        x = msg.pose.pose.position.x
        y = msg.pose.pose.position.y
        z = msg.pose.pose.position.z
        orientation = msg.pose.pose.orientation
        _, _, theta = euler_from_quaternion([orientation.x, orientation.y, orientation.z, orientation.w])
        self.current_pose_ = [x, y, theta]

    def get_user_input(self):
        x = float(input("Enter the target X coordinate: "))
        y = float(input("Enter the target Y coordinate: "))
        self.target_pose_ = [x, y]

    def updated_vertex_callback(self):
        if len(self.current_pose_) == 0:
            return
        
        self.vertex_callback()

def main(args=None):

    rclpy.init(args=args)
    
    target_path_finding = TargetPathFinding()
    
    target_path_finding.get_user_input()
    
    rclpy.spin(target_path_finding)
    
    target_path_finding.destroy_node()
    
    rclpy.shutdown()

if __name__ == '__main__':
    main()
