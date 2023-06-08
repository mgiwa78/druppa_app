<template>
  <!--begin::Tables Widget 12-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Admin Users</span>

        <span class="text-muted mt-1 fw-semobold fs-7"
          >13 Administrative users</span
        >
      </h3>
      <div class="card-toolbar">
        <!--begin::Menu-->
        <div class="d-flex align-items-center position-relative my-1">
          <KTIcon
            icon-name="magnifier"
            icon-class="fs-1 position-absolute ms-6"
          />
          <input
            type="text"
            v-model="search"
            @input="searchItems()"
            class="form-control form-control-solid w-250px ps-15 mx-50"
            placeholder="Search Users"
          />
        </div>

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table class="table align-middle gs-0 gy-4">
          <!--begin::Table head-->
          <thead>
            <tr class="fw-bold text-muted bg-light">
              <th class="ps-4 min-w-300px rounded-start">Name</th>
              <th class="min-w-125px">Role</th>
              <th class="min-w-125px">Last Login</th>
              <th class="min-w-200px">Permissions</th>
              <th class="min-w-200px text-end rounded-end"></th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="(item, index) in list" :key="index">
              <tr>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="symbol symbol-50px me-5">
                      <span class="symbol-label bg-light">
                        <img
                          :src="item.agent.image"
                          class="h-75 align-self-end"
                          alt=""
                        />
                      </span>
                    </div>

                    <div class="d-flex justify-content-start flex-column">
                      <a
                        href="#"
                        class="text-dark fw-bold text-hover-primary mb-1 fs-6"
                        >{{ item.agent.name }}</a
                      >
                      <span
                        class="text-muted fw-semobold text-muted d-block fs-7"
                        >{{ item.agent.skills }}</span
                      >
                    </div>
                  </div>
                </td>

                <td>
                  <a
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.earnings.value }}</a
                  >
                  <span class="text-muted fw-semobold text-muted d-block fs-7"
                    >{{ item.earnings.remarks }}></span
                  >
                </td>

                <td>
                  <a
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.comission.value }}</a
                  >
                  <span
                    class="text-muted fw-semobold text-muted d-block fs-7"
                    >{{ item.comission.remarks }}</span
                  >
                </td>

                <td>
                  <a
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.company.name }}</a
                  >
                  <span
                    class="text-muted fw-semobold text-muted d-block fs-7"
                    >{{ item.company.fields }}</span
                  >
                </td>

                <td class="text-end">
                  <a
                    href="#"
                    class="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2"
                  >
                    View
                  </a>

                  <a
                    href="#"
                    class="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            </template>
          </tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
      </div>
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <!--end::Tables Widget 12-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import type { ICustomer } from "@/core/data/customers";
import customers from "@/core/data/customers";

export default defineComponent({
  name: "kt-widget-12",
  components: {},
  props: {
    widgetClasses: String,
  },
  setup() {
    const tableData = ref<Array<ICustomer>>(customers);
    const initCustomers = ref<Array<ICustomer>>([]);

    const search = ref<string>("");
    const searchItems = () => {
      tableData.value.splice(0, tableData.value.length, ...initCustomers.value);
      if (search.value !== "") {
        let results: Array<ICustomer> = [];
        for (let j = 0; j < tableData.value.length; j++) {
          if (searchingFunc(tableData.value[j], search.value)) {
            results.push(tableData.value[j]);
          }
        }
        tableData.value.splice(0, tableData.value.length, ...results);
      }
    };

    const searchingFunc = (obj: any, value: string): boolean => {
      for (let key in obj) {
        if (!Number.isInteger(obj[key]) && !(typeof obj[key] === "object")) {
          if (obj[key].indexOf(value) != -1) {
            return true;
          }
        }
      }
      return false;
    };

    const list = [
      {
        agent: {
          image: getAssetPath("media/svg/avatars/001-boy.svg"),
          name: "Brad Simmons",
          skills: "HTML, JS, ReactJS",
        },
        earnings: {
          value: "$8,000,000",
          remarks: "Pending",
        },
        comission: {
          value: "$5,400",
          remarks: "Paid",
        },
        company: {
          name: "Intertico",
          fields: "Web, UI/UX Design",
        },
        rating: {
          value: 5,
          remarks: "Best Rated",
        },
      },
      {
        agent: {
          image: getAssetPath("media/svg/avatars/047-girl-25.svg"),
          name: "Lebron Wayde",
          skills: "PHP, Laravel, VueJS",
        },
        earnings: {
          value: "$8,750,000",
          remarks: "Paid",
        },
        comission: {
          value: "$7,400",
          remarks: "Paid",
        },
        company: {
          name: "Agoda",
          fields: "Houses & Hotels",
        },
        rating: {
          value: 4,
          remarks: "Above Avarage",
        },
      },
      {
        agent: {
          image: getAssetPath("media/svg/avatars/006-girl-3.svg"),
          name: "Brad Simmons",
          skills: "HTML, JS, ReactJS",
        },
        earnings: {
          value: "$8,000,000",
          remarks: "In Proccess",
        },
        comission: {
          value: "$2,500",
          remarks: "Rejected",
        },
        company: {
          name: "RoadGee",
          fields: "Paid",
        },
        rating: {
          value: 5,
          remarks: "Best Rated",
        },
      },
      {
        agent: {
          image: getAssetPath("media/svg/avatars/014-girl-7.svg"),
          name: "Natali Trump",
          skills: "HTML, JS, ReactJS",
        },
        earnings: {
          value: "$700,000",
          remarks: "Pending",
        },
        comission: {
          value: "$7,760",
          remarks: "Paid",
        },
        company: {
          name: "The Hill",
          fields: "Insurance",
        },
        rating: {
          value: 3,
          remarks: "Avarage",
        },
      },
      {
        agent: {
          image: getAssetPath("media/svg/avatars/020-girl-11.svg"),
          name: "	Jessie Clarcson",
          skills: "HTML, JS, ReactJS",
        },
        earnings: {
          value: "$1,320,000",
          remarks: "Pending",
        },
        comission: {
          value: "$6,250",
          remarks: "Paid",
        },
        company: {
          name: "Intertico",
          fields: "Web, UI/UX Design",
        },
        rating: {
          value: 5,
          remarks: "Best Rated",
        },
      },
    ];

    return {
      search,
      list,
      getAssetPath,
      searchItems,
    };
  },
});
</script>
