"use client";
import React from "react";
import Link from "next/link";
import { removeCookie } from "../lib/auth_base/cookie_auth";
import { FaSignOutAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import Dialog from "./dialog";

export default function LogOut({
  loading,
  button_text,
  class_name,
  style,
  show_icon,
}: {
  loading?: boolean;
  button_text?: string;
  class_name?: string;
  style?: any;
  show_icon?: boolean;
}) {
  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };

  const [modal, setModal] = React.useState({
    onopen: false,
    onclose: closeModal,
    title: "User Log Out",
  });

  const launchModal = () => {
    setModal({ ...modal, onopen: true, onclose: closeModal });
  };
  const new_style = style ? style : {};
  return (
    <React.Fragment>
      <Link
        href="#"
        onClick={launchModal}
        style={{
          color: new_style.color ? new_style.color : "orange !important",
          display: "inline-flex",
          alignItems: "center",
          ...new_style,
        }}
        className={class_name}
      >
        {show_icon && (
          <FaSignOutAlt
            style={{
              color: new_style.color ? new_style.color : "orange",
              marginRight: "5px",
            }}
          />
        )}
        {button_text ? button_text : "Log Out"}
      </Link>
      <Dialog className="dialog" open={modal.onopen}>
        <div className="alert-container">
          <div className={`head-area bg-warn`}>
            <FaSignOutAlt />
          </div>
          <div className={`message-area color-info`}>
            <div className="text-center">
             
              <h4 className="pt0 pb10 mt0 spacer flex align-items-center">
                <FaSignOutAlt
                  style={{
                    marginRight: "5px",
                  }}
                />
                Sure you want to log out?
              </h4>
            </div>
          </div>

          <div className="button-area">
            <div className="flex align-items-center">
              <span className="spacer">
                <button
                  className="btn btn-medium orange"
                  onClick={modal.onclose}
                >
                  <span className="px10"> EXIT</span>
                </button>
              </span>
              <div className="divider" />
              <span className="spacer">
                <button
                  className="btn btn-medium primary"
                  onClick={async () => {
                    //await removeCookie("access_token");
                    await removeCookie("user");
                    await removeCookie("access_token");
                    localStorage.removeItem("user");
                    window.location.href = "/";
                  }}
                >
                  <FaCheck /> Yes, Log Out
                </button>
              </span>
            </div>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
