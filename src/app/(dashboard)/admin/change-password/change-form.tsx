"use client";
import React from "react";
import { DefaultEditor } from "react-simple-wysiwyg";
import HttpPost, { HttpPostForm } from "@/app/lib/http";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import CustomModal from "@/app/ui/modals/CustomModal";
import { removeCookie } from "@/app/lib/auth_base/cookie_auth";

const ChangeForm = ({
  user
}: {
  user: any;
}) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<any>(false);
  const [loaded, setLoaded] = React.useState<any>(false);
  
  const closeOpts = () => setOptModal({ ...opts, onopen: false });
  const [opts, setOptModal] = React.useState<any>({
    onopen: false,
    onclose: closeOpts,
  });
  const [meta, setMeta] = React.useState<any>(null);
  const handleInputChange = (e: any) => {
    const name = e.target.name;
    setMeta({ ...meta, [name]: e.target.value });
    console.log(name, e.target.value);
  };


  const [old_password, setOldPassword] = React.useState<any>("");
  const [new_password, setNewPassword] = React.useState<any>("");
  const [re_password, setRePassword] = React.useState<any>("");


  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };
  const [modal, setModal] = React.useState<any>({
    onopen: false,
    onclose: closeModal,
    title: "New product",
  });


  const handleSubmit = async () => {
    console.log("SUBMITTING:: meta::", meta);

    setLoading(true);
    setLoaded(false);

    const formData = new FormData();
    formData.append("old_password", meta?.old_password);
    formData.append("new_password", meta?.new_password);
    formData.append("re_password", meta?.re_password);
    formData.append("mode", "change");
    const raw = Object.fromEntries(formData.entries());

    console.log("Raw::",raw)
  
    try {
      const resp = await HttpPostForm(formData, "change_password");
      console.log(resp);
      const severity =
        resp.status === 1
          ? "success"
          : resp.status === 0
          ? "error"
          : resp.status === 44
          ? "error"
          : "info";
      setModal({
        ...modal,
        onopen: true,
        message: resp.message,
        severity: severity,
      });
      if (resp.status === 1) {
        setTimeout(async() => {
          console.log("Redirecting now...");
          await removeCookie("user");
          await removeCookie("access_token");
        },100)
      }
    } catch (err: any) {
      console.log(err);
      setModal({
        ...modal,
        onopen: true,
        severity: "error",
        message: err.message,
      });
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  };

  return (
    <>
      <div className="dashboard-page-title">
        <div className="breadcrumbs">
          <Link href="/admin">Dashboard</Link>
          <span>Change Password</span>
        </div>
      </div>

      <section className="page-detail-container">
        <div className="py30 px20">
          <div className={`input  spacer ${loading ? "iconed" : ""}`}>
            <label>Old Password</label>
            <input
              type="text"
              className="input-form-control"
              name="old_password"
              onChange={handleInputChange}
              placeholder={"Old Password"}
            />
          </div>
          <div className={`input  spacer ${loading ? "iconed" : ""}`}>
            <label>New Password</label>
            <input
              type="text"
              className="input-form-control"
              name="new_password"
              onChange={handleInputChange}
              placeholder={"New Password"}
            />
          </div>

          <div className={`input  spacer ${loading ? "iconed" : ""}`}>
            <label>Confirm New Password</label>
            <input
              type="text"
              className="input-form-control"
              name="re_password"
              onChange={handleInputChange}
              placeholder={"Confirm New Password"}
            />
          </div>

          <button className="btn" type="submit" disabled={loading} onClick={handleSubmit}>
            {loading ? "Working..." : " Change Password"}
          </button>
        </div>
      </section>
      {modal.onopen && <CustomModal data={modal} />}
    </>
  );
};

export default ChangeForm;
