const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

const database = require("./database/maria");
const port = process.env.PORT;

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
    }
  );
  console.log("Water Sensor Value ", waterSensorValue);
});

app.listen(port || 3000, () => {
  console.log("Server On", port, "port");
});
