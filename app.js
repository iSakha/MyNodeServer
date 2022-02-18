const express = require("express");

const PORT = 3050;
const app = express();
let userName;
let userPass;
let connection;
let result = "";

const jsonParser = express.json();

app.use(express.static(__dirname + "/public"));

app.get("/mysql", function (request, response) {
  response.sendFile(__dirname + "/public/mysql.html");
});

app.post("/mysql/connect", jsonParser, function (request, response) {
  // console.log(request.body);
  getCreds(request.body);
  // let sqlResponse = openConnection();
  console.log(request.body);
  // console.log("res: " + sqlResponse);

  if (!request.body) return response.sendStatus(400);

  // response.json(request.body); // отправляем пришедший ответ обратно
  myResponse(response);

});

async function myResponse(response) {
  await openConnection();
  
  if(result == "success") {
    response.json({"result": "success"});
  }else {
    response.json({"result": "error"});
  }
  
}

app.post("/mysql/disconnect", jsonParser, function (request, response) {
  console.log(request.body);
  // getCreds(request.body);
  closeConnection();
  // closeConnection();
  if (!request.body) return response.sendStatus(400);

  // response.json(request.body); // отправляем пришедший ответ обратно
  response.json({ "result": "disconnected" });
});

const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: "localhost",
//   port: 23308,
//   user: userName,
//   // database: "usersdb",
//   password: userPass
// });


function getCreds(user) {
  // console.log(user);
  userName = user.name;
  userPass = user.pass;
}
// ==========================================================================
async function openConnection() {

  connection = mysql.createConnection({
    host: "localhost",
    port: 23308,
    user: userName,
    // database: "usersdb",
    password: userPass
    
  });

return connectToMysqlServer(connection); 
  // return connectToMysqlServer();
} 

  function connectToMysqlServer(connection) {
    // connection  = openConnection();

    //    Test connection
    connection.connect(function (err) {
      if (err) {
        console.error("Error: " + err.message);
        result = "error"
        console.log("result: " + result);
        return result;
      }
      else {
        console.log("Successfully connected to MysqlServer");
        result = "success";
        console.log("result: " + result);
        return result;
      }
    });
  }

// ==========================================================================
function closeConnection() {

  connection = mysql.createConnection({
    host: "localhost",
    port: 23308,
    user: userName,
    // database: "usersdb",
    password: userPass
  });

  //    Close connection
  connection.end(function (err) {
    if (err) {
      return console.log("Error: " + err.message);
    }
    console.log("Connection closed");
  });
}

app.listen(3050, () => {
  console.log(`Server running on port ${PORT}`)
})

