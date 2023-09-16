import{g as R}from"./assets.6f11792f.js";import"./Dropdown2.vue_vue_type_script_lang.c72317c6.js";import{T as q}from"./TableFooter.3f00d523.js";import{d as x,c as N,m as V,_ as T,b as c,i as e,j as u,t as o,p as K,o as m,k as b,G as r,u as Q,Y as C,l as z,a4 as G,a3 as E,x as k,F as B,e as O,v as Y,ab as J}from"./index.f8ca9675.js";import{f as Z}from"./formatDate.672d0471.js";import{d as D}from"./defaultData.9a1fdc93.js";import"./TableFooter.vue_vue_type_script_lang.5421c060.js";const ee=x({name:"add-inventory-modal",components:{},props:{InventoryData:{type:Object}},setup(t){const{API_URL:d,ASSETS_URL:p}=V,h=N(()=>(console.log(t.InventoryData),t.InventoryData&&t.InventoryData.id?{customer:t.InventoryData.customer||"",warehouse:D.WarehouseEmpty,id:t.InventoryData.id||"",product_description:t.InventoryData.product_description||"",quantity:t.InventoryData.quantity||"",created_at:t.InventoryData.created_at||"",image:t.InventoryData.image||""}:{...D.InventoryEmpty}));return{getAssetPath:R,viewInventoryData:h,ASSETS_URL:p}}}),te={class:"modal fade",id:"kt_modal_view_inventory",ref:"viewInventoryModalRef",tabindex:"-1","aria-hidden":"true"},se={class:"modal-dialog modal-dialog-centered mw-650px"},ae={class:"modal-content"},oe={class:"modal-header",id:"kt_modal_add_inventory_header"},ne=e("h2",{class:"fw-bold"},"View Inventory Profile",-1),re={id:"kt_modal_add_inventory_close","data-bs-dismiss":"modal",class:"btn btn-icon btn-sm btn-active-icon-primary"},ie={class:"card-body p-10"},de={class:"d-flex flex-center flex-column mb-5"},le={class:"symbol symbol-100px mb-7"},ce=["src"],me=e("div",{class:"fw-bold mt-5"},"Freight ID",-1),_e={href:"#",class:"fs-3 text-gray-800 text-hover-primary fw-bold mb-1"},ue={class:"d-flex flex-stack fs-4 py-3"},pe={class:"fw-bold rotate collapsible","data-bs-toggle":"collapse",href:"#kt_customer_view_details",role:"button","aria-expanded":"false","aria-controls":"kt_customer_view_details"},he={class:"ms-2 rotate-180"},ve=e("div",{class:"separator separator-dashed my-3"},null,-1),fe={id:"kt_customer_view_details",class:"collapse show"},ye={class:"py-5 fs-6"},ge={class:"row"},be={class:"col-6"},we=e("div",{class:"fw-bold mt-5"},"Warehouse Name",-1),Ie={class:"text-gray-600"},De={class:"col-6"},$e=e("div",{class:"fw-bold mt-5"},"Warehouse Name",-1),Pe={class:"text-gray-600"},ke={href:"#",class:"text-gray-600 text-hover-primary"},xe={class:"row"},Te={class:"col-6"},Ae=e("div",{class:"fw-bold mt-5"},"Product description",-1),Se={class:"text-gray-600"},Ce={class:"col-3"},Ee=e("div",{class:"fw-bold mt-5"},"Quantity",-1),Be={class:"text-gray-600"},Re={class:"row"},Ne={class:"col-6"},Ve=e("div",{class:"fw-bold mt-5"},"Date Added",-1),Fe={class:"text-gray-600"};function Ue(t,d,p,h,w,v){var i,l;const n=b("KTIcon");return m(),c("div",te,[e("div",se,[e("div",ae,[e("div",oe,[ne,e("div",re,[u(n,{"icon-name":"cross","icon-class":"fs-1"})])]),e("div",ie,[e("div",de,[e("div",le,[e("img",{src:t.viewInventoryData.image?`${t.ASSETS_URL+t.viewInventoryData.image}`:t.getAssetPath("media/avatars/blank.png"),alt:"image"},null,8,ce)]),me,e("a",_e,o(t.viewInventoryData.id),1)]),e("div",ue,[e("div",pe,[K(" Details "),e("span",he,[u(n,{"icon-name":"down","icon-class":"fs-3"})])])]),ve,e("div",fe,[e("div",ye,[e("div",ge,[e("div",be,[we,e("div",Ie,o((i=t.viewInventoryData.warehouse)==null?void 0:i.name),1)]),e("div",De,[$e,e("div",Pe,[e("a",ke,o((l=t.viewInventoryData.warehouse)==null?void 0:l.location),1)])])]),e("div",xe,[e("div",Te,[Ae,e("div",Se,o(t.viewInventoryData.product_description),1)]),e("div",Ce,[Ee,e("div",Be,o(t.viewInventoryData.quantity),1)])]),e("div",Re,[e("div",Ne,[Ve,e("div",Fe,o(t.viewInventoryData.created_at),1)])])])])])])])],512)}const Le=T(ee,[["render",Ue]]),Me=x({name:"kt-widget-12",components:{TableFooter:q,ViewInventoryModal:Le},props:{widgetClasses:String},emits:["page-change","on-sort","on-items-select","on-items-per-page-change"],setup(t,{emit:d}){const{API_URL:p,ASSETS_URL:h}=V,w=r({}),v=r(D.InventoryEmpty),n=r(D.InventoryEmpty),i=r([]),l=r(10),_=r([0]),f=r(0),a=Q(),{user:$,token:I,refreshProfile:F}=a,U=r(!0),y=r(1),L=r([]),M=[{orderid:"56037-XDER",country:{name:"Brasil",code:"PH"},date:{value:"05/28/2020",remarks:"Paid"},progress:{value:"50",color:"primary"},company:{name:"Intertico",fields:"Web, UI/UX Design"},status:{label:"Approved",color:"success"},total:"$3560"},{orderid:"05822-FXSP",country:{name:"Belarus",code:"BY"},date:{value:"04/18/2021",remarks:"Paid"},progress:{value:"50",color:"primary"},company:{name:"Agoda",fields:"Houses & Hotels"},status:{label:"In Progress",color:"warning"},total:"$4850"},{orderid:"4472-QREX",country:{name:"Phillipines",code:"BH"},date:{value:"07/23/2019",remarks:"Paid"},progress:{value:"50",color:"primary"},company:{name:"RoadGee",fields:"Transportation"},status:{label:"Success",color:"danger"},total:"$8376"},{orderid:"00347-BCLQ",country:{name:"Argentina",code:"BR"},date:{value:"12/21/2021",remarks:"Paid"},progress:{value:"50",color:"primary"},company:{name:"The Hill",fields:"Insurance"},status:{label:"Rejected",color:"info"},total:"$9486"},{orderid:"59486-XDER",country:{name:"Agoda",code:"BT"},date:{value:"05/28/2020",remarks:"Paid"},progress:{value:"50",color:"primary"},company:{name:"Phillipines",fields:"Transportation"},status:{label:"Approved",color:"primary"},total:"$8476"}];C(()=>l.value,s=>{y.value=1,d("on-items-per-page-change",s)});const j=N(()=>_.value?_.value.length<=l.value?f.value:_.value.length:0),H=async s=>{v.value=s},W=async s=>{n.value=s};C(()=>y.value,async s=>{const P=await S(s);i.value=P.data,console.log(P.data)});const X=s=>{y.value=s,d("page-change",s)},A=async s=>(await G.get(p+`inventory?page=${s}`,{headers:{Authorization:`Bearer ${I}`}}).then(g=>g.data).catch(g=>{i.value=null,g.response.data.message?E.fire({text:g.response.data.message,icon:"error",buttonsStyling:!1,confirmButtonText:"Error Fetching Data!",heightAuto:!1,customClass:{confirmButton:"btn fw-semobold btn-light-danger"}}):E.fire({text:g.message,icon:"error",buttonsStyling:!1,confirmButtonText:"Error Fetching Data!",heightAuto:!1,customClass:{confirmButton:"btn fw-semobold btn-light-danger"}})})).data,S=async s=>typeof s=="number"?await A(s):await A(1);return z(async()=>{const s=await S(1);w.value=s,i.value=s.data,f.value=s.total,y.value=s.current_page}),{list:M,checkedRows:L,getAssetPath:R,pageChange:X,currentPage:y,itemsPerPage:l,totalDeliveries:_,totalItems:j,dataToDisplay:i,itemsPerPageDropdownEnabled:U,ASSETS_URL:h,editProfileData:v,updateEditProfile:H,viewInventoryData:n,updateViewProfile:W,formatDate:Z}}}),je={class:"card-header border-0 pt-5"},He={class:"card-title align-items-start flex-column"},We=e("span",{class:"card-label fw-bold fs-3 mb-1"},"Inventries",-1),Xe={class:"text-muted mt-1 fw-semobold fs-7"},qe={class:"card-body py-3"},Ke={key:0,class:"d-flex align-items-center justify-content-center w-100 py-5"},Qe=e("h4",null,"No Records",-1),ze=[Qe],Ge={key:1,class:"d-flex align-items-center justify-content-center w-100 py-5"},Oe=e("div",{class:"spinner-border spinner-border-sm align-middle ms-2 w-25px h-25px"},null,-1),Ye=[Oe],Je={key:2,class:"table-responsive"},Ze={class:"table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3"},et=e("thead",null,[e("tr",{class:"fw-bold text-muted"},[e("th",{class:"min-w-150px"},"Inventory Id"),e("th",{class:"min-w-140px"},"Description"),e("th",{class:"min-w-120px"},"Added"),e("th",{class:"min-w-120px"},"Warehouse"),e("th",{class:"min-w-120px"},"Customer"),e("th",{class:"min-w-100px text-end"},"Actions")])],-1),tt={href:"#",class:"text-dark fw-bold text-hover-primary fs-6"},st={href:"#",class:"text-dark fw-bold text-hover-primary d-block mb-1 fs-6"},at={class:"text-muted fw-semobold text-muted d-block fs-7"},ot={href:"#",class:"text-dark fw-bold text-hover-primary d-block mb-1 fs-6"},nt={href:"#",class:"text-dark fw-bold text-hover-primary d-block mb-1 fs-6"},rt={class:"text-muted fw-semobold text-muted d-block fs-7"},it={class:"text-dark fw-bold text-hover-primary fs-6"},dt={class:"text-end"},lt=["onClick"],ct={class:"btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"},mt={class:"px-10"};function _t(t,d,p,h,w,v){var _,f;const n=b("KTIcon"),i=b("TableFooter"),l=b("ViewInventoryModal");return m(),c(B,null,[e("div",{class:Y([t.widgetClasses,"card"])},[e("div",je,[e("h3",He,[We,e("span",Xe,o(t.totalItems)+" Inventries",1)])]),e("div",qe,[t.dataToDisplay===null?(m(),c("div",Ke,ze)):k("",!0),!((_=t.dataToDisplay)!=null&&_.length)&&t.dataToDisplay?(m(),c("div",Ge,Ye)):k("",!0),((f=t.dataToDisplay)==null?void 0:f.length)&&t.dataToDisplay?(m(),c("div",Je,[e("table",Ze,[et,e("tbody",null,[(m(!0),c(B,null,O(t.dataToDisplay,a=>{var $,I;return m(),c("tr",{key:a.id},[e("td",null,[e("span",tt,o(a.id),1)]),e("td",null,[e("span",st,o(a.product_description),1),e("span",at,o(t.formatDate(a.quantity)),1)]),e("td",null,[e("span",ot,o(t.formatDate(a.created_at)),1)]),e("td",null,[e("span",nt,o(($=a.warehouse)==null?void 0:$.name),1),e("span",rt,o((I=a.warehouse)==null?void 0:I.id),1)]),e("td",it,o(a.customer.firstName+" "+a.customer.lastName),1),e("td",dt,[e("button",{"data-bs-toggle":"modal","data-bs-target":"#kt_modal_view_inventory",class:"btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1",onClick:J(F=>t.updateViewProfile(a),["prevent"])},[u(n,{"icon-name":"switch","icon-class":"fs-3"})],8,lt),e("button",ct,[u(n,{"icon-name":"pencil","icon-class":"fs-3"})])])])}),128))])]),e("div",mt,[u(i,{onPageChange:t.pageChange,"current-page":t.currentPage,itemsPerPage:t.itemsPerPage,"onUpdate:itemsPerPage":d[0]||(d[0]=a=>t.itemsPerPage=a),count:t.totalItems,"items-per-page-dropdown-enabled":t.itemsPerPageDropdownEnabled},null,8,["onPageChange","current-page","itemsPerPage","count","items-per-page-dropdown-enabled"])])])):k("",!0)])],2),u(l,{InventoryData:t.viewInventoryData},null,8,["InventoryData"])],64)}const ut=T(Me,[["render",_t]]),pt=x({name:"inventory_records",components:{InventoryTable:ut},props:{},setup(){return{}}});function ht(t,d,p,h,w,v){const n=b("InventoryTable");return m(),c("div",null,[u(n,{"widget-classes":"mb-5 mb-xl-8"})])}const Dt=T(pt,[["render",ht]]);export{Dt as default};
