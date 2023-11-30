import React, { useEffect } from "react";

import "./index.css";

const BuyerTermsandConditions = ({ setIsOpen1 }) => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleBackButton = () => {
    setIsOpen1(false);
  };

  return (
    <div className="container my-5 px-3 ">
      <div>
        <div
          className="h1 mb-3 text-center"
          style={{ marginTop: "0px", fontSize: "28px", fontWeight: 600 }}
        >
          PROPERTY BUYER TERMS AND CONDITIONS
        </div>
        <p>
          This outlines terms and conditions and obligations that you must
          accept in order to register and buy property uploaded on the App.
        </p>
        <p>
          {" "}
          Registering as a buyer on the platform, you understand and have agreed
          to the{" "}
          <italic>
            {" "}
            terms & conditions for buyer, as well as the General terms and
            conditions and policies.
          </italic>
        </p>
        <div className="h2 mb-3 text-center p-header ">
          REGISTERING AN ACCOUNT
        </div>
        <p className="list-heading">1.0&ensp;PROFILE CREATION</p>
        <p>
          1.1&ensp; For the purpose of these terms, you are considered to be a
          legal person if you register as a company, or as an individual 
        </p>
        <p>
          {" "}
          1.2&ensp; You have a legal obligation to take reasonable care not to
          make a misrepresentation of yourself. You may therefore be required to
          give detailed information about yourself via written questionnaire,
          picture submission, or oral interview and or; all answers to which are
          important.
        </p>
        <p>
          {" "}
          1.3&ensp; In the event that any detail you have supplied to us is
          incorrect, you must advise the company immediately. Failure of which
          may lead to the termination or deactivation of your profile.
        </p>
        <p>
          1.4&ensp; You further agree that all applicable administrative charges
          with regards to registration shall be applicable to you. You will be
          informed of any such charges in writing. Failure to make payment of
          the said charges shall be grounds for the denial of registration and
          you will therefore be barred or limited from optimal use of our app
          and website.
        </p>

        <p className="list-heading">
          2.0 &ensp;BACKGROUND SEARCHES AND SECURITY FEATURES{" "}
        </p>
        <p>
          2.1&ensp; Due to the nature of transactions carried out on our
          platforms, the importance of security measures cannot be over
          emphasized. We reserve the right to adopt any security measures deemed
          fit in order to safeguard users of our platform at all times and also
          to ensure that our space is a safe business forum. We therefore
          request that you go through our administrative processes for security
          and safety from time to time during and after your registration and
          request process. Our security measures shall include but not be
          limited to the following:{" "}
        </p>
        <ol className="lower-alpha">
          <li>
            Submission and verification of ID Cards from the relevant agencies.
          </li>
          <li>
            other personal background security checks with any relevant agency{" "}
          </li>
          <li>
            Bank verification and submission of sensitive personal information{" "}
          </li>
          <li>
            Request for any additional documents for personal data verification{" "}
          </li>
          <li>
            Request for any additional documents for personal data verification{" "}
          </li>
          <li>
            Any other security and safety procedure deemed necessary at any
            time.
          </li>
        </ol>
        <p>
          2.2&ensp;you may therefore be summoned at any time by our authorized
          representatives to undergo security checks at any time. Failure to
          comply will lead to the suspension or termination of the use of our
          platform.{" "}
        </p>
        <p>
          2.3&ensp;You hereby consent to the submission and verification of your
          personal information and agree that failure to comply with our
          administrative process shall be a ground for denial of use of our
          platform.{" "}
        </p>
        <p>
          2.4&ensp;security measures shall also be put in place on our platform
          in order to safeguard your profile from unauthorized use. Security
          features shall include but not be limited to the use of usernames and
          passwords, password verification and confirmation systems etc. It
          shall be your responsibility to ensure that your login and security
          information is kept safe and free from 3rd party unauthorized use. We
          will not be liable for any claims arising out of the unauthorized use
          of your profile.{" "}
        </p>
        <p>
          2.5&ensp;You accept that we reserve the right to alter all
          administrative processes as well as security measures in any manner
          that is deemed necessary in order to ensure the safety of our platform
          without further notice to you.{" "}
        </p>
        <div className="h2 my-3 text-center p-header ">YOUR TRANSACTIONS</div>
        <p className="list-heading">
          3.0 &ensp;THIRD PARTY CONTACT AND INTERACTIONS{" "}
        </p>
        <p>
          3.1&ensp;Our platform is a hub wherein real estate players can
          commence and conclude transactions seamlessly with greatly reduced
          elements of fraud and administrative difficulty. Based on your
          registration, you may contact or be contacted via our platform by our
          representatives or any other platform user. You hereby warrant that
          all interactions shall be handled with the utmost professionalism at
          all times.{" "}
        </p>
        <p>
          3.2&ensp;All transactions shall be concluded using our platform at all
          times in order to ensure safety through our security features
          provided. We will not be liable for any losses or damage incurred
          should you circumvent our platform for conclusion of the transactions
          off platform.{" "}
        </p>
        <p>
          3.3&ensp;All communications via our platform shall be monitored by us.
          In the event of advanced stages of transactions, our authorized
          representatives may intervene to ensure the seamlessness of the
          transactions. You hereby consent to the monitoring of chats, and other
          in app or website correspondences for security and administrative
          reasons.{" "}
        </p>
        <p className="list-heading">4.0 &ensp; BILLING AND PROPERTY PRICING </p>
        <p>
          <p>
            4.1&ensp;The prices for listed property are not fixed by us and we
            do not have any direct influence on the prices. We may however play
            an advisory role in negotiations if applicable.{" "}
          </p>
        </p>
        <p className="list-heading">
          5.0 &ensp;PAYMENT OF TRANSACTION CONSIDERATION{" "}
        </p>
        <p>
          5.1&ensp;Payment of the transaction sum may be made through our
          platform with the help of our 3rd party financial partners. For your
          protection, we maintain a policy of payment upon conclusion and as
          such payment will be made to us in full and disbursed in a controlled
          manner. The control of payment may also mean that payment is made in
          tranches or completely withheld until the conclusion of transactions.
          This is to provide safety as well as a security measure to ensure the
          legitimacy and genuineness of transactions between parties.{" "}
        </p>
        <p>
          5.2&ensp;All payments made through our platform shall therefore be
          subject to an escrow system which ensures that no payment is made to
          either party unless and until transactions are fully verified and or
          concluded. Funds shall therefore be withheld by our third-party
          financial partners until our instruction to disburse is given to the
          said partners.{" "}
        </p>
        <p>
          5.3&ensp;You therefore accept that we reserve the right to withhold
          payments until property verification, background research, and
          possession of the property is delivered to you and confirmed
          accordingly.{" "}
        </p>
        <p>
          5.4&ensp;At the point of withholding of funds, said funds shall be
          held in escrow. The payment, withholding, and remittance shall be
          carried out by our third-party financial partners.{" "}
        </p>
        <p>
          5.5&ensp;In the event of transaction failure, funds in escrow shall be
          reimbursed to you less any applicable administrative charges.{" "}
        </p>
        <p>
          5.6&ensp;You hereby consent that funds may be withheld pending the
          conclusion of transaction. You also consent to be bound by the terms
          and conditions of our third-party financial partners.{" "}
        </p>
        <p className="list-heading">6.0 &ensp;BROKERAGE FEES/COMMISSION </p>
        <p>
          6.1&ensp;We offer real estate brokerage services among other things.
          For our services therefore, we charge a non-refundable brokerage
          fee/commission for each transaction closed out or concluded.{" "}
        </p>
        <p>
          6.2&ensp;The charges shall be billed by us immediately upon conclusion
          of a transaction. You may therefore be charged on the transaction and
          debited directly from your purchase price immediately upon conclusion.
          An invoice detailing the charges shall be sent to you in writing by
          email, text message, and any other means in readable format.{" "}
        </p>
        <p>
          6.3&ensp;For the purpose of this agreement Chargeable fees shall
          include but not be limited to applicable taxes, commission as may be
          updated from time to time, fines/penalties (as may be incurred from
          time to time, etc.){" "}
        </p>
        <p className="list-heading">
          7.0 &ensp;REVISION OF COMMISSION AND FEES{" "}
        </p>
        <p>
          7.1 &ensp;We reserve the right to revise, change and/or update our
          scale of fees. We will ensure that you are advised in writing of any
          changes thereto before the commencement of any transaction.{" "}
        </p>
        <p className="list-heading">8.0 &ensp;TRANSACTION FAILURE </p>
        <p>
          8.1&ensp;In the event of the failure of a transaction or during a
          transaction, all funds shall be transferred from escrow back to you
          less any administrative charges.{" "}
        </p>
        <p>
          8.2&ensp;Where funds have been transferred based on conclusion of a
          transaction, you will have a window within which complaints can be
          made with regards to the transaction. Said complaints shall relate to
          the integrity of the transaction based on misrepresentation, deceit,
          discovery of fraud or criminal activity. Once lodged, your complaint
          will be investigated by us, and a refund will be made to you where it
          said complaints have been confirmed.{" "}
        </p>
        <p>8.3&ensp;Administrative fees are not refundable. </p>
        <p className="list-heading">
          9.0 &ensp;TERMINATION OF THE AGREEMENT/EXCLUSION FROM USE{" "}
        </p>
        <p>
          9.1&ensp;These Terms shall be effective from the date of acceptance
          and shall continue indefinitely until terminated pursuant to the
          provisions of this agreement.{" "}
        </p>
        <p>
          9.2 &ensp; The agreement entered into may be terminated at any time by
          either party with immediate effect and without specifying any reasons
          or without any requirement of notice, if you delete your profile, and
          you will no longer be authorized to use the platform.{" "}
        </p>
        <p>
          9.3 &ensp; You may also be suspended temporarily or excluded
          permanently from the use of the services for material breaches of the
          obligations arising under applicable law or regulation and/or these
          Terms or any other binding agreements between the parties.{" "}
        </p>
        <p>
          9.4 &ensp; Notwithstanding the termination of these Terms, all
          unsettled claims for payments will be pursued by us.{" "}
        </p>
        <p className="list-heading">10.0 &ensp; PRIVACY POLICY </p>
        <p>
          10.1&ensp; We collect information about you when you register on and
          use our website, mobile applications, and any other online products
          and services (referred to hereinafter as “Services”) and through other
          interactions and communications you have with us. By downloading any
          of our mobile applications, visiting our website and providing us your
          data by any means i.e. chat, phone or email, you accept that we may
          utilize such data to contact you and provide you information relevant
          to your continued use and enjoyment of our services.
        </p>
        <p className="list-heading">10.2 How We Use Information Collected </p>
        <ol className="lower-alpha">
          <li>
            To serve you better by improving the functionality of our services
            and applications.
          </li>
          <li>
            To send you relevant information regarding our services and
            offerings
          </li>
          <li>
            {" "}
            Enable you and professional service providers to reach one another,
            communicate and in general perform the service which you request at
            any time.
          </li>
        </ol>
        <p className="list-heading">10.3 Sharing of your Information </p>
        <ol className="lower-alpha">
          <li>
            <strong>Through Our Services:</strong> We share only relevant
            information with other Professional Service Providers to enable them
            to perform the requested service.
          </li>
          <li>
            {" "}
            <strong>By Order of Court: </strong> We share with the Nigerian
            Police and other security agencies if requested via a Court Order.
          </li>
          <p></p>
          <p>
            Our general Privacy Policy will be fully applicable to you
            accordingly.{" "}
          </p>
        </ol>
        <p className="list-heading">11.0 &ensp;RELATIONSHIP OF THE PARTIES </p>
        <p>
          11.1 &ensp; We are independent contracting parties and nothing in
          these Terms shall make either party the agent or legal representative
          of the other for any purpose whatsoever, nor does it grant either
          party any authority to assume or to create any obligation on behalf of
          or in the name of the other party.
        </p>
        <p className="list-heading">
          12.0 &ensp;  INTELLECTUAL PROPERTY RIGHTS (COPYRIGHTED MATERIAL, AND
          TRADEMARK INFORMATION).{" "}
        </p>
        <p>
          12.1  &ensp;Our product names, service names, slogans or logos
          referenced on our websites and/or in Apps are trademarks or registered
          trademarks and therefore company property. All of the information,
          content, and materials offered are protected by copyright and other
          applicable laws of the Federal Republic of Nigeria. You shall not
          copy, publicly display, modify or distribute such material without our
          prior written consent. You may use these materials pursuant to these
          Terms and subject to the restrictions set forth herein, so long as
          they do not modify the materials or remove any copyright any
          proprietary rights notices contained therein or thereon.{" "}
        </p>
        <p>
          12.2 &ensp; All rights, title and interest and the services provided
          are and will remain our exclusive property.{" "}
        </p>
        <p className="list-heading">
          13.0 &ensp; LIMITATION OF LIABILITIES AND WARRANTIES
        </p>
        <p>
          13.1&ensp; All property listings are carried out by 3rd party
          customers listed as sellers. Whilst we assist in ensuring the safety
          and seamlessness of transactions, we shall not be held liable in the
          event of fraudulent transactions being successful. We will however
          take all reasonable steps to assist in the resolution of any such
          issues and assist in the recovery of any funds transferred to said 3rd
          party sellers by providing any relevant information in our records to
          the relevant antigraft agencies on your behalf.{" "}
        </p>
        <p>
          13.2&ensp; Subject to these Terms, we shall provide in the app our
          associated billing and invoicing services. We warrant that the App
          shall substantially conform to the specifications set forth in the
          documentation and shall function substantially as intended. Our sole
          obligation under this warranty shall be limited to using reasonable
          efforts to ensure such conformity and operation and to supply versions
          of the App as soon as practicable after discovery of an error. This
          warranty shall be void if the App is modified without the written
          consent.{" "}
        </p>
        <p>
          13.3 &ensp; You shall have no claim to the continuous and
          uninterrupted availability of the App or the Services. We do not
          warrant
          <ol className="lower-alpha">
            <li>
              that operation of the App shall be uninterrupted or error free, or{" "}
            </li>
            <li>
              that functions contained in the App shall operate in the
              combination which may be selected for use by you or meet your
              requirements. We shall take reasonable steps to achieve maximum
              possible availability and to rectify any faults in the App as
              quickly as possible.
            </li>
          </ol>
        </p>
        <p>
          Under no circumstances shall we be liable for your acts or omissions.{" "}
        </p>
        <p>
          13.5 &ensp; We shall be entitled to discontinue service temporarily or
          permanently, with or without informing you, though every reasonable
          effort will be made to inform you of any interruptions in its service
          ahead of time.{" "}
        </p>
        <p>
          13.6 &ensp;The services and application are provided on an “as is” and
          “as available” basis and without warranties of any kind either express
          or implied. To the fullest extent permitted by applicable law, we
          expressly disclaim all warranties and conditions of any kind, whether
          express or implied, including, but not limited to, implied warranties
          of merchantability, fitness for a particular purpose and
          non-infringement of any third-party intellectual property right. We
          make no warranty that its website, the application or any services
          will be uninterrupted, timely, secure or error free.{" "}
        </p>
        <p>
          13.7 &ensp; To the fullest extent permitted under law, we will have no
          obligation or liability (whether arising in contract, warranty, tort
          (including negligence), product liability or otherwise) for any
          incidental, indirect or consequential damages or liabilities
          (including, but not limited to, any loss of data, revenue or profit)
          arising with respect to the use of the application or the platform,
          website or the services provided by us , even if we have been advised
          of the possibility of such damages. This foregoing limitation applies
          to damages arising from{" "}
          <ol className="lower-roman">
            <li>
              {" "}
              use or inability to use the application, the website or the
              services; or{" "}
            </li>
            <li>
              {" "}
              any other matter relating to the application, the website or the
              services.
            </li>
          </ol>
        </p>
        <p>
          13.8 &ensp; Some jurisdictions do not allow the exclusion or
          limitation of incidental or consequential damages, so the above
          limitation or exclusion may not apply. This warranty gives you
          specific legal rights, and you may have other rights that vary from
          state to state.{" "}
        </p>
        <p className="list-heading">
          14.0 &ensp; YOUR WARRANTIES AND INDEMNITY
        </p>
        <p>
          14.1 &ensp;Our legal liability under these Terms is limited to damages
          arising from our own gross negligence or willful misconduct or the
          gross negligence or willful misconduct of our employees and/or
          agents.  Under no circumstances shall we be liable for your acts or
          omissions.{" "}
        </p>
        <p>
          14.2 &ensp;You therefore warrant that beyond the termination of these
          terms against and claims against you, you shall further indemnify us
          to the fullest extent for any acts or omissions on your part that may
          lead to any losses, damages, or claims from any third parties at any
          time.{" "}
        </p>
        <p className="list-heading">15.0 &ensp; MISCELLANEOUS</p>
        <p>
          {" "}
          <strong>15.1 &ensp; Severability: </strong>If any part of these Terms
          is held to be invalid or unenforceable, the invalid or unenforceable
          provision will be deemed superseded by a valid, enforceable provision
          most closely matching the intent of the original provision and the
          remainder of the Terms will continue in effect.{" "}
        </p>
        <p>
          {" "}
          <strong>15.2 &ensp;Amendments:</strong> we reserve the right to change
          these Terms from time to time. Please refer to our website
          periodically for any changes. By continuing to access or use the
          Service after we make any such changes, you agree to be bound by the
          revised Terms. The general terms and conditions may be consulted at
          any time online at our website or in App.{" "}
        </p>
        <p>
          {" "}
          <strong>15.3 &ensp;Entirety:</strong> This agreement shall constitute
          the complete and exclusive agreement with respect to the subject
          matter of these Terms. The use of the App is expressly made
          conditional on your consent to these Terms.{" "}
        </p>
        <p>
          {" "}
          <strong>15.4 &ensp;No Waiver: </strong>our failure to enforce any
          right or provision of these Terms will not be deemed a waiver of such
          right or provision. {" "}
        </p>
        <p>
          {" "}
          <strong>15.5 &ensp; Force Majeure:</strong> we shall not be liable for
          any failure to perform its obligations under these Terms where such
          failure is as a result of acts of nature (including fire, flood,
          earthquake, storm, hurricane or other natural disaster), war,
          invasion, act of foreign enemies, hostilities (whether war is declared
          or not), civil war, rebellion, revolution, insurrection, military or
          usurped power or confiscation, terrorist activities, nationalization,
          government sanction, blockage, embargo, labor dispute, strike, lockout
          or interruption or failure of electricity, telephone or internet
          service.{" "}
        </p>
        <p>
          {" "}
          <strong>15.6 &ensp; Governing Law:</strong> The parties agree that
          these Terms and any claims hereunder shall be governed by and subject
          to the laws of the Federal Republic of Nigeria without regard to its
          conflict of law provisions. Any action hereunder must be brought, if
          at all, within one (1) year from the accrual of the cause of action.  {" "}
        </p>
        <p className="list-heading">
          16.0 &ensp; REVISIONS, CHANGES AND UPDATES TO APP AND WEBSITE{" "}
        </p>
        <p>
          16.1 &ensp;We reserve the right to revise, change and/or update the
          App in any manner in order to develop it further and improve it
          qualitatively.  It is your responsibility to ensure that the latest
          version of the App is installed on your Terminal Device.{" "}
        </p>
        <p className="list-heading">
          17.0 &ensp; REVISIONS, CHANGES AND UPDATES TO TERMS AND CONDITIONS{" "}
        </p>
        <p>
          17.1&ensp;We reserve the right to revise, change and/or update the
          terms herein in any manner in order to further protect you and provide
          quality services and security.  It is your responsibility to ensure
          that the latest version of the terms is properly studied and complied
          with. You will be informed in writing of any changes thereto and all
          alterations will be deemed as binding on you from the date of upload.{" "}
        </p>
      </div>
      <div className="d-flex justify-content-around">
        <button
          className="btn btn-primary col-4  md-col-8 my-4"
          onClick={handleBackButton}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default BuyerTermsandConditions;
