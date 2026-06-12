"use client";
import React from "react";

import Link from "next/link";
import { removeCookie } from "../lib/auth_base/cookie_auth";
import { FaSignOutAlt } from "react-icons/fa";

export default function Dialog({
  children,
  open,
  className,
}: {
  children: React.ReactNode;
  open?: boolean;
  className?: string;
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
      {open && <div className={className}>{children}</div>}
    </React.Fragment>
  );
}
