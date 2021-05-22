const searchForm = document.querySelector('.searchForm');

function handleSubmit(event){
  event.preventDefault();
  fetch('http://api.nugaspam.com/check/bit.ly/33N8hyQ')
  .then(function(response) {
    return response.json();
  })
  .then(function(spamdata) {
    console.log(JSON.stringify(spamdata));
  });
}

function init(){
  searchForm.addEventListener("submit", handleSubmit);
}

init();