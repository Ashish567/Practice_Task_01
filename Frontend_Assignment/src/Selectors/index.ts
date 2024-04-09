import { selector } from "recoil";
import { UD_Form_Atom } from "../Atoms";

const UD_form_state = selector({
  key: "ticket_id", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const ud_val = get(UD_Form_Atom);
    return ud_val;
  },
  set: ({ set }, newValue) => {
    set(UD_Form_Atom, newValue);
  },
});

export { UD_form_state };
