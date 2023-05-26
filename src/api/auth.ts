// import __CONSTANTS__ from "../constants";
// import axios from "axios";

// const { API_URL, badInternetAlert, errorAlert, successAlert } = __CONSTANTS__;

// const loginUser = async () => {
//   if (window.navigator.onLine === false) {
//     badInternetAlert();
//     return;
//   }

//   state.value.formData.submitting = true;

//   try {
//     const RESPONSE = await axios.post(`${API_URL}login`, {
//       email: state.value.formData.email,
//       password: state.value.formData.password,
//     });
//     const successMessage = RESPONSE.data.message;
//     (state.value.formData.email = ""), (state.value.formData.password = "");
//     saveLogin(RESPONSE.data.user, RESPONSE.data.token);
//     // successAlert(successMessage);
//   } catch (ERROR: any) {
//     let errorMessage = "";
//     if (ERROR.response) {
//       if (ERROR.response.status === 422) {
//         if (ERROR.response.data) {
//           if (ERROR.response.data.error) {
//             errorMessage =
//               ERROR.response.data.error.email ||
//               ERROR.response.data.error.password ||
//               "Error in request.";
//           } else {
//             errorMessage = "Error in request.";
//           }
//         } else {
//           errorMessage = "Error in request.";
//         }
//       } else if (ERROR.response.status === 404) {
//         errorMessage = "API route not found.";
//       } else if (ERROR.response.status === 401) {
//         errorMessage = ERROR.response.data.message;
//       } else {
//         errorMessage = "Error in request.";
//       }
//     } else {
//       errorMessage = "Error in request.";
//     }
//     errorAlert(errorMessage);
//   }

//   state.value.formData.submitting = false;
// };

// export { loginUser };
