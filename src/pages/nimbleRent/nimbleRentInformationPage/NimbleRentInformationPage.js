import React from "react";
import LogoutMessage from "../../../components/misc/logoutMessage/LogoutMessage";
import ContentWrapper from "./../../../components/contentWrapper/ContentWrapper";
import NimbleRentInfoFaq from "../../../components/nimble-rent/nimble-rent-info-faq/NimbleRentInfoFaq";

import NimbleRentTopBanner from "../../../components/nimble-rent/nimble-rent-top-banner/NimbleRentTopBanner";

import "./NimbleRentInformationPage.css";

const NimbleRentInformationPage = () => {
  return (
    <div className="nimble-rent-info-container">
      {/*  <ContentWrapper> */}
      <LogoutMessage>
        <section className="nimble-rent-info-top-banner-container">
          <NimbleRentTopBanner showButton={false} />
        </section>
        {/* <section className="nimble-rent-info-eligibility-container">
          <div className="">Eligibility content</div>
        </section> */}

        <section className="nimble-rent-info-faq-container">
          <NimbleRentInfoFaq />
        </section>
      </LogoutMessage>
      {/* </ContentWrapper> */}
    </div>
  );
};

export default NimbleRentInformationPage;
