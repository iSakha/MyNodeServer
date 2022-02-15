const express = require("express");
const PORT = 3050;
const app = express();

app.use(express.static(__dirname + "/public"));

app.listen(3050, () => {
    console.log(`Server running on port ${PORT}`)
})