$(() => {
  const userId = 1; //Add cookie session

  window.history.pushState(null, "", window.location.href);
  window.onpopstate = () => {
    window.history.pushState(null, "", window.location.href);
  }

  setTimeout(() => {
    window.location.href = `/orders/${userId}`;
  }, 2000);


});
