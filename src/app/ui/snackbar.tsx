"use client";
import React from "react";

import Link from "next/link";
import { removeCookie } from "../lib/auth_base/cookie_auth";
import { FaSignOutAlt } from "react-icons/fa";

export default function Snackbar({
  children,
  open,
  className,
  severity,
  onclose,
  autoHideDuration,
}: {
  children: React.ReactNode;
  open?: boolean;
  className?: string;
  severity?: string;
  onclose?: any;
  autoHideDuration?: number;
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
      <div className="toast">
        <div className={`py20 px20 ${severity}`}>{children}</div>
      </div>
    </React.Fragment>
  );
}
