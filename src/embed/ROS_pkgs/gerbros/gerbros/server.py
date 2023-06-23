from flask import Flask, request
from flask_cors import CORS
import rclpy
from flask_socketio import SocketIO
import serial 
from server_files.serverNode import server_node
import cv2
import base64

# variavel que indica se o websocket está disponível para receber mensagens
ws_started = True
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
        #permite a comunicação do websocket
        RosNode.print(" -->  rota '/startMovement' acessada")
        ser.flushInput()
        ser.flushOutput()
        ser.write(b's')
        ppm = read_ppm()
        socket.emit("ppm", ppm)
        return "ok", 200
    
    except Exception as e:
        return str(e), 500
    

@socket.on("connect")
def connected():
    RosNode.print(" -->  websocket conectado")
    socket.emit("message","sucess")

def gen_frame():
    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        ret, jpeg = cv2.imencode('.jpg', frame)
        frame = base64.b64encode(jpeg.tobytes()).decode('utf-8')
        yield frame

@socket.on('stream')
def handle_stream(json):
    while True:
        frame = next(gen_frame())
        socket.emit('stream_response', {'image': frame})

@socket.on("message")
def handle_messages(data): 
    global ws_started
    if not ws_started:
        RosNode.print("websocket recusou uma mensagem pois está indisponivel")
        return
    RosNode.print(f"-----------mensagem recebida via websocket: {data} ----")
    socket.emit("message", "success")

def read_ppm():
    while True:
        ppm = ser.readline().strip().decode('utf-8')
        try:
            ppm = float(ppm)
            RosNode.print(f"ppm recebido: {ppm}")
            return ppm
        except:
            RosNode.print(f"erro ppm")
            continue

def main():
    socket.run(app,debug=True, host="0.0.0.0", use_reloader=True, allow_unsafe_werkzeug=True)