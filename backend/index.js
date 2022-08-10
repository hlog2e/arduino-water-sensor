const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

const database = require("./database/maria");
const port = process.env.PORT;

const { SolapiMessageService } = require("solapi");
const messageService = new SolapiMessageService(
  process.env.SOLAPI_API_KEY,
  process.env.SOLAPI_API_SECRET
);

app.post("/api/v1/water", (req, res) => {
  const waterSensorValue = req.body.sensorValue;
  database.query(
    "insert into TB_WATER_SENSOR values (?,?,?,?,NOW(),?,?)",
    [
      null,
      "672f9a5f-0bd9-488d-9193-83ae9023d9ad",
      "금천고 앞 맨홀",
      waterSensorValue,
      "36.62738",
      "127.51166",
    ],
    (err) => {
      if (err) console.log(err);
      if (waterSensorValue > 300) {
        messageService
          .send([
            {
              to: "01072115490",
              from: "01072115490",
              text: "금천고등학교(호미로 233번길 65) 앞 맨홀에서 이상 수위가 감지되었습니다. 현재 [위험] 단계입니다. 해당 지역에 진입을 자제해 주시기 바랍니다.",
            },
          ])
          .then((res) => console.log(res));
      }
      if (waterSensorValue > 400) {
        messageService
          .send([
            {
              to: "01072115490",
              from: "01072115490",
              text: "금천고등학교(호미로 233번길 65) 앞 맨홀에서 이상 수위가 감지되었습니다. 현재 [경계] 단계입니다. 해당 지역에 진입을 자제해 주시기 바랍니다.",
            },
          ])
          .then((res) => console.log(res));
      }
      if (waterSensorValue > 500) {
        messageService
          .send([
            {
              to: "01072115490",
              from: "01072115490",
              text: "금천고등학교(호미로 233번길 65) 앞 맨홀에서 이상 수위가 감지되었습니다. 현재 [심각] 단계입니다. 현 시간부로 해당 지역에 진입을 금지합니다.",
            },
          ])
          .then((res) => console.log(res));
      }
    }
  );
  console.log("Water Sensor Value ", waterSensorValue);
});

app.listen(port || 3000, () => {
  console.log("Server On", port, "port");
});
