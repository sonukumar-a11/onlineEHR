import React from "react";
import "./Dasboard.css";

const Card = ({ title, data }) => {
  return (
    <div>
      <div className="card-header">
        <h3>{title}</h3>
         
      </div>
      <div class="card-body preamble" id="zen-preamble" role="article">
        {Object.keys(data).map((key) => (
          <p className="card-text">
            {key} : {data[key]}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Card;
