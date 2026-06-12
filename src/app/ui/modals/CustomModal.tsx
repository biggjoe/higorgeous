import React from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";
import Dialog from "../dialog";

const ShowIcon = ({ severity }: { severity: string }) => {
  const icon =
    severity === "success" ? (
      <FaCheckCircle />
    ) : severity === "error" ? (
      <FaExclamationTriangle />
    ) : (
      <FaInfoCircle />
    );

  return icon;
};
export default function CustomModal(props: { data: any }) {
  const modal = props.data;
  //const severity = modal.severity ? modal.severity : "info";
  console.log(modal);
  const hider = modal.hideduration ? modal.hideduration : 3000;
  if (modal.hideduration) {
    setTimeout(() => {
      modal.onclose();
    }, hider);
  }
  const tmx = new Date().getTime();
  const createMarkup = (text: any) => {
    return { __html: text };
  };
  const handleClose = () => {
    modal.onclose();
  };

  const status_bg = modal.severity ? "bg-" + modal.severity : "bg-info";
  const status_color = modal.severity
    ? "color-" + modal.severity
    : "color-info";
  /*const status_icon =
    modal.severity === "success" ? (
      <CheckCircle />
    ) : modal.severity === "error" ? (
      <FaExclamation />
    ) : (
      <FaInfoCircle />
    ); */
  return (
    <>
      <Dialog className="dialog" open={modal.onopen}>
        <div className={`head-area ${status_bg}`}>
          {/*  <i className={`fas fa-${status_icon}`}></i> */}
          <ShowIcon severity={modal.severity} />
        </div>

        <div className="alert-container">
          <div
            className={`message-area ${status_color}`}
            style={{ textAlign: "center" }}
          >
            {modal.message && (
              <div dangerouslySetInnerHTML={createMarkup(modal.message)} />
            )}
            {modal.formatted_message && (
              <div
                style={{ textAlign: "center" }}
                dangerouslySetInnerHTML={createMarkup(modal.formatted_message)}
              />
            )}
          </div>
        </div>
        <div className="divider" />
        <div className="dialog-actions">
          <div className="button-area">
            <button onClick={handleClose}>
              <span className="px10">EXIT</span>
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
