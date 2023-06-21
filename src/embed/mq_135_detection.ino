#include <SPI.h>
#include <Ethernet.h>
#include <EthernetClient.h>
#include <ArduinoWebsockets.h>
#include <MQUnifiedsensor.h>

// Ethernet shield settings
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };  // Usar o mac adress do raspberry
IPAddress ip(192, 168, 1, 100);  // Usar o ip do arduino 
EthernetClient ethClient;

const char* webSocketServerAddress = "";
const uint16_t webSocketServerPort = ;

// Sensor details
#define placa "Arduino UNO"
#define Voltage_Resolution 5
#define pin A4
#define type "MQ-135"
#define ADC_Bit_Resolution 10
#define RatioMQ135CleanAir 3.6

// Declare Sensor
MQUnifiedsensor MQ135(placa, Voltage_Resolution, ADC_Bit_Resolution, pin, type);

// Inicializador do websocket 
WebsocketsClient webSocket;

// Estabelecendo conexão com o websocket
void connectToWebSocketServer() {
  Serial.print("Conectando ao WebSocket do Flask...");
  if (webSocket.connect(webSocketServerAddress, webSocketServerPort, "/")) {
    Serial.println("Foi!");
  } else {
    Serial.println("Não foi!");
  }
}

// Handler para lidar com GET
void handleGetRequest() {
  MQ135.update(); // Update data, read the voltage from the analog pin
  float ppm = MQ135.readSensor(); // Read PPM concentration using the model and calibration values

  String message = String(ppm);
  webSocket.send(message);
}

void setup() {
  Serial.begin(9600);

  // Initialize Ethernet shield
  Ethernet.begin(mac, ip);

  // Aguardando por conexão de internet
  while (!Ethernet.ready()) {
    delay(1000);
    Serial.println("Aguardando conexão com a rede...");
  }
  Serial.println("Conectado");

  // Initialize sensor
  MQ135.setRegressionMethod(1);
  MQ135.setA(605.18);
  MQ135.setB(-3.937);
  MQ135.init();
  float calcR0 = 0;
  for (int i = 1; i <= 10; i++) {
    MQ135.update();
    calcR0 += MQ135.calibrate(RatioMQ135CleanAir);
  }
  MQ135.setR0(calcR0 / 10);

  // Conectando com o webscoket
  connectToWebSocketServer();
}

void loop() {
  webSocket.loop();

  // Conexão perdida
  if (!webSocket.isConnected()) {
    connectToWebSocketServer();
  }

  // Enviando dados do sensor para o Flask 
  handleGetRequest();
}
