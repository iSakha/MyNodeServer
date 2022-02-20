const mysql = require("mysql2");

async function connectToMysqlServer(user, pass) {

    const connection = mysql.createConnection({
        host: "localhost",
        port: 23308,
        user: user,
        password: pass
    });

    //    Test connection
    await connection.connect(function (err) {
        if (err) {
            console.error("Error: " + err.message);
            let result = "error"
            console.log("result: " + result);
            return result;
        }
        else {
            console.log("Successfully connected to MysqlServer");
            let result = "success";
            console.log("result: " + result);
            return result;
        }

    });

    // return "success";
    return "error";

}


async function mw(req, res, next) {
    console.log(req.method);
    console.log(req.body);
    let user = req.body.name;
    let pass = req.body.pass;
    if (!req.body) return response.sendStatus(400);
    let result = await connectToMysqlServer(user, pass);
    console.log(result);
    if (result == "success") {
        res.json({ "result": "success" });
    } else {
        res.json({ "result": "error" });
    }
    console.log("response sent");
    next();
};

module.exports = { mw };