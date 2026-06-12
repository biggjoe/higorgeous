"use client";
import React from "react";
import { post } from "@/app/lib/fetchData";
import CustomModal from "@/app/ui/modals/CustomModal";
import { FaPen } from "react-icons/fa";
import Link from "next/link";

export default function AllDistributors({ data }: { data: any }) {
  const [faq, setFaq] = React.useState<any>({});
  const  [answer, setAnswer] = React.useState<any>("");
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
          mode: "add-faq",
        },
        "create_faq"
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
        {data.map((item: any, index:number) => (
            <Link
              href={`/admin/distributors/edit/${item.id}`}
              className="list-item br-5 flex flex-row align-items-center"
              key={item.path}
            >
              <span className="spacer ml10">{item.title}</span>
              <span className="p0">
                <FaPen />
              </span>
            </Link>
          ))}
</div>
      {modal.onopen && <CustomModal data={modal} />}
    </React.Fragment>
  );
}
