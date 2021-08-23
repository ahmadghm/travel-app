import { getInfo } from './getinfo'
export function recDATA(){
event.preventDefault();

const destination = document.getElementById("city").value
const date_in = document.getElementById("date_in").value
const date_out = document.getElementById("date_out").value
let today = new Date();
console.log(destination+date_in+date_out)


if (destination === '') {
  alert('Please enter a city name.');
  return;
}

// check if a user enter a valid date
if (date_in < today || date_out < date_in) {
  alert('please check the insert dates');
  return;
}

else{
getInfo()
}
//https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp

var btnGo = document.getElementById("generate");
if (btnGo.style.display === "block") {
  btnGo.style.display = "none";
} else {
  btnGo.style.display = "block";
}

var btnNewSearch = document.getElementById("btnvisible");
if (btnNewSearch.style.display === "none") {
  btnNewSearch.style.display = "block";
} else {
  btnNewSearch.style.display = "none";
}

}

export{
  getInfo
}
