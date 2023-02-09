const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3031;
require("dotenv/config");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
/* app.use(bodyParser.json()); */
/* express.json() is included by default in newer versions of express. Else we have to use bodyParser.json() */
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

app.get("/recipes/:recipeName", (req, res) => {
  const recipeName = req.params.recipeName;
  let apiUrl = `https://api.edamam.com/search?q=${recipeName}&app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}&from=0&to=12&calories=591-722&health=alcohol-free`;
  try {
    axios
      .get(apiUrl)
      .then((response) => {
        //console.log(response.data);
        res.status(200).json(response.data);
      })
      .catch(function (error) {
        // handle error
        res
          .status(error.response.status)
          .json({ error: error.response.data.message });
        //console.log(error.response);
      });
  } catch {
    res.status(500).json({ message: err });
  }
});

app.listen(PORT);
