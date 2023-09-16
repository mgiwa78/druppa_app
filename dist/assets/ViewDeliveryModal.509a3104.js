import{_ as r}from"./ViewDeliveryModal.vue_vue_type_script_lang.2cdbd440.js";import{_,b as n,i as s,j as c,t,p as v,o as m,k as h}from"./index.f8ca9675.js";const f={class:"modal fade",id:"kt_modal_view_delivery",ref:"viewDeliveryModalRef",tabindex:"-1","aria-hidden":"true"},y={class:"modal-dialog modal-dialog-centered mw-650px"},p={class:"modal-content"},w={class:"modal-header",id:"kt_modal_add_delivery_header"},D=s("h2",{class:"fw-bold"},"View Delivery Profile",-1),b={id:"kt_modal_add_delivery_close","data-bs-dismiss":"modal",class:"btn btn-icon btn-sm btn-active-icon-primary"},g={class:"card-body p-10"},u={class:"d-flex flex-center flex-column mb-5"},k={class:"symbol symbol-100px mb-7"},x=["src"],N={href:"#",class:"fs-3 text-gray-800 text-hover-primary fw-bold mb-1"},V={class:"d-flex flex-stack fs-4 py-3"},$={class:"fw-bold rotate collapsible","data-bs-toggle":"collapse",href:"#kt_customer_view_details",role:"button","aria-expanded":"false","aria-controls":"kt_customer_view_details"},S={class:"ms-2 rotate-180"},T=s("div",{class:"separator separator-dashed my-3"},null,-1),B={id:"kt_customer_view_details",class:"collapse show"},P={class:"py-5 fs-6"},A={class:"row"},C={class:"col-6"},E=s("div",{class:"fw-bold mt-5"},"Driver Name",-1),I={class:"text-gray-600"},K={class:"col-6"},M=s("div",{class:"fw-bold mt-5"},"Customer Name",-1),R={class:"text-gray-600"},j=s("div",{class:"col-6"},[s("div",{class:"fw-bold mt-5"},"Origin"),s("div",{class:"text-gray-600"},[s("a",{href:"#",class:"text-gray-600 text-hover-primary"}," viewDeliveryData.customer_order.pickup_address ")])],-1),L={class:"row"},O=s("div",{class:"col-6"},[s("div",{class:"fw-bold mt-5"},"Destination"),s("div",{class:"text-gray-600"})],-1),U={class:"col-3"},q=s("div",{class:"fw-bold mt-5"},"Pickup date",-1),z={class:"text-gray-600"},F={class:"col-3"},G=s("div",{class:"fw-bold mt-5"},"Delivery date",-1),H={class:"text-gray-600"},J={class:"row"},Q={class:"col-6"},W=s("div",{class:"fw-bold mt-5"},"status",-1),X={class:"text-gray-600"};function Y(e,Z,ss,es,ts,as){var o,i,d,l;const a=h("KTIcon");return m(),n("div",f,[s("div",y,[s("div",p,[s("div",w,[D,s("div",b,[c(a,{"icon-name":"cross","icon-class":"fs-1"})])]),s("div",g,[s("div",u,[s("div",k,[s("img",{src:e.viewDeliveryData.image?`${e.ASSETS_URL+e.viewDeliveryData.image}`:e.getAssetPath("media/avatars/blank.png"),alt:"image"},null,8,x)]),s("a",N,t(e.viewDeliveryData.tracking_number),1)]),s("div",V,[s("div",$,[v(" Details "),s("span",S,[c(a,{"icon-name":"down","icon-class":"fs-3"})])])]),T,s("div",B,[s("div",P,[s("div",A,[s("div",C,[E,s("div",I,t(((o=e.viewDeliveryData.driver)==null?void 0:o.firstName)+" "+((i=e.viewDeliveryData.driver)==null?void 0:i.lastName)),1)]),s("div",K,[M,s("div",R,t(((d=e.viewDeliveryData.customer)==null?void 0:d.firstName)+" "+((l=e.viewDeliveryData.customer)==null?void 0:l.lastName)),1)]),j]),s("div",L,[O,s("div",U,[q,s("div",z,t(e.formatDate(e.viewDeliveryData.pickup_date)),1)]),s("div",F,[G,s("div",H,t(e.formatDate(e.viewDeliveryData.delivery_date)),1)])]),s("div",J,[s("div",Q,[W,s("div",X,t(e.viewDeliveryData.status),1)])])])])])])])],512)}const ds=_(r,[["render",Y]]);export{ds as V};