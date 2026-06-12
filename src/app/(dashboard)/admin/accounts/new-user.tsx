"use client";
import React from "react";
import { DefaultEditor } from "react-simple-wysiwyg";
import HttpPost, { HttpPostForm } from "@/app/lib/http";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import CustomModal from "@/app/ui/modals/CustomModal";

const CreateUser = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<any>(false);
  const [loaded, setLoaded] = React.useState<any>(false);
  const closeOpts = () => setOptModal({ ...opts, onopen: false });
  const [opts, setOptModal] = React.useState<any>({
    onopen: false,
    onclose: closeOpts,
  });

  const handleInputChange = (e: any) => {
    const name = e.target.name;
    setMeta({ ...meta, [name]: e.target.value });
    console.log(name, e.target.value);
  };

  const [file, setFile] = React.useState<any>(null);
  const [new_file, setNewFile] = React.useState<any>(0);
  const [preview_image, setPreview] = React.useState<any>(null);
  //
  const handleFileChange = (e: any) => {
    const formData = new FormData();
    const fname = e.target.name;
    const flx = e.target.files[0];
    formData.append("file", flx);
    console.log(flx, formData);
    setFile(flx);
    console.log(flx);
    setPreview(URL.createObjectURL(flx)); // Would see a path?
    setNewFile(1);
  };

  //
  
  
  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };
  const [modal, setModal] = React.useState<any>({
    onopen: false,
    onclose: closeModal,
    title: "New product",
  });

  const [meta, setMeta] = React.useState<any>(null);
  const handleSubmit = async () => {
    console.log("SUBMITTING:: meta::", meta);

    setLoading(true);
    setLoaded(false);

    const formData = new FormData();
    formData.append("page", "admin");
    formData.append("firstname", meta?.firstname);
    formData.append("surname", meta?.surname);
    formData.append("role", meta?.role);
    formData.append("email", meta?.email);
    formData.append("photo", file);
    formData.append("password", meta?.password);
    formData.append("re_password", meta?.re_password);
    const raw = Object.fromEntries(formData.entries());
    try {
      const resp = await HttpPostForm(formData, "create_account");
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
        severity: severity, onclose: closeModal,
      });
      if (resp.status === 1) {
        router.push(`/admin/accounts`);
      }
    } catch (err: any) {
      console.log(err);
      setModal({
        ...modal,
        onopen: true,
        severity: "error",
        message: err.message, onclose: closeModal,
      });
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  };

  return (
    <>
    <section className="page-body">
        <div className="page-vertical-pad">
      <div className="dashboard-page-title">
        <div className="breadcrumbs">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/accounts">Accounts</Link>
          <span>New Account</span>
        </div>
      </div>

      <section className="page-detail-container">
        <div className="py30 px20">
          <div className={`input  spacer ${loading ? "iconed" : ""}`}>
            <label>Firstname</label>
            <input
              type="text"
              className="input-form-control"
              name="firstname"
              onChange={handleInputChange}
              placeholder={"Firstname "}
            />
          </div>

          <div className={`input  spacer ${loading ? "iconed" : ""}`}>
            <label>Surname</label>
            <input
              type="text"
              className="input-form-control"
              name="surname"
              onChange={handleInputChange}
              placeholder={"Surname"}
            />
          </div>

          <div className={`input  spacer ${loading ? "iconed" : ""}`}>
            <label>Email</label>
            <input
              type="text"
              className="input-form-control"
              name="email"
              onChange={handleInputChange}
              placeholder={"Email"}
            />
          </div>

          <div className={`input  spacer ${loading ? "iconed" : ""}`}>
            <label>Password</label>
            <input
              type="text"
              className="input-form-control"
              name="password"
              onChange={handleInputChange}
              placeholder={"Password"}
            />
          </div>

          <div className={`input  spacer ${loading ? "iconed" : ""}`}>
            <label>Confirm Password</label>
            <input
              type="text"
              className="input-form-control"
              name="re_password"
              onChange={handleInputChange}
              placeholder={"Confirm Password"}
            />
          </div>

          <div className={`input  spacer`}>
            <label className="textfeld-control">
              {"Role"}
              <sup className="boldest red" title="This field is required!">
                *
              </sup>
            </label>
            <select
            title="Role"
              className={" input-form-control "}
              name={"role"}
              required
              onChange={handleInputChange}
            >
              <option value="">Account Role</option>
              
                <option value="admin">Admin</option>
                <option value="user">Regular user</option>
            </select>
          </div>

          <div className="banner-section">
            {preview_image && (
              <div className="image_preview">
                <img className="" src={preview_image} alt="preview Image" />
              </div>
            )}
            <div
              className={
                loading ? " input iconed mt20 pt10" : " input  mt20 pt10"
              }
            >
              <label>Attach Account Picture</label>
              <input
                type="file"
                className="form-control"
                name="file"
                onChange={handleFileChange}
                placeholder={"picture"}
              />
            </div>
          </div>


<div className="pt20">
          <button className="btn" type="submit" disabled={loading} onClick={handleSubmit}>
            {loading ? "Working..." : " Add Account"}
          </button></div>
        </div>
      </section>
     </div>
     </section>
      {modal.onopen && <CustomModal data={modal} />}
    </>
  );
};

export default CreateUser;
