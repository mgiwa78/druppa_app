import{a3 as e,a9 as i}from"./index.f8ca9675.js";function r(t){var s,n,o,a;((s=t.response)==null?void 0:s.data.message)==="Unauthenticated."?(e.fire({text:"Unauthenticated",icon:"error",buttonsStyling:!1,confirmButtonText:"Close",heightAuto:!1,customClass:{confirmButton:"btn fw-semobold btn-light-danger"}}),i.push({name:"sign-in"})):((n=t.response)==null?void 0:n.data.message)=="User does not exist"?e.fire({text:"Invalid Email or Password",icon:"error",buttonsStyling:!1,confirmButtonText:"Try again!",heightAuto:!1,customClass:{confirmButton:"btn fw-semobold btn-light-danger"}}):((o=t.response)==null?void 0:o.data.message)==="Invalid login credentials"?e.fire({text:"Invalid Email or Password",icon:"error",buttonsStyling:!1,confirmButtonText:"Try again!",heightAuto:!1,customClass:{confirmButton:"btn fw-semobold btn-light-danger"}}):(a=t.response)!=null&&a.data.message?e.fire({text:t.response.data.message,icon:"error",buttonsStyling:!1,confirmButtonText:"Close",heightAuto:!1,customClass:{confirmButton:"btn fw-semobold btn-light-danger"}}):e.fire({text:t.message,icon:"error",title:"Error Fetching Data!",buttonsStyling:!1,confirmButtonText:"Close",heightAuto:!1,customClass:{confirmButton:"btn fw-semobold btn-light-danger"}})}export{r as E};
