$(() => {
  const $loginForm = $("form.signin-form");

  $loginForm.on("submit", function (e) {
    e.preventDefault();

    const data = $(this).serialize();

    $.ajax({
      url: "/user",
      type: "POST",
      data,
    }).then((user) => window.location.href="/");
  });
});
