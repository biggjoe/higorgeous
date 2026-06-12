"use client";
import React, { useCallback } from "react";
import { DefaultEditor } from "react-simple-wysiwyg";
import HttpPost, { HttpPostForm } from "@/app/lib/http";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import CustomModal from "@/app/ui/modals/CustomModal";
import { removeCookie } from "@/app/lib/auth_base/cookie_auth";
import { FaAt, FaChevronDown, FaLock, FaPen, FaPlus, FaUser, FaUserSecret } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import DeleteItem from "@/app/ui/DeleteItem";
import MakeAdmin from "./MakeAdmin";


//

 const FILE_URL = process.env.NEXT_PUBLIC_DOMAIN_ROOT;

 //
const UserDetails = ({
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

  const closeModal = (name:string) => {

    //console.log("name::",name)
    if(name ==="modal"){  
    setModal({ ...modal, onopen: false })} 
    if(name ==="confirm"){
         setConfirm({ ...confirm, onopen: false }) }

     if(name ==="add"){
         setAdd({ ...add, onopen: false })} 
  };
const default_objs = {
    onopen: false,
    onclose: closeModal,
    title: "New product",
  }
  const [modal, setModal] = React.useState<any>(default_objs);
  const [add, setAdd] = React.useState<any>(default_objs);
  const [confirm, setConfirm] = React.useState<any>(default_objs);
  const [pass, setPass] = React.useState<any>(default_objs);


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


  const make_admin = ()=>{

  }

  return (
    <>
      <div className="dashboard-page-title">
        <div className="breadcrumbs">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/accounts">Accounts</Link>
          <span>{user?.name}</span>
        </div>
      </div>

      <div className="flex py10">
        <span className="spacer"></span>
        <span className="px0">
            
            <Link className="btn btn-small" href={`/admin/accounts/new`}>
              <FaPlus className="br5"/>
              Add New</Link>   
        </span>
      </div>

      <section className="page-body">
        <div className="page-vertical-pad">
   
        <div className="product-container  white">
          <div className="product-image-side">
            <div className="product-image-container">
              <img
                src={`/model-1.webp`}
                alt={user?.name}
              />
            </div>
            
          </div>
          <div className=" bg-white flex-grow px10 py10">

            
<div className="list-item  border-bottom flex flex-row align-items-center"
><span className="p0"><FaUserCircle/></span>
   <span className="spacer ml10">{user?.name}</span>
</div>
            
<div className="list-item  border-bottom flex flex-row align-items-center"
><span className="p0"><FaAt/></span>
   <span className="spacer ml10">{user?.email}</span>
</div>
            
<div className="list-item  border-bottom flex flex-row align-items-center"
><span className="p0"><FaUserSecret/></span>
   <span className="spacer ml10">{user.role ? user.role:"None"}</span>
</div>


<div className="list-item  border-bottom flex flex-row align-items-center"
><span className="p0"><FaLock/></span>
   <Link className="spacer ml10" href={`/admin/accounts/change-password/${user?.id}`}>Change Password</Link>
</div>
            
<div className="list-item  border-bottom flex flex-row align-items-center"
>
  {user?.role !=="admin" && (
  <MakeAdmin  item={user} return_url="/admin/accounts" class_name="btn btn-small mx10 py20"  button_text="Make Admin" item_label={user?.name}/>
 )} <DeleteItem item={user} return_url="/admin/accounts"
   item_label="account" button_text="Remove Account" class_name="btn btn-small py20 btn-error" />
</div>


</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserDetails;



const UserItem = ({item}:{item:any;})=>{
  
    return (
<Link className="list-item br-5 flex flex-row align-items-center" 
href={`/admin/account/v/${item.id}`}
>
              <span className="p0">
           <FaUserCircle/>
              </span>
              <span className="spacer ml10">{item?.name}</span>
              <div className="p0 relative">
                <DeleteItem item={item} item_label="account"/>
              </div>
            </Link>
    )
}