import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="centerfy ma">
      <div className="absolute mt2 ">
        <img
          alt=""
          src={imageUrl}
          width="500px"
          height="auto"
          id="inputImage"
        />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol
          }}
        />
      </div>
    </div>
  );
};

export default FaceRecognition;
