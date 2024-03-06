// import React, { useEffect } from "react";
// import Step from "@mui/material/Step";
// import Stepper from "@mui/material/Stepper";
// import StepButton from "@mui/material/StepButton";
// import StepLabel from "@mui/material/StepLabel";
// import StepContent from "@mui/material/StepContent";
// import Typography from "@mui/material/Typography";

// import "./RentDetailsPage.css";

// const RentDetailsPage = () => {
//   useEffect(() => {
//     // Scroll to the top of the page when the component mounts
//     window.scrollTo(0, 0);
//   }, []);

//   const steps = [
//     {
//       label: "Search properties on Nimble rent",
//       content: (
//          <p>
//           Select a desired apartment from properties available on Nimble rent.
//          </p>
//        ),
//     },
//     {
//       label: "Payment option",
//       content: (
//         <p>
//           Ensure you check use Nimble rent to pay while submitting property
//           request.
//         </p>
//       ),
//     },
//     {
//       label: "Verification",
//       content: (
//         <p>
//           We will reach out to you to help confirm the necessary information to
//           approve your loan.
//         </p>
//       ),
//     },
//     {
//       label: "Access to loan",
//       content: (
//         <p>
//           Once verification is complete and you meet all eligibility criteria,
//           your loan is disbursed.
//         </p>
//       ),
//     },
//   ];

//   return (
//     <div className="rent-details-container">
//       <h2 className="main-title">
//         You can rent now and pay later @Nimble Rent
//       </h2>
//       <p className="title-subtexts">
//         NimbleRent is a subsidiary of NimbleCasa that offers a RNPL(Rent Now Pay
//         Later) service. We allow our valued /n customers to secure their desired
//         property for rent immediately and pay back the rental amount
//         inconvenient installments. We have collaborated with some financial
//         institutions that are willing to offer loan services.
//       </p>

//       <div className="cards-container">
//         <div className="card-one-container">
//           <div>
//             <div className="card-one-title-container">
//               <h3 className="card-one-title">Eligibility Status</h3>
//               <div className="card-one-subtitle-box">
//                 <p className="subtitle-box-text">
//                   Please note that only Civil Servants are qualified for the
//                   offer.
//                 </p>
//               </div>
//             </div>

//             <div className="card-one-inner-text-container">
//               <p className="subtitle-text">
//                 The followings are the eligible criteria when using Nimble rent.
//               </p>
//               <ul className="listed-style">
//                 <li>
//                   Your salary account must be operational for at least 6 months.
//                 </li>
//                 <li>Your account number must be linked to BVN.</li>
//                 <li>Correctly updated phone numbers.</li>
//                 <li>Must have positive credit record with Credit Bureaus.</li>
//                 <li>
//                   Minimum Loan Amount: N500,000 (Five Hundred Thousand Naira
//                   only).
//                 </li>
//                 <li>Convenient repayment period up to 12 months.</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="card-two-container">
//           <div className="card-two-inner-container">
//             <div className="stepper-title-container">
//               <h3 className="stepper-title">How it works</h3>
//               <p className="stepper-subtext">
//                 Quick and easy steps to use Nimble rent!
//               </p>
//             </div>

//             <div className="stepper-container">
//               <Stepper
//                 className="label-content"
//                 activeStep={0}
//                 orientation="vertical"
//               >
//                 {steps.map((step, index) => (
//                   <Step key={index}>
//                     <StepButton>
//                       <StepLabel>
//                         {step.label}
//                       </StepLabel>
//                       <StepContent>
//                       {step.content}
//                       </StepContent>
//                     </StepButton>
//                   </Step>
//                 ))}
//               </Stepper>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RentDetailsPage;

import React, { useEffect } from "react";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepButton from "@mui/material/StepButton";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import "./RentDetailsPage.css";

// Define the CSS class for bold labels
const labelStyles = {
  fontWeight: "bold",
};

// Define the OrangeStepIcon function
function OrangeStepIcon(index) {
  return function OrangeStepIconComponent(props) {
    const { active, completed } = props;

    return (
      <div
        style={{
          backgroundColor: active || completed ? "#EE7B0D" : undefined,
          color: "white",
          width: 24,
          height: 24,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {index + 1}
      </div>
    );
  };
}

const RentDetailsPage = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  // Define the steps data array
  const steps = [
    {
      label: "Search properties on Nimble rent",
      description:
        "Select a desired apartment from properties available on Nimble rent.",
    },
    {
      label: "Payment option",
      description:
        "Ensure you check use Nimble rent to pay while submitting property request.",
    },
    {
      label: "Verification",
      description:
        "We will reach out to you to help confirm the necessary information to approve your loan.",
    },
    {
      label: "Access to loan",
      description:
        "Once verification is complete and you meet all eligibility criteria, your loan is disbursed.",
    },
  ];

  return (
    <div className="rent-details-container">
      <div className="main-title-container">
        <h2 className="main-title">
          You can rent now and pay later{" "}
          <span className="nimble-rent">Nimble Rent</span>
        </h2>
        <p className="title-subtexts">
          NimbleRent is a subsidiary of NimbleCasa that offers a RNPL(Rent Now
          Pay Later) service. We allow our valued customers to secure their
          desired property for rent immediately and pay back the rental amount
          inconvenient installments. We have collaborated with some financial
          institutions that are willing to offer loan services.
        </p>
      </div>
      <div className="cards-container">
        <div className="card-one-container">
          <div>
            <div className="card-one-title-container">
              <h3 className="card-one-title">Eligibility Status</h3>
              <div className="card-one-subtitle-box">
                <p className="subtitle-box-text">
                  Please note that only Civil Servants are qualified for the
                  offer.
                </p>
              </div>
            </div>

            <div className="card-one-inner-text-container">
              <p className="subtitle-text">
                The followings are the eligible criteria when using Nimble rent.
              </p>
              <ul className="listed-style">
                <li>
                  Your salary account must be operational for at least 6 months.
                </li>
                <li>Your account number must be linked to BVN.</li>
                <li>Correctly updated phone numbers.</li>
                <li>Must have positive credit record with Credit Bureaus.</li>
                <li>
                  Minimum Loan Amount: N500,000 (Five Hundred Thousand Naira
                  only).
                </li>
                <li>Convenient repayment period up to 12 months.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card-two-container">
          <div className="card-two-inner-container">
            <div className="stepper-title-container">
              <h3 className="stepper-title">How it works</h3>
              <p className="stepper-subtext">
                Quick and easy steps to use Nimble rent!
              </p>
            </div>

            <div className="stepper-container">
              {/* <Box sx={{ maxWidth: 400 }}> */}
              <Stepper
                className="label-content"
                activeStep={steps.length - 1}
                orientation="vertical"
                // connector={<div style={{ color: "#EE7B0D", height: "6px" }} />}
              >
                {steps.map((step, index) => (
                  <Step key={step.label} expanded>
                    <StepLabel
                      StepIconComponent={OrangeStepIcon(index)}
                      // style={{ fontWeight: "bold" }}
                    >
                      <span className="step-label"> {step.label} </span>
                    </StepLabel>
                    <StepContent>
                      <Typography
                        sx={{
                          borderLeft: "2px solid orange",
                          marginLeft: -2.6,
                          paddingLeft: 2.75,
                        }}
                      >
                        {step.description}
                      </Typography>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {/* </Box> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentDetailsPage;
