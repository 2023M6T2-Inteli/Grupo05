from flask import Flask, request
from flask_cors import CORS
import rclpy
from flask_socketio import SocketIO

from .server_files.serverNode import server_node

# variavel que indica se o websocket está disponível para receber mensagens
ws_started = False
app = Flask(__name__)
CORS(app)
socket = SocketIO(app, cors_allowed_origins="*")
rclpy.init()
RosNode = server_node()


@app.route("/")
def hello_world():
    RosNode.print(" -->  rota '/' acessada")
    return "ok", 200

# Rota responsável por receber as infos necessárias e iniciar a rotina do robo
@app.route("/startMovement")
def startMovement():
    try:
        global ws_started

        RosNode.print(" -->  rota '/startMovement' acessada")
        response = RosNode.startRoute()

        if response == True:
            ws_started = True
            #colocar aqui a logica de enviar as infos da run atual via websocket
            return 'ok', 200
    
    except Exception as e:
        return str(e), 500
    

@socket.on("connect")
def connected():
    global ws_started
    if not ws_started:
        RosNode.print("websocket recusou um pedido de conexão")
        return False
    RosNode.print(" -->  websocket conectado")
    socket.emit("message","sucess")


@socket.on("message")
def handle_messages(data): 
    global ws_started
    if not ws_started:
        RosNode.print("websocket recusou uma mensagem pois está indisponivel")
        return
    RosNode.print(f"-----------mensagem recebida via websocket: {data} ----")
    socket.emit("message", "success")

def main():
    socket.run(app,debug=True, host="0.0.0.0", use_reloader=True, allow_unsafe_werkzeug=True)