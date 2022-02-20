const express = require("express");

const PORT = 3050;
const app = express();

const {mw} = require("./mw_db");

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));

app.use("/mysql/connect",mw);

app.get("/mysql", function (request, response) {
  response.sendFile(__dirname + "/public/mysql.html");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});