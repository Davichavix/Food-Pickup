$(() => {
  const $loginForm = $("form.signin-form");

  $loginForm.on("submit", function(e) {
    e.preventDefault();

    const data = $(this).serialize();

    $.ajax({
      url: "/signin",
      type: "POST",
      data
    })
  })

})
