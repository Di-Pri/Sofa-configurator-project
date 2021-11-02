export function showcase() {
  document.querySelector("#preview").classList.add("center");

  document.querySelectorAll(".addColor").forEach((g) => {
    g.style.pointerEvents = "none";
  });

  document.body.style.overflow = "hidden";

  const sofa = document.querySelector("g#sofa");
  const pillows = document.querySelector("g#pillows");
  const legs = document.querySelector("g#legs");
  const juice = document.querySelector("#preview [data-feature='juice']");
  const pillow = document.querySelector("#preview [data-feature='pillow']");
  const cat = document.querySelector("#preview [data-feature='cat']");

  setTimeout(() => {
    sofa.style.fill = "#213b5c";
    pillows.style.fill = "#9da6c4";
    legs.style.fill = "#25253e";
    sofa.style.opacity = "0.5";
    pillows.style.opacity = "0.5";
    legs.style.opacity = "0.5";
  }, 500);

  setTimeout(() => {
    sofa.style.fill = "#c2acce";
    pillows.style.fill = "#e3e3e3";
    legs.style.fill = "#9da6c4";
    juice.classList.remove("hide");
  }, 1000);

  setTimeout(() => {
    sofa.style.fill = "#5b7b8c";
    pillows.style.fill = "#d9c232";
    legs.style.fill = "#213b5c";
    juice.classList.add("hide");
    pillow.classList.remove("hide");
  }, 1500);

  setTimeout(() => {
    sofa.style.fill = "#e3e3e3";
    pillows.style.fill = "#403a37";
    legs.style.fill = "#403a37";
    pillow.classList.add("hide");
    cat.classList.remove("hide");
  }, 2000);

  setTimeout(() => {
    sofa.style.fill = "#d9c232";
    pillows.style.fill = "#5b7b8c";
    legs.style.fill = "#5b7b8c";
    cat.classList.add("hide");
    juice.classList.remove("hide");
  }, 2500);

  setTimeout(() => {
    sofa.style.fill = "#405e3a";
    pillows.style.fill = "#ab5e2b";
    legs.style.fill = "#232e32";
    cat.classList.remove("hide");
  }, 3000);

  setTimeout(() => {
    sofa.style.fill = "#9da6c4";
    pillows.style.fill = "#25253e";
    legs.style.fill = "#25253e";
    pillow.classList.remove("hide");
  }, 3500);

  setTimeout(() => {
    sofa.style.fill = "none";
    pillows.style.fill = "none";
    legs.style.fill = "none";
    juice.classList.add("hide");
    cat.classList.add("hide");
    pillow.classList.add("hide");

    document.querySelector("#preview").classList.remove("center");
    document.querySelector("#options").classList.remove("hidden");
    document.querySelector("#colors").classList.remove("hidden");
    document.querySelector("#selected").classList.remove("hidden");

    document.body.style.overflow = "visible";
  }, 4000);
}
