import { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ReactPortal from "../ReactPortal";
import { AiOutlineClose } from "react-icons/ai";

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
        classNames="modal"
        nodeRef={nodeRef}
      >
        <div className="modal" ref={nodeRef}>
          <div className="modal-content">
            <button onClick={handleClose} className="close-btn">
              <AiOutlineClose />
            </button>
            {children}
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}
export default Modall;
