// Client facing scripts here
$(document).ready(function() {
  let items = [];
  if(localStorage.getItem('items') !== null) {
    items = JSON.parse(localStorage.getItem('items'))
  };
  const addtoCartBtn = document.getElementsByClassName('add-button')
  for (let i = 0; i < addtoCartBtn.length; i++) {
    addtoCartBtn[i].addEventListener('click', function(e) {
      let item = {
        "item-image_url": e.target.parentElement.children[0].getAttribute('src'),
        "item-name": e.target.parentElement.children[1].children[0].textContent,
        "item-description": e.target.parentElement.children[1].children[1].textContent,
        "item-price": e.target.parentElement.children[2].textContent
      }
      items.push(item);
      localStorage.setItem('items', JSON.stringify(items));
      $('.badge').text(JSON.parse(localStorage.getItem('items')).length);
    })
  }
  $('.badge').text(JSON.parse(localStorage.getItem('items')).length);
})