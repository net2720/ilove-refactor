import { atom } from "recoil";

export const streetAddress = atom({
  key: "streetAddress",
  default: {
    streetAddress: "",
  },
});

export const additionalAddress = atom({
  key: "additionalAddress",
  default: {
    additionalAddress: "",
  },
});
