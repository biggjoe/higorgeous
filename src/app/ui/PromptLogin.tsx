import React from "react";

import LoginForm from "./login/LoginForm";
import Dialog from "./dialog";

const PromptLogin = (props: any) => {
  const { button_text, return_url } = props;
  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };

  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState({
    onopen: false,
    onclose: closeModal,
    title: "User Login",
  });
  const launchModal = () => {
    setModal({ ...modal, onopen: true, onclose: closeModal });
  };
  return (
    <>
      <button
        className="btn btn-medium"
        disabled={loading}
        onClick={launchModal}
      >
        {loading ? "Working..." : button_text}
      </button>

      <Dialog open={modal.onopen}>
        <div className="dialogContent">
          <section>
            <LoginForm
              return_function={() => {
                return null;
              }}
            />
          </section>
        </div>
        <div className="dialogActions">
          <button onClick={modal.onclose} className="btn btn-error">
            Close
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default React.memo(PromptLogin);
