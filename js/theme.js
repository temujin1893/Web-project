document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("darkToggle");

  // load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  if (btn) {
    btn.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
      );
    });
  }
});