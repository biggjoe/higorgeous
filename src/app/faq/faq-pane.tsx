"use client";
import React from "react";
import { HtmlMarkup } from "@/app/lib/processHtml";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Link from "next/link";

//
export default function FaqPane({ data }: { data: any }) {
  const [faqs, setFaq] = React.useState<any>(data);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  const togView = (index: number, state: any) => {
    const mutd: any[] = [...faqs];
    mutd.forEach((obj) => {
      obj.is_togged = false;
    });
    mutd[index]["is_togged"] = !mutd[index]["is_togged"];
    setFaq(mutd);
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
                <div className="spacer text-left">
                  {item?.question} 
                </div>
                <span className="pl10">
                  {item.is_togged ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>
            </button>
            <div
              className={`answer-pane ${
                item?.is_togged ? "force-show-flex" : "force-hide"
              }`}
            >
              <HtmlMarkup word={item.answer} />
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
