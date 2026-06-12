"use client";
import React from "react";
import { HtmlMarkup } from "@/app/lib/processHtml";
import { FaChevronDown, FaChevronUp, FaPen, FaTrash } from "react-icons/fa";
import Link from "next/link";
import CustomModal from "@/app/ui/modals/CustomModal";
import ConfirmModal from "@/app/ui/modals/ConfirmModal";
import { post } from "@/app/lib/fetchData";

//
export default function FaqPane({ data }: { data: any }) {
  const [faqs, setFaq] = React.useState<any>(data);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  const togView = (index: number, state: any) => {
    const mutd: any[] = [...faqs];
    mutd[index]["is_togged"] = !mutd[index]["is_togged"];
    setFaq(mutd);
  };

  //
  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };
  const [modal, setModal] = React.useState<any>({
    onopen: false,
    onclose: closeModal,
    title: "Edit Faq",
  });

  //

  const delete_faq = async (item: any) => {
    setLoading(true);
    setLoaded(false);
    try {
      const resp = await post({ id: item.id }, "remove_faq");

      if (resp.status === 1) {
        setModal({ ...modal, onopen: true, message: resp.message });
      }
      setTimeout(() => {
        setDelModal({
          ...del_modal,
          onopen: false,
          onclose: closeDelModal,
        });
        setModal({ ...modal, onopen: false, onclose: closeModal });
      }, 3000);
    } catch (error) {
      setModal({ ...modal, onopen: true, message: "Error" });
    } finally {
      setLoading(false);
      setLoaded(true);
    } //fetch
  };

  //

  const closeDelModal = () => {
    setDelModal({ ...del_modal, onopen: false });
  };
  const [del_modal, setDelModal] = React.useState<any>({
    onopen: false,
    onclose: closeDelModal,
    title: "Delete Faq",
  });
  const launchDelete = (item: any) => {
    setDelModal({
      ...del_modal,
      id: item.id,
      message: "Are you sure you want to remove this FAQ?",
      onopen: true,
      onclose: closeDelModal,
      onaccept: delete_faq,
    });
  };
  return (
    <React.Fragment>
      <div className="faq-container">
        {faqs.map((item: any, index: number) => (
          <div className="faq-item" key={index}>
            <button
              className="question-pane"
              onClick={() => togView(index, !item?.is_togged)}
            >
              <div className="question">
                <div className="spacer text-left">{item?.question}</div>

                <span className="pl10">
                  {item.is_togged ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>
            </button>
            <div
              className={`answer-pane ${
                item?.is_togged ? "force-show-flex flex-col" : "force-hide"
              }`}
            >
              <div className="flex flex-row pb10 align-items-center border-bottom">
                <span className="spacer"></span>
                <span className="group-btn">
                  <Link href={`/admin/faq/edit/${item.id}`}>
                    <FaPen className="pr5" /> EDIT
                  </Link>

                  <Link href="#" onClick={() => launchDelete(item)}>
                    <FaTrash className="pr5" />
                    DELETE
                  </Link>
                </span>
              </div>
              <HtmlMarkup word={item.answer} />
            </div>
          </div>
        ))}
      </div>

      {modal.onopen && <CustomModal data={modal} />}
      {del_modal.onopen && <ConfirmModal data={del_modal} />}
    </React.Fragment>
  );
}
