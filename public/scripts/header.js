$(() => {
  $.ajax({
    url: "/api/users/me",
    type: "GET",
  }).then((user) => {
    const $navUser = $("div.nav-user");
    const $navNoUser = $("div.nav-no-user");
    const $greeting = $("label.nav-greeting");
    if (Object.values(user).length > 0) {
      const name = `${user.firstName} ${user.lastName}`;
      $greeting.text(`Hello, ${name}`);
      $navNoUser.hide();
      $navUser.show();
      $greeting.attr("id", `${user.id}`);
    } else {
      $navUser.hide();
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


});
