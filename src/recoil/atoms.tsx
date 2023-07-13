import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "sessionStorage", //원하는 key 값 입력
  storage: sessionStorage,
});

export const latAtom = atom({
  key: "latAtom",
  default: {
    latAtom: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const lngAtom = atom({
  key: "lngAtom",
  default: {
    lngAtom: "",
  },
  effects_UNSTABLE: [persistAtom],
});
