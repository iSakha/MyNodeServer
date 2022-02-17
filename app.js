const express = require("express");

const PORT = 3050;
const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/mysql", function(request, response){
     
    // response.send("<h1>MySQL</h1>");
    response.sendFile(__dirname + "/public/mysql.html");
});


const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    port: 23308,
    user: "root",
    // database: "usersdb",
    password: "Sakha2836"
  });

  //    Test connection
  connection.connect(function(err){
    if (err) {
      return console.error("Error: " + err.message);
    }
    else{
      console.log("Successfully connected to MysqlServer");
    }
 });
  //    Close connection
  connection.end(function(err) {
    if (err) {
      return console.log("Error: " + err.message);
    }
    console.log("Connection closed");
  });

app.listen(3050, () => {
    console.log(`Server running on port ${PORT}`)
})

