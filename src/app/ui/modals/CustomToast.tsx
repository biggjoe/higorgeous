import React from "react";
import Snackbar from "../snackbar";

export default function CustomToast(props: { data: any }) {
  const val = props.data;
  const hider = val.hideduration ? val.hideduration : 3000;

  setTimeout(
    () => {
      val.onclose();
    },
    val.hideduration ? val.hideduration : 4000
  );

  return (
    <>
      <Snackbar
        open={val.onopen}
        severity={val.severity}
        autoHideDuration={hider}
        onclose={val.onclose}
      >
        <div className="py50 px10 txt-lg">{val.message}</div>
      </Snackbar>
    </>
  );
}
