from flask import Flask
from flask_cors import CORS
import rclpy
from flask_socketio import SocketIO
from rclpy.node import Node

class server_node(Node):

    def __init__(self):
        super().__init__('server')

    def print(self, text):
        self.get_logger().info(text)
 
app = Flask(__name__)
socket = SocketIO(app, cors_allowed_origins="*")
rclpy.init()
RosNode = server_node()

@app.route("/")
def hello_world():
    RosNode.print(" -->  rota '/' acessada")
    return "ok", 200

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