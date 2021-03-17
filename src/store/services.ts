import { atom } from "recoil";

export const servicesAtom = atom<any[]>({
  key: "servicesAtom",
  default: [],
});
