"use strict";
import { showcase } from "./landing.js";

window.addEventListener("DOMContentLoaded", start);

let elementToPaint;

const features = {
  juice: false,
  cat: false,
  pattern: false,
  pillow: false,
};

async function start() {
  let response = await fetch("sofa-main.svg");
  let svgData = await response.text();
  document.querySelector("#sofa").innerHTML = svgData;

  showcase();
  setTimeout(function () {
    userInteraction();
    document.querySelectorAll(".option").forEach((option) => option.addEventListener("click", toggleOption));
  }, 4000);
}

function userInteraction() {
  document.querySelectorAll(".addColor").forEach((g) => {
    console.log(g);
    g.addEventListener("click", gClicked);
    g.addEventListener("mouseover", pathMouseover);
    g.addEventListener("mouseout", pathMouseout);
    g.style.pointerEvents = "all";
  });

  document.querySelectorAll(".color-button").forEach((button) => {
    button.addEventListener("click", colorClicked);
  });
}

function gClicked(e) {
  document.querySelectorAll(".addColor").forEach((g) => {
    if (g.style.fill === "black") {
      g.style.fill = "none";
    }
    e.stopPropagation();
    window.addEventListener("click", (e) => {
      if (g.style.fill === "black") {
        g.style.fill = "none";
      }
    });
  });

  pathClicked(this);
}

function pathClicked(path) {
  elementToPaint = path;
  console.log(path);
  if (path.style.fill === "none") {
    path.style.fill = "black";
  }
  path.style.opacity = "0.5";
}

function pathMouseover() {
  this.style.stroke = "#e0a148";
}

function pathMouseout() {
  this.style.stroke = "none";
}

function colorClicked() {
  if (elementToPaint !== undefined) {
    elementToPaint.style.fill = this.getAttribute("fill");
  }
}

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;

  // Toggle feature added

  if (features[feature] === false) {
    features[feature] = true;
  } else {
    features[feature] = false;
  }

  if (features[feature]) {
    target.classList.add("chosen");

    document.querySelectorAll(`#preview [data-feature='${feature}']`).forEach((preview) => {
      preview.classList.remove("hide");
    });

    // Created li and appended to selected ul

    const featureElement = createFeatureElement(feature);
    document.querySelector("#selected ul").append(featureElement);

    const start = target.querySelector("img").getBoundingClientRect();
    const end = featureElement.getBoundingClientRect();

    const xdiff = start.x - end.x;
    const ydiff = start.y - end.y;

    featureElement.style.setProperty("--xdiff", xdiff);
    featureElement.style.setProperty("--ydiff", ydiff);

    featureElement.classList.add("animateIn");
    featureElement.addEventListener("animationend", doneAnimatingIn);

    function doneAnimatingIn() {
      featureElement.classList.remove("animateIn");
      featureElement.removeEventListener("animationend", doneAnimatingIn);
    }
  } else {
    target.classList.remove("chosen");

    document.querySelectorAll(`#preview [data-feature='${feature}']`).forEach((preview) => {
      preview.classList.add("hide");
    });

    const featureElement = document.querySelector(`#selected ul [data-feature='${feature}']`);

    const start = featureElement.getBoundingClientRect();
    const end = target.querySelector("img").getBoundingClientRect();

    const xdiff = end.x - start.x;
    const ydiff = end.y - start.y;

    featureElement.style.setProperty("--xdiff", xdiff);
    featureElement.style.setProperty("--ydiff", ydiff);

    featureElement.classList.add("animateOut");
    featureElement.addEventListener("animationend", doneAnimatingOut);

    function doneAnimatingOut() {
      featureElement.classList.remove("animateOut");
      featureElement.removeEventListener("animationend", doneAnimatingOut);
      featureElement.remove();
    }
  }
}

function createFeatureElement(feature) {
  const li = document.createElement("li");
  li.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `images/${feature}.png`;
  img.alt = feature;

  li.append(img);

  return li;
}
