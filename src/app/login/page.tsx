import React from "react";
import LoginForm from "../ui/login/LoginForm";
import { getCookie } from "../lib/auth_base/cookie_auth";
import PageTop from "../ui/page-top";

export default async function Home() {
  const user = await getCookie("user");

  return (
    <React.Fragment>
      <PageTop
        is_logged={user ? true : false}
        page={{ title: "Login", bg_color: "sky" }}
      />
      <div className="login-cover">
        <div className="login-pane">
          <LoginForm />
        </div>
      </div>
    </React.Fragment>
  );
}
