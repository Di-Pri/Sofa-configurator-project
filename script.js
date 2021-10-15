"use strict";

window.addEventListener("DOMContentLoaded", start);

let elementToPaint;

const features = {
  glasses: false,
};

async function start() {
  let response = await fetch("sofa.svg");
  let svgData = await response.text();
  document.querySelector("#sofa").innerHTML = svgData;
  document.querySelectorAll(".option").forEach((option) => option.addEventListener("click", toggleOption));

  userInteraction();
}

function userInteraction() {
  document.querySelectorAll(".addColor").forEach((g) => {
    console.log(g);
    g.addEventListener("click", pathClicked);
    g.addEventListener("mouseover", pathMouseover);
    g.addEventListener("mouseout", pathMouseout);
  });

  document.querySelectorAll(".color-button").forEach((button) => {
    button.addEventListener("click", colorClicked);
  });
}

function pathClicked() {
  elementToPaint = this;
  console.log(this);
  this.style.fill = "black";
  this.style.opacity = "0.5";
}

function pathMouseover() {
  this.style.stroke = "#e0a148";
}

function pathMouseout() {
  this.style.stroke = "none";
}

function colorClicked() {
  if (elementToPaint != undefined) {
    elementToPaint.style.fill = this.getAttribute("fill");
  }
}

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;

  // Toggle feature added
  features[feature] = !features[feature];

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
