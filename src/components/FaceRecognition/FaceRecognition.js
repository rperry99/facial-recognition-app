import React from "react";

const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className="centerfy ma">
      <div className="absolute mt2 ">
        <img alt="" src={imageUrl} width="500px" height="auto" />
      </div>
    </div>
  );
};

export default FaceRecognition;
