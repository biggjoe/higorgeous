import React from "react";

import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import { postDelete } from "../lib/postData";
import Dialog from "./dialog";
import { useRouter } from "next/navigation";

const DeleteItem = (props: any) => {
  const { item, item_label, button_text, return_url,class_name  } = props;
  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [loaded_status, setLoadedStatus] = React.useState(0);
  const [message, setMessage] = React.useState("false");
  const [modal, setModal] = React.useState({
    onopen: false,
    onclose: closeModal,
    title: "User Login",
  });
  const launchModal = () => {
    setModal({ ...modal, onopen: true, onclose: closeModal });
  };

  const do_delete = async () => {
    setLoading(true);
    setLoaded(false);
    try {
      const res = await postDelete({
        act: "delete",
        label: item_label,
        item_id: item.id,
      });
      console.log("res:",res)
      setMessage(res.message);
      console.log(message);
      if (res.status) {
        setTimeout(() => {
          modal.onclose();
          if(return_url){
                  router.push(return_url);
          }
        }, 1000);
      }
      setLoadedStatus(res.status);
    } catch (error: any) {
      setMessage(error.message);
      setLoadedStatus(0);
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  };
  return (
    <>
      <Link
        href="#"
        onClick={launchModal}
        title={`Delete this ${item_label ? item_label : "item"}`}
        className={class_name}
      >
        <FaTrashAlt /> {button_text && (<span className="pl5">{button_text}</span>)}
      </Link>

      <Dialog open={modal.onopen}>
        <div className="dialogContent">
          <section className="bg-white px10 py10">
            <h3 className="mb5 mt0 pt0">Are you sure?</h3>
            {!loading && (
            <div className="date-span mb10">
              This {item_label} will be permanently removed from this site
            </div>)}
            {loading && (
            <div className="date-span mb10 mt10">
              Working....
            </div>)}
            {loaded_status ? (
              <div className="pb20">{message}</div>
            ) : (
              <div className="flex py10">
                <button
                  className="btn btn-small"
                  onClick={do_delete}
                  disabled={loading}
                >
                  {loading ? "Working...":"Yes, Proceed"}
                </button>
              </div>
            )}
           {!loading && ( <button
              onClick={modal.onclose}
              disabled={loading}
              className="btn btn-error btn-small"
            >
              Cancel
            </button>)}
          </section>
        </div>
      </Dialog>
    </>
  );
};

export default React.memo(DeleteItem);
