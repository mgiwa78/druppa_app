import{g as M}from"./assets.6f11792f.js";import{d as A,a5 as P,a6 as R,a7 as I,u as O,G as u,l as x,a4 as w,m as z,_ as S,b as m,j as n,w as D,i as e,k as f,o as p,F as G,e as L,t as j,x as k,p as H}from"./index.f8ca9675.js";import{S as V}from"./sweetalert2.d8000a3b.js";import{c as J,a as g}from"./object.a52185a5.js";import{s as K,c as Q}from"./citiesInNigeria.a5c184d7.js";import{d as U}from"./defaultData.9a1fdc93.js";import{E as W}from"./errorHandler.ce533688.js";const X=A({name:"add-inventory-modal",components:{ErrorMessage:P,Field:R,VForm:I},setup(){const o=O(),{user:a,token:_,refreshProfile:y}=o,r=u(null),C=u(["",""]),i=u(null),c=u(null),v=u(null),{API_URL:h,badInternetAlert:t,errorAlert:to,successAlert:so}=z,l=u(U.CouponEmpty),T=J().shape({couponCode:g().required().label("Coupon Code"),forUseBy:g().required().label("For Use By"),maxUse:g().required().label("MaxUse")}),F=async()=>{const s=await w.get(h+"customers",{headers:{Authorization:`Bearer ${_}`}}).then(d=>d.data).catch(d=>{V.fire({text:d.message,icon:"error",buttonsStyling:!1,confirmButtonText:"Error Fetching Data!",heightAuto:!1,customClass:{confirmButton:"btn fw-semobold btn-light-danger"}})});console.log(s),v.value=s.data};x(()=>{F()});const B=async()=>{r.value&&(r.value.disabled=!0,r.value.setAttribute("data-kt-indicator","on"));const s=new FormData;console.log(l.value),s.append("code",l.value.code),s.append("validFrom",l.value.validFrom),s.append("validUntil",l.value.validUntill),s.append("maxUses",l.value.maxUses),s.append("couponType",l.value.couponType),l.value.couponType==="percentageDiscount"&&s.append("percentageDiscount",l.value.percentageDiscount),l.value.couponType==="reductionDiscount"&&s.append("reductionAmount",l.value.reductionAmount),s.append("forUser",JSON.stringify([l.value.forUseBy])),await w.post(h+"coupon/create/new",s,{headers:{Authorization:`Bearer ${_}`}}).then(()=>{V.fire({text:"Coupon has been created!",icon:"success",buttonsStyling:!1,confirmButtonText:"Ok!",heightAuto:!1,customClass:{confirmButton:"btn btn-primary"}}),l.value=U.CouponEmpty}).catch(d=>{W(d)}).then(()=>{var d;(d=r.value)==null||d.removeAttribute("data-kt-indicator"),r.value.disabled=!1})};return{newCouponData:l,validationSchema:T,submit:async()=>{var s;!r.value||(r.value.disabled=!0,r.value.setAttribute("data-kt-indicator","on"),await B(),(s=r.value)==null||s.removeAttribute("data-kt-indicator"),r.value.disabled=!1)},submitButtonRef:r,modalRef:i,createAPIKeyModalRef:c,getAssetPath:M,statesInNigeria:K,citiesInNigeria:Q,AllCustomers:v,generateCouponCode:()=>{const s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let d="";for(let b=0;b<8;b++)d+=s.charAt(Math.floor(Math.random()*s.length));l.value.code=d},handleCouponValidity:s=>{const[d,b]=s;console.log(s);const E=new Date(d),N=new Date(b),$=E.toISOString().replace("T"," ").slice(0,-5),q=N.toISOString().replace("T"," ").slice(0,-5);l.value.validFrom=$,l.value.validUntill=q},validity:C}}}),Y={class:"card"},Z=e("div",{class:"card-header"},[e("h2",{class:"fw-bold my-10"},"Create new coupon code")],-1),ee={class:"card-body"},oe={class:"mb-5 row"},te={class:"col-6"},se=e("label",{class:"fw-bold required fs-5 fw-semobold mb-2"},"Coupon Code",-1),ae={class:"fv-plugins-message-container"},ne={class:"fv-help-block"},le={class:"col-6 py-9"},re=e("span",{class:"indicator-label"}," Generate Coupon Code ",-1),de=[re],ie={class:"mb-5 row"},ce={class:"col-6"},ue=e("label",{class:"fw-bold required fs-5 fw-semobold mb-2"},"Form use by",-1),me=e("option",{value:""},"Select a Coupon Customer",-1),pe=e("option",{value:"*"},"Allow Use By All Customers",-1),fe=["value"],_e={class:"fv-plugins-message-container"},ve={class:"fv-help-block"},he={class:"col-6"},be=e("label",{class:"fw-bold required fs-5 fw-semobold mb-2"},"Maximum usage",-1),Ce={class:"fv-plugins-message-container"},ge={class:"fv-help-block"},ye={class:"mb-5 row"},we={class:"col-6"},De=e("label",{class:"fw-bold required fs-5 fw-semobold mb-2"},"Valid From",-1),ke={class:"position-relative align-items-center"},Ve={class:"demo-datetime-pickeqr"},Ue={class:"fv-plugins-message-container"},Ae={class:"fv-help-block"},Se={class:"fv-plugins-message-container"},Te={class:"fv-help-block"},Fe={class:"col-6"},Be=e("label",{class:"fw-bold required fs-5 fw-semobold mb-2"},"Coupon Type",-1),Ee={class:"fv row mb-10"},Ne={class:"col-6 form-check form-check-custom form-check-solid"},$e=e("label",{class:"form-check-label",for:"flexCheckDefault"},"Percentage Discount",-1),qe={class:"col-6 form-check form-check-custom form-check-solid"},Me=e("label",{class:"form-check-label",for:"flexCheckDefault"},"Reduction Discount",-1),Pe={class:"mb-5 row"},Re={key:0,class:"col-6"},Ie=e("label",{class:"fw-bold required fs-5 fw-semobold mb-2"},"Percentage of decrease",-1),Oe={class:"fv-plugins-message-container"},xe={class:"fv-help-block"},ze={key:1,class:"col-6"},Ge=e("label",{class:"fw-bold required fs-5 fw-semobold mb-2"},"Reduction amount",-1),Le={class:"fv-plugins-message-container"},je={class:"fv-help-block"},He={class:"card-footer flex-center"},Je=e("button",{type:"reset",class:"btn btn-light me-3"},"Discard",-1),Ke={ref:"submitButtonRef",type:"submit",id:"kt_add_customer_submit",class:"btn btn-primary"},Qe=e("span",{class:"indicator-label"}," Submit ",-1),We=e("span",{class:"indicator-progress"},[H(" Please wait... "),e("span",{class:"spinner-border spinner-border-sm align-middle ms-2"})],-1),Xe=[Qe,We];function Ye(o,a,_,y,r,C){const i=f("Field"),c=f("ErrorMessage"),v=f("el-date-picker"),h=f("VForm");return p(),m("div",Y,[Z,n(h,{id:"kt_modal_add_customer_form",class:"form",onSubmit:o.submit,"validation-schema":o.validationSchema},{default:D(({})=>[e("div",ee,[e("div",oe,[e("div",te,[se,n(i,{type:"text",disabled:!0,class:"form-control form-control-solid",placeholder:"Generated Coupon Code",name:"couponCode","aria-disabled":"true",modelValue:o.newCouponData.code,"onUpdate:modelValue":a[0]||(a[0]=t=>o.newCouponData.code=t)},null,8,["modelValue"]),e("div",ae,[e("div",ne,[n(c,{name:"couponCode"})])])]),e("div",le,[e("button",{onClick:a[1]||(a[1]=(...t)=>o.generateCouponCode&&o.generateCouponCode(...t)),type:"button",id:"kt_add_customer_submit",class:"btn btn-primary"},de)])]),e("div",ie,[e("div",ce,[ue,n(i,{name:"forUseBy",class:"form-select",as:"select",modelValue:o.newCouponData.forUseBy,"onUpdate:modelValue":a[2]||(a[2]=t=>o.newCouponData.forUseBy=t)},{default:D(()=>[me,pe,(p(!0),m(G,null,L(o.AllCustomers,t=>(p(),m("option",{key:t.id||t.lastName,value:t.id},j(t.lastName+" "+t.firstName),9,fe))),128))]),_:1},8,["modelValue"]),e("div",_e,[e("div",ve,[n(c,{name:"forUseBy"})])])]),e("div",he,[be,n(i,{type:"number",class:"form-control form-control-solid",placeholder:"Enter Coupon Max use",name:"maxUse","aria-disabled":"true",modelValue:o.newCouponData.maxUses,"onUpdate:modelValue":a[3]||(a[3]=t=>o.newCouponData.maxUses=t)},null,8,["modelValue"]),e("div",Ce,[e("div",ge,[n(c,{name:"maxUse"})])])])]),e("div",ye,[e("div",we,[De,e("div",ke,[e("div",Ve,[n(v,{modelValue:o.validity,"onUpdate:modelValue":a[4]||(a[4]=t=>o.validity=t),name:["validFrom","validUntil"],onChange:o.handleCouponValidity,placeholder:"Select date and time",type:"daterange","range-separator":"To","start-placeholder":"valid from","end-placeholder":"valid until",size:"large"},null,8,["modelValue","onChange"])])]),e("div",Ue,[e("div",Ae,[n(c,{name:"Start"})])]),e("div",Se,[e("div",Te,[n(c,{name:"Stop"})])])]),e("div",Fe,[Be,e("div",Ee,[e("div",Ne,[n(i,{class:"form-check-input",name:"couponType",modelValue:o.newCouponData.couponType,"onUpdate:modelValue":a[5]||(a[5]=t=>o.newCouponData.couponType=t),type:"radio",value:"percentageDiscount"},null,8,["modelValue"]),$e]),e("div",qe,[n(i,{modelValue:o.newCouponData.couponType,"onUpdate:modelValue":a[6]||(a[6]=t=>o.newCouponData.couponType=t),class:"form-check-input",name:"couponType",type:"radio",value:"reductionDiscount"},null,8,["modelValue"]),Me])])])]),e("div",Pe,[o.newCouponData.couponType==="percentageDiscount"?(p(),m("div",Re,[Ie,n(i,{type:"number",class:"form-control form-control-solid",placeholder:"Enter decrease percentage",name:"percentageDiscount","aria-disabled":"true",max:"100",modelValue:o.newCouponData.percentageDiscount,"onUpdate:modelValue":a[7]||(a[7]=t=>o.newCouponData.percentageDiscount=t)},null,8,["modelValue"]),e("div",Oe,[e("div",xe,[n(c,{name:"percentageDiscount"})])])])):k("",!0),o.newCouponData.couponType==="reductionDiscount"?(p(),m("div",ze,[Ge,n(i,{type:"number",class:"form-control form-control-solid",placeholder:"Enter Reduction amount",name:"reductionDiscount","aria-disabled":"true",modelValue:o.newCouponData.reductionAmount,"onUpdate:modelValue":a[8]||(a[8]=t=>o.newCouponData.reductionAmount=t)},null,8,["modelValue"]),e("div",Le,[e("div",je,[n(c,{name:"reductionDiscount"})])])])):k("",!0)])]),e("div",He,[Je,e("button",Ke,Xe,512)])]),_:1},8,["onSubmit","validation-schema"])])}const Ze=S(X,[["render",Ye]]),eo=A({name:"delivery_records",components:{CreateCouponForm:Ze},props:{},setup(){return{}}});function oo(o,a,_,y,r,C){const i=f("CreateCouponForm");return p(),m("div",null,[n(i,{"widget-classes":"mb-5 mb-xl-8"})])}const _o=S(eo,[["render",oo]]);export{_o as default};
