const searchForm = document.querySelector('.searchForm');
const redirectedUrl = document.querySelector('.redirectedUrl')
const value1 = document.querySelector('.value1');
const value2 = document.querySelector('.value2');
const value3 = document.querySelector('.value3');
const value4 = document.querySelector('.value4');
const value5 = document.querySelector('.value5');

function initPage(){
  redirectedUrl.innerHTML = '';
  value1.innerHTML = '';
  value2.innerHTML = '';
  value3.innerHTML = '';
  value4.innerHTML = '';
  value5.innerHTML = '';
}

function handleSubmit(event){
  event.preventDefault();
  const targetUrl = input.value;
  fetch('http://api.nugaspam.com/check/' + targetUrl) //  ex) bit.ly/33N8hyQ
  .then(function(response) {
    return response.json();
  })
  .then(function(spamdata) {
    console.log(JSON.stringify(spamdata));
  });
}



function init(){
  initPage();
  searchForm.addEventListener("submit", handleSubmit);
}

init();