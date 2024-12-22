var form = document.getElementById("my-form");
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  data.set("message", `Email: ${email}\n\n${message}`);

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.innerHTML =
          "Thanks for your submission!\nWe will contact you soon.";
        form.reset();
        showSuccessAnimation();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form";
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML = "Oops! There was a problem submitting your form";
    });
}

function showSuccessAnimation() {
  var successAnimation = document.createElement("div");
  successAnimation.className = "success-animation";
  successAnimation.innerHTML = `
          <div class="animation-content">
            <i class="fa fa-check-circle fa-4x text-success"></i>
            <p>Thanks for your submission.</p><br><p>We will contact you soon!</p>
          </div>
        `;
  document.body.appendChild(successAnimation);
  setTimeout(() => {
    successAnimation.remove();
  }, 3000);
}

form.addEventListener("submit", handleSubmit);
