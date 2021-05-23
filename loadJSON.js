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
  .then(function(spamData) {
    console.log(JSON.stringify(spamData));
    showSpamData(spamData);
  });
}

function showSpamData(spamData) {
  redirectedUrl.innerHTML = spamData.redirectedURL;
  var isSpam = ''
  if (spamData.word_count > 0) {
    isSpam = 'O'
  } else {
    isSpam = 'X'
  }
  value1.innerHTML = isSpam;
  value2.innerHTML = spamData.word_count;
  value3.innerHTML = spamData.first_date;
  value4.innerHTML = spamData.last_date;
  value5.innerHTML = spamData.hits;
}

function init(){
  initPage();
  searchForm.addEventListener("submit", handleSubmit);
}

init();