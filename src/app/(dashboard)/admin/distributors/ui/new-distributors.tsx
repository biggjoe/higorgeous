"use client";
import React from "react";
import { post } from "@/app/lib/fetchData";
import CustomModal from "@/app/ui/modals/CustomModal";
import DefaultEditor from "react-simple-wysiwyg";

export default function NewDistributor() {
  const [faq, setFaq] = React.useState<any>({});
  const [answer, setAnswer] = React.useState<any>("");
  const [loading, setLoading] = React.useState<any>(false);
  const [loaded, setLoaded] = React.useState<any>(false);
  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };
  const [modal, setModal] = React.useState<any>({
    onopen: false,
    onclose: closeModal,
    title: "New Faq",
  });

  React.useEffect(() => {}, []);

  const onHtmlChange = (e: any) => {
    setAnswer(e.target.value);
    console.log(answer);
  };

  const handleSubmit = async () => {
    console.log("SUBMITTING");
    setLoading(true);
    setLoaded(false);
    try {
      const resp = await post(
        {
          question: faq.question,
          answer: answer,
        },
        "create_distributors"
      );

      if (resp.status === 1) {
        setModal({
          ...modal,
          onopen: true,
          severity: resp.status ? "success" : "error",
          message: resp.message,
        });
      }
    } catch (error: any) {
      setModal({
        ...modal,
        onopen: true,
        severity: "error",
        message: error.message,
      });
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  };
  const handleInputChange = (e: any) => {
    console.log(e.target);
    const name = e.target.name;
    setFaq({ ...faq, [name]: e.target.value });
  };

  return (
    <React.Fragment>
      <div className="py30 px20">
        <div className={loading ? " input iconed " : " input "}>
          <label>Question</label>
          <input
            type="text"
            className="input-form-control"
            name="question"
            onChange={handleInputChange}
            placeholder={"FAQ Question "}
          />
        </div>

        <div className="mb10">
          <DefaultEditor
            className="form-control"
            placeholder="FAQ Answer"
            value={answer}
            onChange={onHtmlChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-medium"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Working..." : " Add FAQ "}
        </button>
      </div>

      {modal.onopen && <CustomModal data={modal} />}
    </React.Fragment>
  );
}
