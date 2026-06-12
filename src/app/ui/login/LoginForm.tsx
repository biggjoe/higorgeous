"use client";
import React from "react";
import Link from "next/link";
import { postLogin } from "@/app/lib/postData";
import CustomModal from "../modals/CustomModal";
import { saveCookie } from "@/app/lib/auth_base/cookie_auth";

const LoginForm = ({
  intro_message,
  return_function,
}: {
  intro_message?: string;
  return_function?: any;
}) => {
  const [form, setForm] = React.useState<any>({});
  const handleInput = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm({ ...form, [name]: value });
  };
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [input_togged, setInputTog] = React.useState<any>(false);

  const closeModalData = () => {
    setModalData({ ...modal_data, onopen: false });
  };

  const [modal_data, setModalData] = React.useState({
    onopen: false,
    onclose: closeModalData,
    title: "User Login",
    message: "",
    severity: "",
  });

  //
  const do_log = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await postLogin(form);
      console.log(res);
      const rsp = res;
      const severity =
        rsp.status === 1
          ? "success"
          : rsp.status === 0
          ? "error"
          : rsp.status === 44
          ? "error"
          : "info";
      setModalData({
        ...modal_data,
        onopen: true,
        message: rsp.message,
        severity: severity,
        onclose: closeModalData,
      });

      console.log("::::", rsp.status, rsp.isFound);
      if (
        //res.jwt &&
        // res.expireAt &&
        rsp.status === 1 &&
        rsp.isFound === 1
      ) {
        const jwt = rsp.jwt;
        const usr = JSON.stringify(rsp.user);
        localStorage.setItem("user", usr);
        await saveCookie("user", usr);
        //localStorage.setItem("access_token", jwt);
        await saveCookie("access_token", jwt);
        const next_url = rsp?.user?.role === "admin" ? "/admin" : "/account";
        const redir_delay = res.status === 1 ? 10 : 1000;
        //return_function();
        setTimeout(() => {
          console.log("Redirecting now...");
          window.location.href = next_url;
          setModalData({
            ...modal_data,
            onopen: false,
            onclose: closeModalData,
          });

          return;
        }, redir_delay);
      }
    } catch (error: any) {
      setModalData({
        ...modal_data,
        onopen: true,
        message: error.message,
        severity: "error",
        onclose: closeModalData,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <React.Fragment>
      <div>
        {intro_message && intro_message !== "" && (
          <h2 className="text-center txt-lg px20 pb30">{intro_message}</h2>
        )}

        <div className="input iconed">
          <label>Email</label>
          <input
            type="text"
            name="login"
            className="input-form-control"
            placeholder="Email"
            onChange={handleInput}
          />
          <span className="input-icon">
            <i className="fas fa-user"></i>
          </span>
        </div>
        <div className="input iconed togger">
          <label>Password</label>
          <input
            type={input_togged ? "text" : "password"}
            name="password"
            className="input-form-control"
            placeholder="Enter password"
            onChange={handleInput}
          />
          <span className="input-icon">
            <i className="fas fa-lock"></i>
          </span>
          <span className="input-togger">
            <a onClick={() => setInputTog(!input_togged)}>
              <i
                className={`fas ${input_togged ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
            </a>
          </span>
        </div>
        <div className="flex flex-row align-items-center">
          <button
            disabled={loading}
            className="btn btn-medium"
            type="submit"
            onClick={do_log}
          >
            {loading ? "Working..." : "Login"}
          </button>

          <span className="spacer"></span>
          <span className="pl5">
          </span>
        </div>
      </div>

      {modal_data.onopen && <CustomModal data={modal_data} />}
    </React.Fragment>
  );
};

export default LoginForm;
