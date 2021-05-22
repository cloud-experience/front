const searchForm = document.querySelector('.searchForm');

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
  searchForm.addEventListener("submit", handleSubmit);
}

init();