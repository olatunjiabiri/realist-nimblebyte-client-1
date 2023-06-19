import React from "react";
import AdForm from "../../../components/forms/AdForm";

export default function SellHouse() {
  return (
    <div>
      <div className="container mt-5">
        <AdForm action="Sell" type="House" />
      </div>
    </div>
  );
}
