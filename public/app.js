const menu = document.querySelector(".menu");
const list = document.querySelector(".display");
const open = document.querySelector(".lines");
const close = document.querySelector(".cancel");
const trash = document.querySelector(".delete");
const modeIcon = document.querySelector(".icon");
const nav = document.querySelector('nav')
console.log(modeIcon)

menu.addEventListener("click", () => {
  list.classList.toggle("display")

});

let lightMode = localStorage.getItem("lightMode");
function addToLocalStorage() {
  if (document.querySelector("body").classList.contains("light-mode")) {
    localStorage.setItem("lightMode", "enabled");
  } else {
    localStorage.setItem("lightMode", null);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // localStorage.setItem('lightMode', 'enabled')
  if (lightMode === "enabled") {
    document.querySelector("body").classList.remove("light-mode");
  } else {
    document.querySelector("body").classList.add("light-mode");
  }
  // localStorage.removeItem('lightMode')
});

modeIcon.addEventListener("click", () => {
  lightMode = localStorage.getItem("lightMode");

  addToLocalStorage();
  // document.querySelector('body').classList.toggle('light-mode')
  if (lightMode === "enabled") {
    document.querySelector("body").classList.add("light-mode");

    localStorage.setItem("lightMode", null);
  } else {
    document.querySelector("body").classList.remove("light-mode");

    localStorage.setItem("lightMode", "enabled");
  }
});

if (trash) {
  trash.addEventListener("click", (e) => {
    console.log(trash);
    const endpoint = `/blogs/${window.location.pathname.split("blogs/")[1]}`;
    fetch(endpoint, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA: ", data);
        window.location.href = data.redirect;
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

function nameNav() {
  const navbar = document.querySelectorAll(".current");
  navbar.forEach((item) => {
    if (
      window.location.pathname.split("/")[1].toUpperCase() ===
      item.textContent.toUpperCase()
    ) {
      item.style.color = "red";
    }
    if (window.location.pathname.split("/")[1].toUpperCase() === "BLOGS") {
      if (item.textContent === "Home") {
        item.style.color = "red";
      }
    }
  });
}
nameNav();
// const navbar =  document.querySelectorAll('.current')
// navbar.forEach((item) =>{
//   console.log(item.textContent)
// })
