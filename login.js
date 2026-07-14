const akun = {

username:"guru",
password:"123456"

};

function login(){

let u=document.getElementById("username").value;
let p=document.getElementById("password").value;

if(u===akun.username && p===akun.password){

localStorage.setItem("login","true");

window.location="index.html";

}else{

document.getElementById("pesan").innerHTML=
"Username atau Password salah";

}

}