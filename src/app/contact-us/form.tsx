"use client";
import React from "react";
import { post } from "../lib/fetchData";
import CustomModal from "../ui/modals/CustomModal";

export default function Form() {
  //

  const [form, setForm] = React.useState<any>(null);
  const handleInput = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm({ ...form, [name]: value });
  };
  const [user, setUser] = React.useState<any>(null);
  const [input_togged, setInputTog] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const closeToast: any = () => {
    setToast({ onopen: false });
  };
  const [toast, setToast] = React.useState<any>({
    onopen: false,
    onclose: closeToast,
  });

  const handleSubmit = async () => {
    console.log(form);
    if (!form.name || !form.phone || !form.email || !form.message) {
      setToast({
        message: "Please supply all fields",
        onclose: closeToast,
        onopen: true,
        severity: "error",
      });
      return;
    }
    setLoading(true);
    setLoaded(false);
    setToast({
      onopen: true,
      onclose: closeToast,
      message: "<h3>Sending message...</h3>",
    });
    try {
      const resp = await post(form, "contact_message");

      setToast({
        onopen: true,
        onclose: closeToast,
        message: resp.message,
        severity: resp.status === 1 ? "success" : "error",
      });
      if (resp.status == "1") {
        setForm(null);
        setTimeout(() => {
          setToast({
            onopen: false,
            onclose: closeToast,
          });
        }, 5000);
      }
    } catch (error: any) {
      setToast({
        onopen: true,
        onclose: closeToast,
        severity: "error",
        message: error.message,
      });
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  };
  return (
    <React.Fragment>
      <div className="form">
        <div className="input">
          <input
            type="text"
            name="name"
            onChange={handleInput}
            placeholder="Your Name"
          />
        </div>
        <div className="input">
          <input
            type="text"
            name="phone"
            onChange={handleInput}
            placeholder="Your Phone"
          />
        </div>
        <div className="input">
          <input
            type="email"
            name="email"
            onChange={handleInput}
            placeholder="Your Email"
          />
        </div>
        <div className="input">
          <textarea
            name="message"
            placeholder="Write message..."
            onChange={handleInput}
            rows={3}
          ></textarea>
        </div>
        <div>
          <button
            className="btn btn-medium"
            onClick={handleSubmit}
            disabled={loading}
            type="submit"
          >
            {loading ? "Working..." : "Send Message"}
          </button>
        </div>
      </div>
      {toast.onopen && <CustomModal data={toast} />}
    </React.Fragment>
  );
}
