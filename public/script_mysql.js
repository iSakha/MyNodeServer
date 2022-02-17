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

