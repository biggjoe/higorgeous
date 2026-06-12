"use client";
import React from "react";
import { post } from "@/app/lib/fetchData";
import CustomModal from "../modals/CustomModal";
import { FaAt, FaPhone, FaUser } from "react-icons/fa";

const LeaveMessage = () => {
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
      <section className="message-area-container">
        <div className="black-area">
          <div className="container">
            <div className="flex flex-row-resp">
              <div className="contact-info-area">
                <h2>Got more questions on HiGorgeous?</h2>

                <p>Leave us a message</p>

                <div className="parp">
                  {/*     <h3>Contact Us</h3>
                  <ul className="cont-list">
                    <li>
                      <a href="https://twitter.com/UrumTown">
                        <i className="fa-brands fa-facebook"></i>
                      </a>
                    </li>
                  </ul> */}
                </div>
              </div>
              {/**contaact-info ends */}
              <div className="contact-area spacer">
                <div className="push-form">
                  <div className="input iconed hma">
                    <input
                      type="text"
                      name="name"
                      className="home-form-control"
                      placeholder="Enter your full name"
                      onChange={handleInput}
                    />
                    <span className="input-icon homs">
                      <FaUser />
                    </span>
                  </div>
                  <div className="input iconed hma">
                    <input
                      type="text"
                      name="phone"
                      className="home-form-control"
                      placeholder="Enter your phone number"
                      onChange={handleInput}
                    />
                    <span className="input-icon homs">
                      <FaPhone />
                    </span>
                  </div>

                  <div className="input iconed hma">
                    <input
                      type="text"
                      name="email"
                      className="home-form-control"
                      placeholder="Enter your email address"
                      onChange={handleInput}
                    />
                    <span className="input-icon homs">
                      <FaAt />
                    </span>
                  </div>

                  <div className="input hma">
                    <textarea
                      name="message"
                      rows={4}
                      className="home-form-control"
                      placeholder="Write message..."
                      onChange={handleInput}
                    ></textarea>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    type="submit"
                    className="hm-contact-btn"
                  >
                    {loading ? "Working..." : "Submit"}
                  </button>
                </div>
              </div>
              {/**contact-area ends */}
            </div>
            {/**container ends */}
          </div>
        </div>
      </section>
      {toast.onopen && <CustomModal data={toast} />}
    </React.Fragment>
  );
};

export default LeaveMessage;
