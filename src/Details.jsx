import React, { useEffect, useState } from "react";
import { getDetails, detailsLoader } from "./api.js";
import { useLoaderData, Link } from "react-router-dom";

const Details = () => {
  const { details } = useLoaderData();
  return (
    <div className="details">
      <p>
        <span className="bold-font">Item No:</span> {details?.id}
      </p>
      <p>
        <span className="bold-font">Creator:</span> {details?.creator}
      </p>
      <p>
        <span className="bold-font">Title:</span> {details?.title}
      </p>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Details;
