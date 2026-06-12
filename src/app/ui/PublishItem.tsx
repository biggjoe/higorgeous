import React from "react";
import Link from "next/link";
import { FaBookOpenReader } from "react-icons/fa6";
import { postPublish } from "../lib/postData";
import Dialog from "./dialog";

const PublishItem = (props: any) => {
  const {
    item,
    item_label,
    item_act,
    is_white,
    show_dislike,
    button_text,
    return_url,
  } = props;

  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };

  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [loaded_status, setLoadedStatus] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [modal, setModal] = React.useState({
    onopen: false,
    onclose: closeModal,
    title: "User Login",
  });
  const launchModal = () => {
    setModal({ ...modal, onopen: true, onclose: closeModal });
  };

  const do_publish = async () => {
    setLoading(true);
    setLoaded(false);
    try {
      const res = await postPublish({
        act: item_act,
        label: item_label,
        item_id: item.id,
      });
      setMessage(res.message);
      console.log(message);
      if (res.status) {
        setTimeout(() => {
          modal.onclose();
        }, 3000);
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
        title={`${item_act} this ${item_label ? item_label : "item"}`}
      >
        <FaBookOpenReader />
      </Link>

      <Dialog open={modal.onopen}>
        <div className="dialogContent">
          <section>
            <h3 className="mb5 mt0 pt0">Are you sure?</h3>
            <div className="date-span mb10">
              This {item_label} will become{" "}
              <u>{item_act === "publish" ? "available" : "unavailable "}</u> to
              the public on this site
            </div>
            {loaded_status ? (
              <div className="pb20">{message}</div>
            ) : (
              <>
                <button
                  disabled={loading}
                  onClick={do_publish}
                  className="btn btn-medium"
                >
                  Yes, Proceed
                </button>
              </>
            )}
            <button
              onClick={modal.onclose}
              disabled={loading}
              className="btn btn-error"
            >
              Cancel
            </button>
          </section>
        </div>
      </Dialog>
    </>
  );
};

export default React.memo(PublishItem);
