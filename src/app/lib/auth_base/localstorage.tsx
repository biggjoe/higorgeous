"use client";

import React from "react";

export function saveToken(token: string) {
  localStorage.setItem("access_token", token);
}
export function getToken(name: string) {
  return localStorage.getItem(name);
}

export function getCurrentUser() {
  const userJson = localStorage?.getItem("user");
  if (userJson) {
    if (typeof userJson === "object") {
      return JSON.parse(userJson);
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export function updateUser(user: any, reload = false) {
  localStorage.setItem("user", JSON.stringify(user));
  if (reload) {
    return (window.location.href = "/account/settings");
  }
}
export function isLogged() {
  const usr = getCurrentUser();
  if (usr) {
    if (Object.keys(usr).length === 0) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}
