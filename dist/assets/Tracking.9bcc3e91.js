import{g as b}from"./assets.6f11792f.js";import{D as k}from"./Dropdown1.3a9803ef.js";import{d as f,_ as v,b as _,i as e,j as a,v as y,a8 as x,o as u,k as i,a5 as w,a6 as $,a7 as S,G as c,w as F,p as D}from"./index.f8ca9675.js";import{h as N}from"./dom.fc49162f.js";import{c as T,a as m}from"./object.a52185a5.js";import{S as A}from"./sweetalert2.d8000a3b.js";const I=f({name:"kt-widget-5",props:{widgetClasses:String},components:{Dropdown1:k},setup(){return{getAssetPath:b}}}),V={class:"card-header align-items-center border-0 mt-4"},M=e("h3",{class:"card-title align-items-start flex-column"},[e("span",{class:"fw-bold mb-2 text-dark"},"Activities"),e("span",{class:"text-muted fw-semobold fs-7"},"890,344 Sales")],-1),C={class:"card-toolbar"},B={type:"button",class:"btn btn-sm btn-icon btn-color-primary btn-active-light-primary","data-kt-menu-trigger":"click","data-kt-menu-placement":"bottom-end","data-kt-menu-flip":"top-end"},P=x('<div class="card-body pt-5"><div class="timeline-label"><div class="timeline-item"><div class="timeline-label fw-bold text-gray-800 fs-6">08:42</div><div class="timeline-badge"><i class="fa fa-genderless text-warning fs-1"></i></div><div class="fw-mormal timeline-content text-muted ps-3"> Outlines keep you honest. And keep structure </div></div><div class="timeline-item"><div class="timeline-label fw-bold text-gray-800 fs-6">10:00</div><div class="timeline-badge"><i class="fa fa-genderless text-success fs-1"></i></div><div class="timeline-content d-flex"><span class="fw-bold text-gray-800 ps-3">AEOL meeting</span></div></div><div class="timeline-item"><div class="timeline-label fw-bold text-gray-800 fs-6">14:37</div><div class="timeline-badge"><i class="fa fa-genderless text-danger fs-1"></i></div><div class="timeline-content fw-bold text-gray-800 ps-3"> Make deposit <a href="#" class="text-primary">USD 700</a>. to ESL </div></div><div class="timeline-item"><div class="timeline-label fw-bold text-gray-800 fs-6">16:50</div><div class="timeline-badge"><i class="fa fa-genderless text-primary fs-1"></i></div><div class="timeline-content fw-mormal text-muted ps-3"> Indulging in poorly driving and keep structure keep great </div></div><div class="timeline-item"><div class="timeline-label fw-bold text-gray-800 fs-6">21:03</div><div class="timeline-badge"><i class="fa fa-genderless text-danger fs-1"></i></div><div class="timeline-content fw-semobold text-gray-800 ps-3"> New order placed <a href="#" class="text-primary">#XF-2356</a>. </div></div><div class="timeline-item"><div class="timeline-label fw-bold text-gray-800 fs-6">16:50</div><div class="timeline-badge"><i class="fa fa-genderless text-primary fs-1"></i></div><div class="timeline-content fw-mormal text-muted ps-3"> Indulging in poorly driving and keep structure keep great </div></div><div class="timeline-item"><div class="timeline-label fw-bold text-gray-800 fs-6">21:03</div><div class="timeline-badge"><i class="fa fa-genderless text-danger fs-1"></i></div><div class="timeline-content fw-semobold text-gray-800 ps-3"> New order placed <a href="#" class="text-primary">#XF-2356</a>. </div></div><div class="timeline-item"><div class="timeline-label fw-bold text-gray-800 fs-6">10:30</div><div class="timeline-badge"><i class="fa fa-genderless text-success fs-1"></i></div><div class="timeline-content fw-mormal text-muted ps-3"> Finance KPI Mobile app launch preparion meeting </div></div></div></div>',1);function E(t,l,o,d,r,p){const s=i("KTIcon"),n=i("Dropdown1");return u(),_("div",{class:y(["card",t.widgetClasses])},[e("div",V,[M,e("div",C,[e("button",B,[a(s,{"icon-name":"category","icon-class":"fs-2"})]),a(n)])]),P],2)}const q=v(I,[["render",E]]),K=f({name:"create-api-key-modal",components:{ErrorMessage:w,Field:$,VForm:S},setup(){const t=c(null),l=c(null),o=c(null),d=c({apiName:"",shortDescription:"",category:"",apiMethod:""}),r=T().shape({apiName:m().required().label("API name"),shortDescription:m().required().label("Description"),category:m().required().label("Category"),apiMethod:m().required().label("API method")});return{apiData:d,validationSchema:r,submit:()=>{!t.value||(t.value.disabled=!0,t.value.setAttribute("data-kt-indicator","on"),setTimeout(()=>{var s;t.value&&(t.value.disabled=!1,(s=t.value)==null||s.removeAttribute("data-kt-indicator")),A.fire({text:"Form has been successfully submitted!",icon:"success",buttonsStyling:!1,confirmButtonText:"Ok, got it!",heightAuto:!1,customClass:{confirmButton:"btn btn-primary"}}).then(()=>{N(o.value)})},2e3))},submitButtonRef:t,modalRef:l,createAPIKeyModalRef:o,getAssetPath:b}}}),O={class:"card pt-7"},R=e("div",{style:{height:"30px !important"},class:"card-header"},[e("h2",null,"Track Your Shipment")],-1),L={class:"modal-body py-10 px-lg-17"},U={class:"scroll-y me-n7 pe-7",id:"kt_modal_create_api_key_scroll","data-kt-scroll":"true","data-kt-scroll-activate":"{default: false, lg: true}","data-kt-scroll-max-height":"auto","data-kt-scroll-dependencies":"#kt_modal_create_api_key_header","data-kt-scroll-wrappers":"#kt_modal_create_api_key_scroll","data-kt-scroll-offset":"300px"},X={class:"mb-5 fv-row"},j=e("label",{class:"required fs-5 fw-semobold mb-2"},"API Name",-1),z={class:"fv-plugins-message-container"},G={class:"fv-help-block"},Y={class:"modal-footer flex-center pb-10"},H=e("button",{type:"reset",id:"kt_modal_create_api_key_cancel",class:"btn btn-light me-3"}," Discard ",-1),J={ref:"submitButtonRef",type:"submit",id:"kt_modal_create_api_key_submit",class:"btn btn-primary"},Q=e("span",{class:"indicator-label"}," Submit ",-1),W=e("span",{class:"indicator-progress"},[D(" Please wait... "),e("span",{class:"spinner-border spinner-border-sm align-middle ms-2"})],-1),Z=[Q,W];function ee(t,l,o,d,r,p){const s=i("Field"),n=i("ErrorMessage"),g=i("VForm");return u(),_("div",O,[R,a(g,{id:"kt_modal_create_api_key_form",class:"form",onSubmit:t.submit,"validation-schema":t.validationSchema},{default:F(()=>[e("div",L,[e("div",U,[e("div",X,[j,a(s,{type:"text",class:"form-control form-control-solid",placeholder:"Order ID",name:"apiName",modelValue:t.apiData.apiName,"onUpdate:modelValue":l[0]||(l[0]=h=>t.apiData.apiName=h)},null,8,["modelValue"]),e("div",z,[e("div",G,[a(n,{name:"apiName"})])])])])]),e("div",Y,[H,e("button",J,Z,512)])]),_:1},8,["onSubmit","validation-schema"])])}const te=v(K,[["render",ee]]),se=f({name:"shipment_records",components:{TrackingStats:q,TrackingForm:te},props:{},setup(){return{}}}),ae={class:"row"},ie={class:"col-6"},le={class:"col-6"};function oe(t,l,o,d,r,p){const s=i("TrackingForm"),n=i("TrackingStats");return u(),_("div",null,[e("div",ae,[e("div",ie,[a(s,{"widget-classes":"mb-5 mb-xl-8"})]),e("div",le,[a(n,{"widget-classes":"mb-5 mb-xl-8"})])])])}const fe=v(se,[["render",oe]]);export{fe as default};