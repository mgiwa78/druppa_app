<template>
    <div class="card" :class="className">
        <div class="card-body py-4 px-4">
            <div class="col-12">
                <div class="col-12 col-lg-12 mb-2 mb-sm-0 pb-5">
                    <div class="bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-200px  " :style="{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${item?.image
                            ? `${ASSETS_URL + item?.image}`
                            : getAssetPath('media/avatars/blank.png')})`,
                        backgroundPosition: 'center',
                    }"></div>
                </div>

                <div class=" col-12 ">
                    <div class="d-flex flex-column h-100">
                        <div class="mb-1">
                            <div class="d-flex flex-stack mb-2">
                                <div class=" me-5">
                                    <span class="text-gray-400 fs-7 fw-bold me-2 d-block lh-1 pb-1">{{
                                        item?.vendor.vendorName }}</span>

                                    <div class="text-gray-800 fs-1 fw-bold">{{ item?.name }}</div>
                                    <span class="text-gray-400 fs-7 text-capitalize fw-bold me-2 d-block lh-1 pb-1">{{
                                        item?.category.name }}</span>
                                </div>

                                <span class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7">
                                    {{ formatMoneyToNaira(item?.price) }}</span>
                            </div>


                        </div>

                        <div class="mb-1">
                            <span class="fw-semibold text-gray-600 fs-6 mb-8 d-block text-capitalize">
                                {{ item?.description }}
                            </span>
                            <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal"
                                @click.prevent="updateItem && item ? updateItem(item) : null"
                                data-bs-target="#kt_modal_customer_make_resturant_order">
                                <KTIcon icon-name="plus" icon-class="fs-2" />
                                Order
                            </button>
                            <!-- <div class="d-flex">
                                <div
                                    class="border border-gray-300 border-dashed rounded min-w-100px w-100 py-2 px-4 me-6 mb-3">
                                    <span class="fs-6 text-gray-700 fw-bold">Feb 6, 2021 </span>

                                    <div class="fw-semibold text-gray-400">Due Date</div>
                                </div>

                                <div class="border border-gray-300 border-dashed rounded min-w-100px w-100 py-2 px-4 mb-3">
                                    <span class="fs-6 text-gray-700 fw-bold">$ <span class="ms-n1">284,900</span></span>

                                    <div class="fw-semibold text-gray-400">Budget</div>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <MakeDishOrderModal :ItemData="item" />
    </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, type PropType } from "vue";
import type { AllTypes } from "../../core/types";
import { defaultTypes } from "../../core/types/defaultData.js";
import __CONSTANTS__ from "@/constants";
import formatMoneyToNaira from "@/core/helpers/formatMoney"
import MakeDishOrderModal from "@/components/customer/forms/MakeDishOrderModal.vue";
import { number } from "yup";

export default defineComponent({
    name: "restaurant-dish-item",
    components: { MakeDishOrderModal },
    props: {
        className: { type: String, required: false },
        image: { type: String, required: true },
        item: { type: Object as PropType<AllTypes.VendorItemType>, },
        updateItem: Function
    },
    setup() {
        const CustomerViewOrderData = ref<AllTypes.OrderType>(
            defaultTypes.OrderEmpty
        );
        const updateViewOrder = async (Order: AllTypes.OrderType) => {
            console.log(Order);
            CustomerViewOrderData.value = Order;
        };
        const { API_URL, ASSETS_URL } = __CONSTANTS__;

        return {
            getAssetPath, ASSETS_URL, formatMoneyToNaira
        };
    },
});
</script>
