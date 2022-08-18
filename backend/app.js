const bodyParser = require("body-parser");
const Axios = require("axios");
require("dotenv").config();
const express = require("express");
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/signin", async (req, res) => {
  const validateHuman = async (tokenID) => {
    const googleURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${tokenID}`;
    const options = {
      method: "POST",
      url: googleURL,
    };
    const response = await Axios(options);
    console.log(response.data, "Recaptcha Data");
    return response.data.success;
  };

  const human = await validateHuman(req.body.token);
  if (!human) {
    res.status(400).json({ error: "you are not fooling us, bot." });
    return;
  }

  res.json({ data: req.body });
});

app.listen(8080, () => console.log(`RUNNING ON PORT http://localhost:8080/`));
