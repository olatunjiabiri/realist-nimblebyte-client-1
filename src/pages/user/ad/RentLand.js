import React from "react";
import Sidebar from "../../../components/nav/Sidebar";
import AdForm from "../../../components/forms/AdForm";

export default function RentLand() {
  return (
    <div>
      {/* <Sidebar /> */}
      <div className="container mt-5">
        <AdForm action="Rent" type="Land" />
      </div>
    </div>
  );
}
