"use client";
import { NextPageContext } from "next";
import NotFound from "./not-found";
import { FaFaceFrown } from "react-icons/fa6";

type Props = {
  statusCode: number;
  message?: string;
};

const ErrorPage = ({ statusCode, message }: Props) => {
  if (statusCode === 404) {
    return <NotFound />;
  }

  return (
    <div
      className="flex flex-col align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="abs-center">
        <h1 className="flex align-items-center">
          <FaFaceFrown
            style={{
              color: "#f56702",
              marginRight: "10px",
              fontSize: "50px",
            }}
          />{" "}
          Error {statusCode}: {message || "Something went wrong"}
        </h1>
      </div>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode || err?.statusCode || 500;
  const message = err?.message || undefined;

  return { statusCode, message };
};

export default ErrorPage;
