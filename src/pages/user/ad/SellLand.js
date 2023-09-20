import React from "react";
import AdForm from "../../../components/forms/AdForm";

export default function SellLand() {
  return (
    <div>
      <div className="container-fluid pt-5 background-color ">
        <AdForm action="Sell" type="Land" />
      </div>
    </div>
  );
}
