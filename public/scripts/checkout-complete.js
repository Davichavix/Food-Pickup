$(() => {
  $.get("/api/users/me").then((user) => {
    setTimeout(() => {
      window.location.href = `/orders/${user.id}`;
    }, 2000);
  });
});
