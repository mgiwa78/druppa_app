import{g as i}from"./assets.6f11792f.js";import{d as D,c as m,m as d}from"./index.f8ca9675.js";import{d as t}from"./defaultData.9a1fdc93.js";import{f as o}from"./formatDate.672d0471.js";const n=D({name:"add-delivery-modal",components:{},props:{DeliveryData:{type:Object}},setup(e){const{API_URL:l,ASSETS_URL:a}=d,r=m(()=>(console.log(e.DeliveryData),e.DeliveryData&&e.DeliveryData.id?{customer:e.DeliveryData.customer,id:e.DeliveryData.id||"",customer_order_id:e.DeliveryData.customer_order_id||"",customer_order:e.DeliveryData.customer_order_id||"",tracking_number:e.DeliveryData.tracking_number||"",status:e.DeliveryData.status||"",pickup_date:e.DeliveryData.pickup_date||"",delivery_date:e.DeliveryData.delivery_date||"",driver:t.DriverEmpty,image:e.DeliveryData.image||""}:{...t.DeliveryEmpty}));return{getAssetPath:i,viewDeliveryData:r,ASSETS_URL:a,formatDate:o}}});export{n as _};
