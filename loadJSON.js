const searchButton = document.getElementsByClassName('btn')

function handleSubmit(event){
  fetch('http://api.nugaspam.com/check/bit.ly/33N8hyQ')
  .then(function(response) {
    return response.json();
  })
  .then(function(spamdata) {
    console.log(JSON.stringify(spamdata));
  });
}

function init(){
  searchButton.addEventListener("submit", handleSubmit)
}

init();