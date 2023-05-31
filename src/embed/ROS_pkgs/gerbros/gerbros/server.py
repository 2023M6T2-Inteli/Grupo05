from flask import Flask
from flask_cors import CORS
import rclpy
from flask_socketio import SocketIO
from rclpy.node import Node
from interfaces.msg import RouteInfo

class server_node(Node):

    def __init__(self):
        super().__init__('server')

    def print(self, text):
        self.get_logger().info(text)

    def startRoute(self):
        vaisefoder = self.create_publisher(RouteInfo, '/route_info', 10)
        msg = RouteInfo()
        msg.maze = "[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]"
        msg.points = "[3,4],[2,7]"
        msg.origin = "[1,2]"
        vaisefoder.publish(msg)

app = Flask(__name__)
socket = SocketIO(app, cors_allowed_origins="*")
rclpy.init()
RosNode = server_node()

@app.route("/")
def hello_world():
    RosNode.print(" -->  rota '/' acessada")
    return "ok", 200

@app.route("/startMovement")
def startMovement():
    RosNode.startRoute()
    return 'ok'

@socket.on("connect")
def connected():
    RosNode.print(" -->  websocket conectado")
    socket.emit("message","sucess")
    
@socket.on("message")
def handle_messages(data): 
    RosNode.print(f"-----------mensagem recebida via websocket: {data} ----")
    socket.emit("message", "success")

def main():

    socket.run(app,debug=True, use_reloader=True, allow_unsafe_werkzeug=True)