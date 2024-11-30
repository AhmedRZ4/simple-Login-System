const userName = document.getElementById("sUName");
const sUEmail = document.getElementById("sUEmail");
const sUPass = document.getElementById("sUPass");
const lPass = document.getElementById("lPass");
const lEmail = document.getElementById("lEmail");
const userNameHomeDisplay = document.getElementById("userName");
const newWin = null;
let users = [];
//#region local storage
// check for local storage
if (getFromLocal("users") != null) {
    users = getFromLocal("users");
}
if (getFromLocal("userName") != null) {
    const userNameValue = getFromLocal("userName");
    const urlName = window.location.href;
    if (urlName.search("home") == (-1)) {
        newWin = window.open("../home.html", '_self');
    }
    userNameHomeDisplay.innerHTML = userNameValue;
}
function addToLocal(arr, keyName) {
    localStorage.setItem(keyName, JSON.stringify(arr));
}
function getFromLocal(keyName) {
    return JSON.parse(localStorage.getItem(keyName));
}
//#endregion
//#region validation
// regex for validation input
const emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const inputs = document.querySelectorAll('.needs-validation input');
const regexs = {
    sUName: /^[a-zA-Z][a-zA-Z0-9._]{2,50}$/,
    sUEmail: emailregex,
    // lEmail: emailregex,
    sUPass: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
};
// function for dynamtic check vaildation for input
function validationInputTest(targetInput, regexValue) {
    if (regexValue.test(targetInput.value.trim())) {
        targetInput.classList.remove("is-invalid");
        targetInput.classList.add("is-valid");
        return true;
    } else {
        targetInput.classList.remove("is-valid");
        targetInput.classList.add("is-invalid");
        return false;
    }
}
// add validation for input
(() => {
    'use strict'
    inputs.forEach(input => {
        input.addEventListener("input", (e) => {
            const regex = regexs[e.target.id];
            if (regex) {
                validationInputTest(e.target, regex);
            }
        });
    });
})();
// check validation button
// (() => {
// if (button.id == "signUp") {
function addUser() {
    button = document.getElementById("signUp");
    if (confirmInputSup()) {
        if (getEmail(sUEmail.value.trim()) == null) {
            let user = {
                userName: userName.value.trim(),
                email: sUEmail.value.trim(),
                password: sUPass.value.trim()
            };
            users.push(user);
            addToLocal(users, "users");
            window.open("index.html", '_self');
        } else {
            const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
            const mess = document.getElementById("sMessage");
            mess.innerHTML = `This Email '${sUEmail.value.trim()}' had been used before !! Please use anther one.`
            myModal.show();
        }
    }

}
function loginCheck() {
    button = document.getElementById("login");
    const user = getEmail(lEmail.value.trim());
    if (user != null) {
        if (user.password == lPass.value.trim()) {
            addToLocal(user.userName, "userName");
            newWin = window.open("home.html", '_self');
        } else {
            const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
            const mess = document.getElementById("sMessage");
            mess.innerHTML = `Email or Password are not correct.`
            myModal.show();
        }
    } else {
        const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
        const mess = document.getElementById("sMessage");
        mess.innerHTML = `Please Enter a valid email !`
        myModal.show();
    }

}
// validate all input signup
function confirmInputSup() {
    const validation = (
        validationInputTest(userName, regexs[userName.id]) &
        validationInputTest(sUPass, regexs[sUPass.id]) &
        validationInputTest(sUEmail, regexs[sUEmail.id])
    )
    return Boolean(validation);
}
// validate all input signup
function confirmInputLin() {
    const validation = (
        lEmail.value.trim()!=null &
        lPass.value.trim()!=null
    )
    return Boolean(validation);
}
// get user Email
function getEmail(email) {
    let found = false;
    let user = {};
    users.forEach(userS => {
        if (userS.email == email) {
            found = true;
            user = userS;
        }
    });
    if (found) {
        return user;
    } else {
        return null;
    }
}
//#endregion
function deleteName() {
    localStorage.removeItem("userName")
}