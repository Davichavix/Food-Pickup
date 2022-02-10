$(() => {
  $signUpForm = $("form.signup-form");
  $signUpForm.on("submit", function (e) {
    e.preventDefault();

    const data = $(this).serialize();

    $.ajax({
      url: "/user/signup",
      type: "POST",
      data,
    }).then((user) => {
      window.location.href = "/";
    });
  });
});
