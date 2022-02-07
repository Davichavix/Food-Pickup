$(() => {
  const userId = 1; //Add cookie session

  setTimeout(() => {
    window.location.href = `/orders/${userId}`;
  }, 2000);
});
