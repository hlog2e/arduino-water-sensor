#include <ESP8266WiFi.h> // ESP 8266 와이파이 라이브러리
#include <ESP8266HTTPClient.h> // HTTP 클라이언트


String url = "http://10.0.74.11:3221/api/v1/water";
String wifiSSID = "hserver";
String wifiPW = "wifi@72115490";




void setup()
{
  
  // 시리얼 Init
  Serial.begin(115200);
  Serial.println();

  // 와이파이 Join
  WiFi.begin(wifiSSID,wifiPW ); // AP SSID, PW
  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) // 와이파이 접속하는 동안 "." 출력
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

//만약 와이파이 접속 성공시 IP 출력
  Serial.print("ESP8266 IP address is: ");
  Serial.println(WiFi.localIP()); 
}

void loop() {
  int waterSensorValue = analogRead(A0);
  
  
  if (WiFi.status() == WL_CONNECTED) // 와이파이가 접속되어 있을때만
  {
    WiFiClient client; // 와이파이 클라이언트 Object
    HTTPClient http; // HTTP 클라이언트 Object


    http.begin(client, url);

      // Specify content-type header
      http.addHeader("Content-Type", "application/json");
      // Data to send with HTTP POST
      String httpRequestData = "{\"sensorValue\":"+String(waterSensorValue)+"}";           
      // Send HTTP POST request
      int httpResponseCode = http.POST(httpRequestData);
      Serial.println(httpRequestData);
      
     
      
    delay(3000);
  }
}
