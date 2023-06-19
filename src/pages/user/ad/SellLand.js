import React from "react";
import AdForm from "../../../components/forms/AdForm";

export default function SellLand() {
  return (
    <div>
      <div className="container mt-5">
        <AdForm action="Sell" type="Land" />
      </div>
    </div>
  );
}
