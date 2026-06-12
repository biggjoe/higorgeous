"use client";
import React from "react";
import Link from "next/link";
import { postLogin } from "@/app/lib/postData";
import CustomModal from "../modals/CustomModal";
import { saveCookie } from "@/app/lib/auth_base/cookie_auth";
import LoginForm from "./LoginForm";

export default function LoginLink({
  loading,
  button_text,
  class_name,
}: {
  loading?: boolean;
  button_text?: string;
  class_name?: string;
}) {
  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };

  const [modal, setModal] = React.useState({
    onopen: false,
    onclose: closeModal,
    title: "User Login",
  });

  const launchModal = () => {
    setModal({ ...modal, onopen: true, onclose: closeModal });
  };
  return (
    <React.Fragment>
      <Link href="#" onClick={launchModal} className={class_name}>
        {loading ? "Working..." : button_text}
      </Link>
      <div className="dialog">
        <div className="dialogContent">
          <LoginForm return_function={closeModal} />
        </div>
        <div className="divider"/>
        <div className="dialogActions">
          <button onClick={modal.onclose} color="warning">
            Close
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
