const express = require("express");
const ping = require('ping');

const PORT = 3050;
const app = express();

const { mw } = require("./mw_db");
const wol = require('wake_on_lan');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//      Get Home page
// ==========================================================
app.use(express.static(__dirname + "/public"));
//      Get Mysql page
// ==========================================================
app.get("/mysql", function (request, response) {
  response.sendFile(__dirname + "/public/mysql.html");
});
//      Get test page
// ==========================================================
app.get("/testpage", function (request, response) {
  response.sendFile(__dirname + "/public/testpage.html");
});

//      Connect to db
// ==========================================================
app.use("/mysql/connect", mw);

//      Wake on lan
// ==========================================================
app.get("/wol/nas4free", function (request, response) {

  wol.wake('00:24:1D:2F:89:E4');
  wol.createMagicPacket('00:24:1D:2F:89:E4');
  console.log("Magic packet sent to NAS4Free server");

  response.send("Magic packet sent to NAS4Free server");

});

app.get("/wol/homepc", function (request, response) {

  wol.wake('18:C0:4D:DC:D6:21');
  wol.createMagicPacket('18:C0:4D:DC:D6:21');
  console.log("Magic packet sent to homePC");

  response.send("Magic packet sent to homePC");

});

//      Ping
// =========================================================

app.post("/ping", function (request, response) {
  console.log('We sent ping to', request.body.ip);
  let result = { msg: "msg" };
  let hosts = [request.body.ip];

  hosts.forEach(function (host) {
    ping.sys.probe(host, function (isAlive) {
      var msg = isAlive ? 'host is alive' : 'host is dead';
      result = { msg: msg };
      console.log(result);
      response.send(result);
    });
  });

});




  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  });