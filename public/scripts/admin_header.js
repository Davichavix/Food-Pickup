$(() => {
  $(".hamburger").click(function () {
    $("#tablet-links").slideToggle();
  });

  $.get("/api/users/me")
    .then((user) => {
      const $navGreeting = $("label.nav-greeting");
      const username = `${user.firstName} ${user.lastName}`;

      $navGreeting.text(`Hello, ${username}`);
    })
    .catch((e) => console.log(e));

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
