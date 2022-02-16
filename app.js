const express = require("express");
const PORT = 3050;
const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/mysql", function(request, response){
     
    // response.send("<h1>MySQL</h1>");
    response.sendFile(__dirname + "/public/mysql.html");
});

app.listen(3050, () => {
    console.log(`Server running on port ${PORT}`)
})

