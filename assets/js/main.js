document.addEventListener("DOMContentLoaded", function () {

  // Auto year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Secret logic
  const captainLink = document.getElementById("captain-link");
  const secretSection = document.getElementById("secret-section");

  let clickCount = 0;

  if (captainLink && secretSection) {
    captainLink.addEventListener("click", function (e) {
      clickCount++;

      if (clickCount >= 5) {
        e.preventDefault();
        secretSection.hidden = false;
        secretSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

});
