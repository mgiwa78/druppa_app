import { useStaticsStore } from "./statics";
import { useAuthStore } from "./auth";

const auth = useAuthStore();
const statics = useStaticsStore();
export function purgeAuth() {
  auth.$reset();
  statics.$reset();
}
