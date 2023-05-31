import rclpy
from rclpy.node import Node
from time import sleep


class Test(Node):
    def __init__(self):    
        super().__init__("Test")

    def print(self):
        self.get_logger().info("Hello World")
        
def main():
    rclpy.init()
    node = Test()
    while True:
        node.print()
        sleep(2)

    rclpy.shutdown()

if __name__ == '__main__':
    main()