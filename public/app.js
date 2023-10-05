const menu = document.querySelector(".menu");
const list = document.querySelector(".display");
const open = document.querySelector(".lines");
const close = document.querySelector(".cancel");
const trash = document.querySelector(".delete");
const modeIcon = document.querySelector(".icon");
const nav = document.querySelector("nav");
const displayHiddenText = document.querySelector(".blogs");
const hideParagraph = document.querySelectorAll(".bio");
const lineClamp = document.querySelector(".line-clamp");

menu.addEventListener("click", () => {
  list.classList.toggle("display");
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

const width = window.innerWidth;
console.log(width);
function checkWidth() {
  if (width <= 700) {
    hideParagraph.forEach((item) => {
      const regEx = /\/blogs\/[a-z0-9]{3,}/;

      if (!regEx.test(window.location.pathname)) {
        item.classList.add("line-clamp");
      }
    });
  }
}
checkWidth();
console.log(window.location.pathname);

function removeWidth() {
  if (width <= 700) {
    hideParagraph.forEach((item) => {
      if (window.location.pathname.split("/blogs/:id")) {
        item.classList.remove("line-clamp");
      }
    });
  }
}
displayHiddenText.addEventListener("click", () => {
  removeWidth();
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
      item.style.color = "blue";
    }
    if (window.location.pathname.split("/")[1].toUpperCase() === "BLOGS") {
      if (item.textContent === "Home") {
        item.style.color = "blue";
      }
    }
  });
}
nameNav();
// const navbar =  document.querySelectorAll('.current')
// navbar.forEach((item) =>{
//   console.log(item.textContent)
// })
