import React from "react";
import Dialog from "../dialog";
import { FaCheck } from "react-icons/fa";

const ConfirmModal = (props: { data: any }) => {
  const val = props.data;
  const createMarkup = (text: any) => {
    return { __html: text };
  };

  //const severity = val.severity ? val.severity : "info";
  const status_bg = val.severity ? "bg-" + val.severity : "bg-info";
  const status_color = val.severity ? "color-" + val.severity : "color-info";
  const status_icon =
    val.severity === "success"
      ? "check-circle"
      : val.severity === "error"
      ? "exclamation-triangle"
      : "info-circle";
  return (
    <>
      <Dialog className="dialog" open={val.onopen}>
        <div className="alert-container">
          <div className={`head-area ${status_bg}`}>
            <i className={`fas fa-${status_icon}`}></i>
          </div>
          <div className={`message-area ${status_color}`}>
            {val.message && (
              <div
                className="text-center"
                dangerouslySetInnerHTML={createMarkup(val.message)}
              />
            )}
            {val.loading_message && (
              <div
                className="text-center"
                dangerouslySetInnerHTML={createMarkup(val.loading_message)}
              />
            )}
          </div>
          <div className="button-area">
            <div className="flex align-items-center">
              <span className="spacer">
                <button className="btn btn-medium orange" onClick={val.onclose}>
                  <span className="px10"> EXIT</span>
                </button>
              </span>
              <div className="divider" />
              <span className="spacer">
                <button
                  className="btn btn-medium primary"
                  disabled={val.loading}
                  onClick={() => val.onaccept(val)}
                >
                  <FaCheck /> {val.loading ? "Working...." : "Yes, Proceed"}
                </button>
              </span>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default React.memo(ConfirmModal);
