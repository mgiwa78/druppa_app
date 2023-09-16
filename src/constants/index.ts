import Swal from "sweetalert2";
import axios from "axios";

const API_URL: any =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api/"
    : "https://druppa-api.vercel.app/api/api/";
const ASSETS_URL: any =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://druppa-api.vercel.app";

const PAYSTACK_PUBLIC_KEY: string =
  "pk_test_04ce7b3f751546859d4307b453c37740a7bf55ac";
const PAYSTACK_SECRETE_KEY: string =
  "sk_test_d766fc5b40a2b70285c9f52048431c24fe009e17";

const successAlert = async (message: string) => {
  await Swal.fire({
    text: message,
    icon: "success",
    buttonsStyling: false,
    confirmButtonText: "Ok, got it!",
    heightAuto: false,
    customClass: {
      confirmButton: "btn fw-semobold btn-light-primary",
    },
  });
};
///
const errorAlert = async (message: string) => {
  await Swal.fire({
    text: message,
    icon: "error",
    buttonsStyling: false,
    confirmButtonText: "Try again!",
    heightAuto: false,
    customClass: {
      confirmButton: "btn fw-semobold btn-light-danger",
    },
  });
};

const confirmationAlert = async (
  message: string,
  confirmButtonText: string
) => {
  let isConfirmed: boolean = false;
  await Swal.fire({
    title: message,
    showCancelButton: true,
    confirmButtonText,
    // confirmButtonColor: '#002979',
  }).then((result) => {
    isConfirmed = result.isConfirmed;
  });
  return isConfirmed;
};

const badInternetAlert = () =>
  errorAlert("Please check your internet connection and try again.");

const getDayFromDate = (date: string) => new Date(date).toDateString();

const paginateRanges = (arr: unknown[]): string[] => {
  const numberPerPagination: number = 10;
  const numChunks = Math.ceil(arr.length / numberPerPagination);
  const chunks: string[] = ["All"];
  for (let i = 0; i < numChunks; i++) {
    const start = i * numberPerPagination + 1;
    const end = Math.min((i + 1) * numberPerPagination, arr.length);
    chunks.push(`${start}-${end}`);
  }
  return chunks;
};

const rangeStart = (paginateValue: string): number => {
  return paginateValue === "All"
    ? 0
    : parseInt(paginateValue.split("-")[0]) - 1;
};

const rangeEnd = (paginateValue: string, arr: unknown[]): number => {
  return paginateValue === "All"
    ? arr.length - 1
    : parseInt(paginateValue.split("-")[1]) - 1;
};

const getDatesBetweenDates = (start: any, end: any) => {
  let dates: any[] = [];
  const endDateInMilli = new Date(end).getTime() + 8.64e7;
  const startDate = new Date(start);
  const endDate = new Date(endDateInMilli);
  // const endDate = new Date(end).setDate(new Date(end).getDate() + 1);
  //to avoid modifying the original date
  const theDate = new Date(startDate);
  while (theDate < endDate) {
    dates = [...dates, new Date(theDate)];
    theDate.setDate(theDate.getDate() + 1);
  }
  return dates;
};

const isToday = (dateString: any) => {
  const todayString = new Date().toString().substring(0, 15);
  return todayString === dateString;
};

const isYesterday = (dateString: any) => {
  const yesterdayString = new Date(new Date().getTime() - 8.64e7)
    .toString()
    .substring(0, 15);
  return yesterdayString === dateString;
};

const confirmDate = (dateString: any) => {
  if (isToday(dateString)) {
    return "Today";
  } else if (isYesterday(dateString)) {
    return "Yesterday";
  } else {
    return dateString;
  }
};

const __CONSTANTS__ = {
  API_URL,

  ASSETS_URL,
  successAlert,
  errorAlert,
  badInternetAlert,
  confirmationAlert,
  getDayFromDate,
  paginateRanges,
  rangeStart,
  rangeEnd,
  getDatesBetweenDates,
  confirmDate,
  PAYSTACK_PUBLIC_KEY,
  PAYSTACK_SECRETE_KEY,
};

export default __CONSTANTS__;
