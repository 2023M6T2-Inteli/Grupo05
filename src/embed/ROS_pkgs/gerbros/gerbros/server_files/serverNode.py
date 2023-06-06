import rclpy
from rclpy.node import Node
from interfaces.srv import RouteInfo


class server_node(Node):

    def __init__(self):
        super().__init__('server')
        self.runningInfoSubscriber = self.create_subscription(RouteInfo, '/running_info', self.runningInfoCallback, 10)

    def print(self, text):
        self.get_logger().info(text)

    #essa função envia os dados 
    def startRoute(self,
                   maze="[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]",
                   points="[3,4],[2,7]",
                   origin="[1,2]"
                   ):
        self.print("função startRoute chamado")
        routeService = self.create_client(RouteInfo, '/route_info', 10)
        msg = RouteInfo()
        msg.maze = maze
        msg.points = points
        msg.origin = origin
        results = routeService.call_async(msg)
        results.add_done_callback(self.startRouteCallback)
        self.print("chamada feita, aguardando resposta")

    def startRouteCallback(self, future):
        try:
            response = future.result()
            self.print(f"resposta do serviço: {response.status}")
        except Exception as e:
            self.print(f"serviço falhou: {e}")
