import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import "./NimbleRentInfoFaq.css";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme, expanded }) => ({
  //   border: `4px solid ${theme.palette.divider}`,
  borderRadius: "18px",
  border: `2px solid ${expanded ? "#F99520" : "transparent"}`, //
  //   boxShadow: expanded ? "none" : "0px 4px 8px rgba(0, 0, 0, 0.1)", // Box shadow when closed
  boxShadow: expanded ? "none" : "0px 5px 16px 0px #080F340F ", // Box shadow when closed

  "&:not(:last-child)": {
    // borderBottom: 0,  // border between accordion text and details
  },
  "&::before": {
    display: "none",
  },
}));

const ExpandIcon = styled(ArrowForwardIosSharpIcon)(({ theme, expanded }) => ({
  border: "1px solid #F99520",
  //   border: `1px solid ${expanded ? "#F99520" : "red"}`, // Red border when expanded
  padding: "0.5rem",
  backgroundColor: expanded ? "#F99520" : "#FFFFFF",
  borderRadius: "50%",
  color: expanded ? "white" : "#F99520",
  fontSize: "2rem",
  transform: expanded ? "rotate(270deg)" : "none", // Rotate icon when expanded
  transition: "transform 0.2s ease-in-out", // Add transition effect
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ExpandIcon expanded={props.expanded} />}
    {...props}
  />
))(({ theme, expanded }) => ({
  backgroundColor: "#FFFFFF",
  borderRadius: "18px",

  justifyContent: "space-between", // Aligns items at the end
  "& .MuiAccordionSummary-content": {
    margin: theme.spacing(5), // Adjust margin as needed
    // margin
    margin: expanded ? theme.spacing(3) : theme.spacing(5),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme, expanded }) => ({
  //  padding: theme.spacing(5),
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),

  paddingBottom: expanded ? theme.spacing(3) : theme.spacing(5),
  //   borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function NimbleRentInfoFaq() {
  const [expanded, setExpanded] = useState("panel1");
  const [parentHeight, setParentHeight] = useState("auto");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    setParentHeight(newExpanded ? "1000px" : "auto"); // Set parent height accordingly
  };

  return (
    <>
      <div
        className="nimble-rent-info-faq-container"
        // style={{ height: parentHeight }} // Apply dynamic height to parent container
      >
        <div className="nimble-rent-info-faq-header-container">
          <span className="nimble-rent-info-faq-header">
            Frequently asked questions
          </span>
        </div>

        <div
          className="nimble-rent-info-faq-inner-c"
          // style={{ height: parentHeight }} // Apply dynamic height to parent container
        >
          <div className="nimble-rent-info-faq-accordion-c  ">
            <Accordion
              defaultExpanded
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
                expanded={expanded === "panel1"}
              >
                <Typography className="accordion-main-text">
                  What is Nimble Rent?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nimblerent is a Rent now pay later service on Nimblecasa. This
                  feature allows our valued customers to secure their desired
                  property for rent immediately and pay back the rental amount
                  in convenient installments.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header"
                expanded={expanded === "panel2"}
              >
                <Typography className="accordion-main-text">
                  Who is Nimblerent for?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  NimbleRent is set to provide rental services for Federal
                  government and State government workers(Civil servants) that
                  are living in Lagos.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                aria-controls="panel3d-content"
                id="panel3d-header"
                expanded={expanded === "panel3"}
              >
                <Typography className="accordion-main-text">
                  How does it work?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nimblerent is in collaboration with some financial
                  institutions that are willing to give loans. Eligible users
                  can search for rental properties of interest on Nimblecasa,
                  contact us, and further conversations will be completed
                  offline.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header"
                expanded={expanded === "panel4"}
              >
                <Typography className="accordion-main-text">
                  How will the repayment be?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The financial institutions pay for the rental properties
                  outrightly, while the user pays back in instalments directly
                  from their salary account.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}
