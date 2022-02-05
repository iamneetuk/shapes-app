const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let allShapes = []

app.post("/addShapes", (req, res) => {
  if(req.body!== undefined && "shape" in req.body){
    var newShape = req.body.shape;
    console.log(newShape);
    allShapes.push(newShape)
    res.status(200).send(allShapes);
  }
});

app.get("/getShapes", (req, res) => {
    res.status(200).send(allShapes);
});


app.listen(3001, () => {
  console.log(`Yey, your server is running on port ${3001}`);
});