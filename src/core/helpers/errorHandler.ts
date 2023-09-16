import router from "@/router";
import Swal from "sweetalert2";

import { useAuthStore } from "@/stores/auth";

// const AuthStore = useAuthStore();

// const { logout } = AuthStore;

export default function ErrorHandler(error: any) {
  if (error.response?.data.message === "Unauthenticated.") {
    Swal.fire({
      text: "Unauthenticated",
      icon: "error",
      buttonsStyling: false,
      confirmButtonText: "Close",
      heightAuto: false,
      customClass: {
        confirmButton: "btn fw-semobold btn-light-danger",
      },
    });
    // logout();
    router.push({ name: "sign-in" });
  } else if (error.response?.data.message == "User does not exist") {
    Swal.fire({
      text: "Invalid Email or Password",
      icon: "error",
      buttonsStyling: false,
      confirmButtonText: "Try again!",
      heightAuto: false,
      customClass: {
        confirmButton: "btn fw-semobold btn-light-danger",
      },
    });
  } else if (error.response?.data.message === "Invalid login credentials") {
    Swal.fire({
      text: "Invalid Email or Password",
      icon: "error",
      buttonsStyling: false,
      confirmButtonText: "Try again!",
      heightAuto: false,
      customClass: {
        confirmButton: "btn fw-semobold btn-light-danger",
      },
    });
  } else if (error.response?.data.message) {
    Swal.fire({
      text: error.response.data.message,
      icon: "error",
      buttonsStyling: false,
      confirmButtonText: "Close",
      heightAuto: false,
      customClass: {
        confirmButton: "btn fw-semobold btn-light-danger",
      },
    });
  } else {
    Swal.fire({
      text: error.message,
      icon: "error",
      title: "Error Fetching Data!",
      buttonsStyling: false,
      confirmButtonText: "Close",
      heightAuto: false,
      customClass: {
        confirmButton: "btn fw-semobold btn-light-danger",
      },
    });
  }
}
