import{g}from"./assets.6f11792f.js";import{d as m,G as y,q as v,c as w,V as x,Y as C,ap as o,_ as h,b as f,i as t,j as l,v as $,k as d,o as u}from"./index.f8ca9675.js";import{D as k}from"./Dropdown1.3a9803ef.js";const D=m({name:"driver-widget-1",props:{widgetClasses:String,height:Number},components:{Dropdown1:k},setup(){const e=y(null);let s={};const a=v(),r=[{name:"Net Profit",data:[44,55,57,56,61,58]},{name:"Revenue",data:[76,85,101,98,87,105]}],n=w(()=>a.mode);x(()=>{Object.assign(s,p())});const c=()=>{!e.value||(Object.assign(s,p()),e.value.refresh())};return C(n,()=>{c()}),{chart:s,series:r,chartRef:e,getAssetPath:g}}}),p=()=>{const e=o("--bs-gray-500"),s=o("--bs-gray-200"),a=o("--bs-success"),r=o("--bs-primary"),n=o("--bs-warning"),c=o("--bs-danger");return{chart:{fontFamily:"inherit",type:"bar",toolbar:{show:!1}},plotOptions:{bar:{horizontal:!1,columnWidth:"30%",borderRadius:5}},legend:{show:!1},dataLabels:{enabled:!1},stroke:{show:!0,width:2,colors:["transparent"]},xaxis:{categories:["Feb","Mar","Apr","May","Jun","Jul"],axisBorder:{show:!1},axisTicks:{show:!1},labels:{style:{colors:e,fontSize:"12px"}}},yaxis:{labels:{style:{colors:e,fontSize:"12px"}}},fill:{opacity:1},states:{normal:{filter:{type:"none",value:0}},hover:{filter:{type:"none",value:0}},active:{allowMultipleDataPointsSelection:!1,filter:{type:"none",value:0}}},tooltip:{style:{fontSize:"12px"},y:{formatter:function(i){return"$"+i+" thousands"}}},colors:[n,c,r,a,"#ccffB0"],grid:{borderColor:s,strokeDashArray:4,yaxis:{lines:{show:!0}}}}},S={class:"card-header border-0 pt-5"},B=t("h3",{class:"card-title align-items-start flex-column"},[t("span",{class:"card-label fw-bold fs-3 mb-1"},"Recent Statistics"),t("span",{class:"text-muted fw-semobold fs-7"},"More than 400 new members")],-1),M={class:"card-toolbar"},R={type:"button",class:"btn btn-sm btn-icon btn-color-primary btn-active-light-primary","data-kt-menu-trigger":"click","data-kt-menu-placement":"bottom-end","data-kt-menu-flip":"top-end"},z={class:"card-body"};function V(e,s,a,r,n,c){const i=d("KTIcon"),b=d("Dropdown1"),_=d("apexchart");return u(),f("div",{class:$(["card",e.widgetClasses])},[t("div",S,[B,t("div",M,[t("button",R,[l(i,{"icon-name":"category","icon-class":"fs-2"})]),l(b)])]),t("div",z,[l(_,{ref:"chartRef",type:"donut",options:e.chart,series:[44,55,41,17,15],height:e.height},null,8,["options","height"])])],2)}const N=h(D,[["render",V]]),O=m({name:"delivery_records",components:{DriverWidget1:N},props:{},setup(){return{}}}),T={class:"row fv"},W={class:"col-4"};function j(e,s,a,r,n,c){const i=d("DriverWidget1");return u(),f("div",null,[t("div",T,[t("div",W,[l(i,{"widget-classes":"mb-5 mb-xl-8"})])])])}const I=h(O,[["render",j]]);export{I as default};
