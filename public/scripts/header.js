$(() => {

  $(".hamburger").click(function () {
    $("#tablet-links").slideToggle();
  });

  $.ajax({
    url: "/api/users/me",
    type: "GET",
  })
    .then((user) => {
      const $nav = $("nav.nav-header");

      if (!$.isEmptyObject(user)) {
        const name = `${user.firstName} ${user.lastName}`;

        const html = `
      <!-- If user's logged in  -->
      <div class="nav-user desktop">
      <!-- remove display after adding logic -->
        <form class="nav-logout">
          <lable class="nav-greeting" id=${user.id}>Hello, ${name} </lable>
          <button type="submit" class="nav-button logout">Log out</button>
        </form>
        <div>


          <a href="/"><button type="button" class="nav-button"> Menu</button></a>

          ${
            user.isOwner === true
              ? `<a href="/admin"><button type="button" class="nav-button">Open Orders</button></a>`
              : `<button type="button" class="nav-button orders"> Orders</button>`
          }
        </div>
      </div>

      <div class="tablet">
        <button type="button" class="hamburger"><i class="fa-solid fa-bars fa-lg"></i></button>

        <div id="tablet-links">
          <form class="nav-logout">
            <lable class="nav-greeting" id=${user.id}>Hello, ${name} </lable>
            <button type="submit" class="nav-button logout table-btn">Log out</button>
          </form>

          <a href="/"><button type="button" class="btn-trans tablet-btn">Menu</button></a>

        ${
          user.isOwner === true
            ? `<a href="/admin"><button type="button" class="btn-trans tablet-btn">Open Orders</button></a>`
            : `<a href="/orders/${user.id}"><button type="button" class="btn-trans tablet-btn orders">Orders</button></a>`
        }
        </div>
      <div>
      `;

        $nav.html(html);
      } else {
        const html = `
      <!-- If no user's logged in  -->
      <div class="nav-no-user desktop">
      <!-- remove display after adding logic -->
      <a href='/user/signin'><button type="button" class="nav-button">Sign In</button></a>
      <a href='/'><button type="button" class="nav-button"> Menu</button></a>
      </div>
      <div class="tablet">
        <button type="button" class="hamburger"><i class="fa-solid fa-bars fa-lg"></i></button>
        <div id="tablet-links">
          <a href="/user/signin"><button type="button" class="btn-trans tablet-btn">Sign In</button></a>
          <a href="/"><button type="button" class="btn-trans tablet-btn">Menu</button></a>
        </div>
      <div>
      `;

        $nav.html(html);
      }

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
    })
    .catch((e) => console.log(e));
});
