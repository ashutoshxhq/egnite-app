import { atom } from "recoil";


export const schemasAtom = atom<any[]>({
  key: "schemasAtom",
  default: [],
});
