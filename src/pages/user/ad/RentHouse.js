import React from "react";
import Sidebar from "../../../components/nav/Sidebar";
import AdForm from "../../../components/forms/AdForm";

export default function RentHouse() {
  return (
    <div>
      <div className="container-fluid pt-5 background-color ">
        <AdForm action="Rent" type="House" />
      </div>
    </div>
  );
}
