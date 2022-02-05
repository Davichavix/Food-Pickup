// Client facing scripts here
$(document).ready(function() {
  const addtoCartBtn = document.getElementsByClassName('add-button')
  let items = localStorage.getItem('items')

  for (let i = 0; i < addtoCartBtn.length; i++) {
    addtoCartBtn[i].addEventListener('click', function(e) {
      let item = {
        "image_url": e.target.parentElement.children[0].getAttribute('src'),
        "name": e.target.parentElement.children[1].children[0].textContent,
        "description": e.target.parentElement.children[1].children[1].textContent,
        "price": e.target.parentElement.children[2].textContent,
        "qty": 1
      }
      items.push(item);
      localStorage.setItem('items', JSON.stringify(items));
      // console.log(localStorage.getItem('items'));
      $('.badge').text(JSON.parse(localStorage.getItem('items')).length);

    })
  }
  $('.badge').text(JSON.parse(localStorage.getItem('items')).length);

})
