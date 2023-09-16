import{g as F}from"./assets.6f11792f.js";import"./Dropdown2.vue_vue_type_script_lang.c72317c6.js";import{T as U}from"./TableFooter.3f00d523.js";import{d as C,G as o,u as V,Y as I,c as B,l as L,m as j,a4 as O,_ as S,b as l,i as e,t as r,x as b,F as z,e as K,j as w,v as Q,k as P,o as i,ab as G}from"./index.f8ca9675.js";import{f as H}from"./formatDate.672d0471.js";import{S as Y}from"./colourMaps.8403b523.js";import{d as k}from"./defaultData.9a1fdc93.js";import{E as J}from"./errorHandler.ce533688.js";import"./TableFooter.vue_vue_type_script_lang.5421c060.js";const W=C({name:"inventory_requests_table",components:{TableFooter:U},props:{widgetClasses:String},emits:["page-change","on-sort","on-items-select","on-items-per-page-change"],setup(s,{emit:d}){const{API_URL:_,ASSETS_URL:g}=j,y=o({}),h=o(k.DeliveryEmpty),c=o(k.DeliveryEmpty),p=o([]),u=o(10),n=o([0]),a=o(0),D=V(),{user:Te,token:A,refreshProfile:xe}=D,$=o(!0),m=o(1),R=o([]);I(()=>u.value,t=>{m.value=1,d("on-items-per-page-change",t)});const q=B(()=>n.value?n.value.length<=u.value?a.value:n.value.length:0),E=async t=>{h.value=t},M=async t=>{c.value=t};I(()=>m.value,async t=>{const v=await x(t);p.value=v.data,console.log(v.data)});const N=t=>{m.value=t,d("page-change",t)},T=async t=>(await O.get(_+`inventoryDeliveryRequest?page=${t}`,{headers:{Authorization:`Bearer ${A}`}}).then(f=>f.data).catch(f=>{p.value=null,J(f)})).data,x=async t=>typeof t=="number"?await T(t):await T(1);return L(async()=>{const t=await x(1);y.value=t,console.log(t),p.value=t.data,a.value=t.total,m.value=t.current_page}),{checkedRows:R,getAssetPath:F,pageChange:N,currentPage:m,itemsPerPage:u,totalDeliveries:n,totalItems:q,dataToDisplay:p,itemsPerPageDropdownEnabled:$,ASSETS_URL:g,editProfileData:h,updateEditProfile:E,viewDeliveryData:c,updateViewProfile:M,formatDate:H,STATUS_COLOUR_MAP:Y}}}),X={class:"card-header border-0 pt-5"},Z={class:"card-title align-items-start flex-column"},ee=e("span",{class:"card-label fw-bold fs-3 mb-1"},"Inventory Delivery Request",-1),te={class:"text-muted mt-1 fw-semobold fs-7"},se={class:"card-body py-3"},ae={key:0,class:"d-flex align-items-center justify-content-center w-100 py-5"},oe=e("h4",null,"No Records",-1),ne=[oe],re={key:1,class:"d-flex align-items-center justify-content-center w-100 py-5"},le=e("div",{class:"spinner-border spinner-border-sm align-middle ms-2 w-25px h-25px"},null,-1),ie=[le],de={key:2,class:"table-responsive"},ce={class:"table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3"},pe=e("thead",null,[e("tr",{class:"fw-bold text-muted"},[e("th",{class:"min-w-150px"},"Id"),e("th",{class:"min-w-120px"},"Request Description"),e("th",{class:"min-w-120px"},"Delivery Address"),e("th",{class:"min-w-120px"},"Request Quantity"),e("th",{class:"min-w-120px"},"Inventory"),e("th",{class:"min-w-120px"},"Status"),e("th",{class:"min-w-100px text-end"},"Actions")])],-1),ue={class:"text-dark fw-bold text-hover-primary fs-6"},me={class:"text-dark fw-bold text-hover-primary fs-6"},he={class:"text-dark fw-bold text-hover-primary fs-6"},_e={class:"text-dark fw-bold text-hover-primary fs-6"},ge={class:"badge"},ye={class:"text-end"},ve=["onClick"],fe={class:"px-10"};function be(s,d,_,g,y,h){var u,n;const c=P("KTIcon"),p=P("TableFooter");return i(),l("div",{class:Q([s.widgetClasses,"card"])},[e("div",X,[e("h3",Z,[ee,e("span",te,r(s.totalItems)+" Requests",1)])]),e("div",se,[!((u=s.dataToDisplay)!=null&&u.length)&&s.dataToDisplay?(i(),l("div",ae,ne)):b("",!0),s.dataToDisplay===null?(i(),l("div",re,ie)):b("",!0),((n=s.dataToDisplay)==null?void 0:n.length)&&s.dataToDisplay?(i(),l("div",de,[e("table",ce,[pe,e("tbody",null,[(i(!0),l(z,null,K(s.dataToDisplay,a=>(i(),l("tr",{key:a.id},[e("td",null,[e("span",ue,r(a.id),1)]),e("td",null,[e("span",me,r(a.requestDescription),1)]),e("td",null,[e("span",he,r(a.deliveryAddress),1)]),e("td",_e,r(a.requestQuantity),1),e("td",null,r(a.inventory_id),1),e("td",null,[e("span",ge,r(a.status),1)]),e("td",ye,[e("button",{"data-bs-toggle":"modal","data-bs-target":"#kt_modal_view_delivery",class:"btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1",onClick:G(D=>s.updateViewProfile(a),["prevent"])},[w(c,{"icon-name":"switch","icon-class":"fs-3"})],8,ve)])]))),128))])]),e("div",fe,[w(p,{onPageChange:s.pageChange,"current-page":s.currentPage,itemsPerPage:s.itemsPerPage,"onUpdate:itemsPerPage":d[0]||(d[0]=a=>s.itemsPerPage=a),count:s.totalItems,"items-per-page-dropdown-enabled":s.itemsPerPageDropdownEnabled},null,8,["onPageChange","current-page","itemsPerPage","count","items-per-page-dropdown-enabled"])])])):b("",!0)])],2)}const we=S(W,[["render",be]]),Pe=C({name:"delivery_records",components:{MyInventoryDeliveryRequestsTable:we},props:{},setup(){return{}}});function De(s,d,_,g,y,h){const c=P("MyInventoryDeliveryRequestsTable");return i(),l("div",null,[w(c,{"widget-classes":"mb-5 mb-xl-8"})])}const Me=S(Pe,[["render",De]]);export{Me as default};
