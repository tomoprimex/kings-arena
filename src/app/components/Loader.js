"use client";
import React from "react";
import "../styles/animations.css";

export default function Loader({ size = "medium", text = "Loading..." }) {
  return (
    <div className="loaderContainer">
      <div className={`loader ${size}`}>
        <div className="loaderRing"></div>
        <div className="loaderRing"></div>
        <div className="loaderRing"></div>
      </div>
      {text && <p className="loaderText">{text}</p>}
    </div>
  );
}
