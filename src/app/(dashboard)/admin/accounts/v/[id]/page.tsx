import React from "react";
import {  fetchUserDetails } from "@/app/lib/fetchData";
import UserDetails from "../../user-details";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | any }>;
}) {
  const par = await params;
  const user = await fetchUserDetails(par.id);
  console.log("uss::",user)
  return (
    <React.Fragment>
      <UserDetails user={user}/>
    </React.Fragment>
  );
}
