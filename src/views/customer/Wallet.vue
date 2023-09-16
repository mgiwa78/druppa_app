<template>
  <div>
    <div class="row g-5 g-xl-8">
      <div class="col-xl-4 gx-5">
        <div class="col-12">
          <StatisticsWidget5
            widget-classes="mb-xl-8 mb-5"
            icon-name="barcode"
            color="danger"
            icon-color="white"
            :title="`${formattedBalance}`"
            description="Wallet Balance"
          ></StatisticsWidget5>
        </div>

        <div class="col-12">
          <StatisticsWidget5
            widget-classes="mb-xl-8"
            icon-name="lots-shopping"
            color="primary"
            icon-color="white"
            :title="`${formattedCummulativeAmmount}`"
            description="Cummulative Payments"
          ></StatisticsWidget5>
        </div>
        <div class="col-12 pt-5 pt-lg-0">
          <FundWallectTransections widget-classes="mb-xl-8" />
        </div>
      </div>
      <div class="col-xl-8 gx-5">
        <div class="col-12">
          <WalletTransactions></WalletTransactions>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import __CONSTANTS__ from "@/constants";
import { computed, defineComponent, onMounted, ref } from "vue";
import StatisticsWidget5 from "@/components/widgets/statsistics/Widget5.vue";
import WalletTransactions from "@/components/customer/widgets/WalletTransactions.vue";
import FundWallectTransections from "@/components/customer/widgets/FundWallectTransections.vue";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import ErrorHandler from "@/core/helpers/errorHandler";

export default defineComponent({
  name: "my_wallet",
  components: {
    StatisticsWidget5,
    WalletTransactions,
    FundWallectTransections,
  },
  props: {},
  setup() {
    const { API_URL, ASSETS_URL } = __CONSTANTS__;
    const cummulativeAmmount = ref<number>(0);
    const myBalance = ref<number>(0);
    const AuthStore = useAuthStore();

    const { user, token, refreshProfile } = AuthStore;

    const formattedBalance = computed(() => {
      const numericValue = parseFloat(`${myBalance.value}`);
      if (!isNaN(numericValue)) {
        const money = numericValue / 100;

        return money
          .toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
          .replace("$", "₦");
      }
      return "";
    });
    const formattedCummulativeAmmount = computed(() => {
      const numericValue = parseFloat(`${cummulativeAmmount.value}`);
      if (!isNaN(numericValue)) {
        return numericValue
          .toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
          .replace("$", "₦");
      }
      return "";
    });

    const fetchCummulativeBalance = async () => {
      const Orders = await axios
        .get(API_URL + "walletTransactions/myCummulativeTransactions", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.data)
        .catch((error) => {
          ErrorHandler(error);
        });

      return Orders.data;
    };

    const fetchBalance = async () => {
      const Orders = await axios
        .get(API_URL + "wallet/" + user.id, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.data)
        .catch((error) => {
          ErrorHandler(error);
        });

      return Orders.data;
    };

    onMounted(async () => {
      const cumulativeBalance = await fetchCummulativeBalance();
      const balance = await fetchBalance();

      cummulativeAmmount.value = cumulativeBalance;
      myBalance.value = balance;
    });
    return {
      user,
      cummulativeAmmount,
      myBalance,
      formattedBalance,
      formattedCummulativeAmmount,
    };
  },
});
</script>
