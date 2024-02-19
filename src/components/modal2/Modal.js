/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ReactPortal from "../ReactPortal";
import { AiOutlineClose } from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";

import "./Modal.css";

function Modall({ children, isOpen, handleClose }) {
  const nodeRef = useRef(null);
  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <CSSTransition
        in={isOpen}
        timeout={{ entry: 0, exit: 300 }}
        unmountOnExit
        classNames="modaal"
        nodeRef={nodeRef}
      >
        <div className="modaal" ref={nodeRef}>
          {/* <div className="modaal" ref={nodeRef} onClick={handleClose}> */}
          {/* Prevent click inside the modal from closing it */}
          <div className="modaal-content" onClick={(e) => e.stopPropagation()}>
            {/* <Tooltip title="Close"> */}
            {/*   <button onClick={handleClose} className="cloose-btn"> */}
            {/*     <AiOutlineClose /> */}
            {/*   </button> */}
            {/* </Tooltip> */}

            {children}
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}
export default Modall;
