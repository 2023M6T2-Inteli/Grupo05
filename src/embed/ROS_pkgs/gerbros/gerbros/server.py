from flask import Flask, request
from flask_cors import CORS
import rclpy
from flask_socketio import SocketIO
import serial 

from .server_files.serverNode import server_node

# variavel que indica se o websocket está disponível para receber mensagens
ws_started = False
app = Flask(__name__)
CORS(app)
socket = SocketIO(app, cors_allowed_origins="*")
rclpy.init()
RosNode = server_node()

serial_port = '/dev/ttyACM0'
ser = serial.Serial(serial_port, 9600)

@app.route("/")
def hello_world():
    RosNode.print(" -->  rota '/' acessada")
    return "ok", 200

# Rota responsável por receber as infos necessárias e iniciar a rotina do robo
@app.route("/startMovement")
def startMovement():
    try:
        # if not request.is_json: return "o corpo da requisição deve ser um json", 400
        # data = request.json()
        global ws_started
        #permite a comunicação do websocket
        RosNode.print(" -->  rota '/startMovement' acessada")
        send_ppm()
        # response = RosNode.startRoute()

        # if response == True:
        #     ws_started = True
        #     #colocar aqui a logica de enviar as infos da run atual via websocket
        #     return 'ok', 200
    
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

def send_ppm():
    ppm = float(ser.readline().strip().decode('utf-8'))
    RosNode.print(f"ppm recebido: {ppm}")
    # socket.emit("ppm", ppm)

def main():
    socket.run(app,debug=True, host="0.0.0.0", use_reloader=True, allow_unsafe_werkzeug=True)