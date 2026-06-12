"use client";
import React from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { postLike } from "@/app/lib/postData";
import CustomToast from "@/app/ui/modals/CustomToast";
const LikeTemplate = (props: any) => {
  const { item, item_label, is_white, show_dislike } = props;

  const [loading, setLoading] = React.useState(false);
  const [likes, setLikes] = React.useState(item.like_num);
  const [like_state, setLikeState] = React.useState(item.is_liked);
  const [dislikes, setDislikes] = React.useState(item.dislike_num);

  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };

  const [modal, setModal] = React.useState<any>({
    onopen: false,
    onclose: closeModal,
    title: "Like Item",
  });

  const setLike = (data: any) => {
    console.log(data);
    if (data?.status === 0) {
      setModal({
        ...modal,
        onopen: true,
        message: data.message ? data.message : "Error Sending ",
        onclose: closeModal,
        severity: "error",
      });
      return;
    }
    if (data["act"] === "like") {
      setLikes(data.likes);
      if (data.did === "liked") {
        setLikeState({ ...like_state, is_liked: true });
      } else if (data.did === "unliked") {
        setLikeState({ ...like_state, is_liked: false });
      }
    } else if (data["act"] === "dislike") {
      setDislikes(data.dislikes);
    }
  };

  const do_like = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const like_res = await postLike({
        act: "like",
        label: item_label,
        item_id: item.id,
      });
      setLike(like_res);
    } catch (error: any) {
      setModal({
        ...modal,
        onopen: true,
        message: error.message,
        onclose: closeModal,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <React.Fragment>
      <div
        className="react-span pl10"
        style={{ backgroundColor: "transparent" }}
      >
        <span className=" inline-flex align-items-center">
          <button
            className="btn btn-icon"
            title={
              like_state?.is_liked
                ? `Remove This  ${item_label} Like `
                : `Like this ${item_label}`
            }
            disabled={loading}
            onClick={do_like}
          >
            {like_state?.is_liked ? (
              <FaThumbsDown style={{ color: is_white ? "#fff" : "#444" }} />
            ) : (
              <FaThumbsUp style={{ color: "rgb(34, 160, 105)" }} />
            )}
          </button>

          <span
            className="count-span"
            style={{ color: is_white ? "#fff" : "#444" }}
          >
            {likes}
          </span>
        </span>
        {show_dislike && (
          <span className="px5">
            <button
              className="btn btn-icon"
              title={
                like_state?.is_liked
                  ? `Remove This  ${item_label} DisLike `
                  : `DisLike this ${item_label}`
              }
              disabled={loading}
              onClick={async () => {
                const like_res = await postLike({
                  act: "dislike",
                  label: item_label,
                  item_id: item.id,
                });
                setLike(like_res);
              }}
            >
              {like_state?.is_liked ? (
                <FaThumbsDown
                  className={loading ? "spin" : ""}
                  style={{ color: "rgb(239 3 121 / 100%)" }}
                />
              ) : (
                <FaThumbsDown
                  className={loading ? "spin" : ""}
                  style={{ color: is_white ? "#fff" : "#444" }}
                />
              )}
            </button>

            <span
              className="count-span"
              style={{ color: is_white ? "#fff" : "#444" }}
            >
              {dislikes}
            </span>
          </span>
        )}
        <span className="pr5"></span>
      </div>
      <CustomToast data={modal} />
    </React.Fragment>
  );
};

export default React.memo(LikeTemplate);
