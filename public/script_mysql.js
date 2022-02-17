

document.getElementById('test').addEventListener('click', showTest);
document.getElementById('work').addEventListener('click', showWork);


function showTest() {
    hideDivs();
    let divTest = document.getElementsByClassName('connect')[0];
    divTest.classList.remove('d-none');
}

function showWork() {
    hideDivs();
    let divTest = document.getElementsByClassName('connect')[1];
    divTest.classList.remove('d-none');
}

function hideDivs() {
    let divTest = document.getElementsByClassName('connect')[0];
    divTest.classList.add('d-none');
    divTest = document.getElementsByClassName('connect')[1];
    divTest.classList.add('d-none');
}

document.getElementById('btn-connect').addEventListener('click', function (e) {
    e.preventDefault();
    connectServer();
});
// document.getElementById('btn-connect').addEventListener('click', disconnectServer);

function connectServer() {

    let user = {};
    user.name = "Johnson";
    user.pass = "1234";
    let user_str = JSON.stringify(user);
    let request = new XMLHttpRequest();
    request.open("POST", "/mysql", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
        // получаем и парсим ответ сервера
         let receivedUser = JSON.parse(request.response);
         console.log(receivedUser);   // смотрим ответ сервера
     });
     request.send(user_str);
}