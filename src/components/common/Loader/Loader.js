import React from "react";
import LoaderStyles from "./Loader.style";

const Loader = () => {
  return (
    <LoaderStyles>
      <div class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </LoaderStyles>
  );
};

export default Loader;
