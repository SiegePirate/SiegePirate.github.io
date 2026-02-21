document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.getElementById("year");
  const currentYear = new Date().getFullYear();

  if (yearSpan) {
    yearSpan.textContent = currentYear;
  }

  console.log("The United Seas sails strong.");
});
