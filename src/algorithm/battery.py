import rclpy
from rclpy.node import Node
from sensor_msgs.msg import BatteryState

class TurtlebotBattery(Node):
    def __init__(self):
        super().__init__('turtlebot_controller')
        self.baterry_ = self.create_subscription(BatteryState, 'turtlebot3_node/battery_state',  self.handleBattery, 10)

    def handleBattery(self, battery):
        
        print(battery)
        
        return (battery.voltage)

def main():
    rclpy.init()

    battery = TurtlebotBattery()

    rclpy.spin(battery)

    rclpy.shutdown()

if __name__ == '__main__':
    main()