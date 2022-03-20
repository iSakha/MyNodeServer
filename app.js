const express = require("express");
const ping = require('ping');

const PORT = 3050;
const app = express();

const { mw } = require("./mw_db");
const wol = require('wake_on_lan');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));

app.use("/mysql/connect", mw);

app.get("/mysql", function (request, response) {
  response.sendFile(__dirname + "/public/mysql.html");
});

app.get("/testpage", function (request, response) {
  response.sendFile(__dirname + "/public/testpage.html");
});

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
  console.log('We got ping!');
  let result = { msg: "msg" };
  let hosts = ['192.168.101.7'];
  // hosts.forEach(function (host) {
  //   ping.sys.probe(host, function (isAlive) {
  //     // var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
  //     var msg = isAlive ? 'host is alive' : 'host is dead';
  //     result = { msg: msg };
  //     console.log(result);
  //   });
  // });
  response.send(result);
});






app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});