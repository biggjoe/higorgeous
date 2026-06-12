"use client";
export function HtmlMarkup({ word }: { word: string }) {
  const markup = { __html: word };
  return <div dangerouslySetInnerHTML={markup} />;
}

export function padTime(t: number) {
  return t < 10 ? "0" + t : t;
}

export function secondsToTime(_seconds: any) {
  const hours = Math.floor(_seconds / 3600),
    minutes = Math.floor((_seconds % 3600) / 60),
    seconds = Math.floor(_seconds % 60);

  return padTime(hours) + ":" + padTime(minutes) + ":" + padTime(seconds);
}

export function capitalizeWords(str: string) {
   const splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}

export function truncateWord(
  str: string,
  n: number,
  useWordBoundary: boolean = true
) {
  if (str.length <= n) {
    return str;
  }
  const subString = str.slice(0, n - 1); // the original check
  return (
    (useWordBoundary
      ? subString.slice(0, subString.lastIndexOf(" "))
      : subString) + "&hellip;"
  );
}

export function DatePipe({
  value,
  show_time,
}: {
  value: string | number;
  show_time?: boolean;
}) {
  const val_num =
    typeof value === "string"
      ? parseInt(value)
      : typeof value === "number"
      ? value
      : new Date().getTime();
  const theDate = val_num;
  const nowUnix = new Date();
  const refUnix = new Date(theDate);
  ///
  const a = new Date(theDate);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const time_str = a.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  ///
  let tma: string = "";
  if (
    nowUnix.getDate() === refUnix.getDate() &&
    refUnix.getMonth() === nowUnix.getMonth() &&
    refUnix.getFullYear() === nowUnix.getFullYear()
  ) {
    tma = time_str;
  } else if (
    refUnix.getFullYear() === nowUnix.getFullYear() &&
    refUnix.getMonth() !== nowUnix.getMonth()
  ) {
    tma = show_time ? month + " " + date + ", " + time_str : month + " " + date;
  } else if (
    refUnix.getFullYear() === nowUnix.getFullYear() &&
    refUnix.getMonth() === nowUnix.getMonth() &&
    nowUnix.getDate() !== refUnix.getDate()
  ) {
    tma = show_time ? month + " " + date + ", " + time_str : month + " " + date;
  } else if (refUnix.getFullYear() !== nowUnix.getFullYear()) {
    tma = month + " " + date + ", " + year;
  } else {
    tma = "00-00-0000";
  }

  return tma;
}
