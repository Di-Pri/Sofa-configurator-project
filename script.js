"use strict";

window.addEventListener("DOMContentLoaded", start);

let elementToPaint;

async function start() {
  let response = await fetch("sofa.svg");
  let svgData = await response.text();
  document.querySelector("#sofa").innerHTML = svgData;
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
  this.style.fill = "grey";
  this.style.opacity = "0.5";
}

function pathMouseover() {
  this.style.stroke = "blue";
}

function pathMouseout() {
  this.style.stroke = "none";
}

function colorClicked() {
  console.log("Clickeddd", this.getAttribute("fill"));
  if (elementToPaint != undefined) {
    elementToPaint.style.fill = this.getAttribute("fill");
  } else {
    console.log("element not selected");
  }
}
