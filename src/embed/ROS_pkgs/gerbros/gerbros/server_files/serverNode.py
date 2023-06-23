import rclpy
from rclpy.node import Node
# from interfaces.srv import RouteInfo


class server_node(Node):

    def __init__(self):
        super().__init__('server')

    def print(self, text):
        self.get_logger().info(text)

    #essa função envia os dados 
    def startRoute(self,
                   maze="[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]",
                   points="[3,4],[2,7]",
                   origin="[1,2]"
                   ):
        try:
            self.print("função startRoute chamado")
            routeService = self.create_client(RouteInfo, '/route_info')
            request = RouteInfo.Request()
            request.maze = maze
            request.points = points
            request.origin = origin
            self.print("chamando serviço, aguardando resposta...")
            results = routeService.call(request)

            response = results.result()
            self.print(f"resposta do serviço: {response.status}")

            return (True if response.status == "OK" else response.status)

        except Exception as e:
            return e
