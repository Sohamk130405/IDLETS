var newsletterForm = document.querySelector(".newsletter form");

async function handleNewsletterSubmit(event) {
  event.preventDefault();
  var status = document.createElement("p");
  status.className = "text-center mt-3 text-white";
  var data = new FormData(event.target);
  data.set("message", `I want to join you.`);

  fetch(event.target.action, {
    method: newsletterForm.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.innerHTML = "Thanks for joining us! We will contact you soon.";
        event.target.reset();
        showNewsletterSuccessAnimation();
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

  event.target.appendChild(status);
}

function showNewsletterSuccessAnimation() {
  var successAnimation = document.createElement("div");
  successAnimation.className = "success-animation";
  successAnimation.innerHTML = `
    <div class="animation-content">
      <i class="fa fa-check-circle fa-4x text-success"></i>
      <p>Thanks for joining us!</p><br><p>We will contact you soon!</p>
    </div>
  `;
  document.body.appendChild(successAnimation);
  setTimeout(() => {
    successAnimation.remove();
  }, 3000);
}

newsletterForm.addEventListener("submit", handleNewsletterSubmit);
