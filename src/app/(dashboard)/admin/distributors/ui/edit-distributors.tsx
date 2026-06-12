"use client";

import { post } from "@/app/lib/fetchData";
import CustomModal from "@/app/ui/modals/CustomModal";
import React from "react";

import { DefaultEditor } from "react-simple-wysiwyg";

export default function EditDistributor({ data }: { data: any }) {
  console.log(data, ">>>");
  const  [faq, setFaq] = React.useState<any>({});
  const [loading, setLoading] = React.useState<any>(false);
  const [loaded, setLoaded] = React.useState<any>(false);
  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };
  const [modal, setModal] = React.useState<any>({
    onopen: false,
    onclose: closeModal,
    title: "Edit Distributor",
  });

  const [question, setQuestion] = React.useState<any>("");
  const [answer, setAnswer] = React.useState<any>("");
  const [id, setId] = React.useState<any>(false);

  React.useEffect(() => {
    setFaq(data);
    setQuestion(data.question);
    setAnswer(data.answer);
    setId(data.id);
    setLoaded(true);
  }, []);

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
          answer: answer,
          question: question,
          id: id,
        },
        "edit_distributors"
      );

      if (resp.status === 1) {
        setModal({
          ...modal,
          onopen: true,
          severity: resp.status ? "success" : "error",
          message: resp.message,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  };
  const handleInputChange = React.useCallback(
    (e: any) => {
      console.log(e.taget);
      setQuestion(e.target.value);
    },
    [question]
  );

  return (
    <React.Fragment>
      <div className="py30 px20">
        <div className={loading ? " input iconed " : " input "}>
          <label>Question</label>
          <input
            type="text"
            className="input-form-control"
            name="question"
            disabled={loading}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={"FAQ Question "}
          />
        </div>

        <div className="mb10">
          <DefaultEditor
            className="form-control"
            value={answer}
            disabled={loading}
            placeholder="FAQ Answer"
            onChange={onHtmlChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-medium"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Working..." : " Edit FAQ "}
        </button>
      </div>

      {modal.onopen && <CustomModal data={modal} />}
    </React.Fragment>
  );
}
