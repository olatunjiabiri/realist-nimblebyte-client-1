/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ReactPortal from "../ReactPortal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

import "./Modal.css";

function Modall({ children, isOpen, handleClose, styling = "modal-content" }) {
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
        classNames="modal"
        nodeRef={nodeRef}
      >
        <div className="modal" ref={nodeRef} onClick={handleClose}>
          {/* Prevent click inside the modal from closing it */}
          <div className={styling} onClick={(e) => e.stopPropagation()}>
            <Tooltip title="Close">
              <Link onClick={handleClose} className="close-btn">
                <AiOutlineCloseCircle />
              </Link>
            </Tooltip>

            {children}
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}
export default Modall;
