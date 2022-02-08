$(() => {
  $.ajax({
    url: "/api/users/me",
    type: "GET",
  }).then((user) => {
    const $navUser = $("div.nav-user");
    const $navNoUser = $("div.nav-no-user");
    const $greeting = $("label.nav-greeting");
    if (!$.isEmptyObject(user)) {
      const name = `${user.firstName} ${user.lastName}`;
      $greeting.text(`Hello, ${name}`);
      $navUser.show();
      $greeting.attr("id", `${user.id}`);
    } else {
      $navUser.hide();
      $navNoUser.show();
    }
  });

  const $logout = $("button.nav-button.logout");
  $logout.on("click", function (e) {
    e.preventDefault();
    $.ajax({
      url: "/user/logout",
      type: "POST",
    }).then((res) => {
      window.location.href = "/";
    });
  });

  const $orders = $("button.nav-button.orders");
  $orders.on("click", function (e) {
    e.preventDefault();
    $.get("/api/users/me").then((user) => {
      const userId = user.id;
      window.location.href = `/orders/${userId}`;
    });
  });
});
