import { atom } from "recoil";

interface UD_Form {
  firstName: string;
  lastName: string;
  email: string;
  seatNumber: number | string;
  id: number | undefined;
}

const UD_Form_Atom = atom({
  key: "UD_Form", // unique ID (with respect to other atoms/selectors)
  default: {
    firstName: "",
    lastName: "",
    email: "",
    seatNumber: 0,
    id: 0,
  } as UD_Form, // default value (aka initial value)
});
const Ticket_Availibilty_Atom = atom({
  key: "Ticket_Availibilty", // unique ID (with respect to other atoms/selectors)
  default: {} as { [key: string]: string }, // default value (aka initial value)
});

export { UD_Form_Atom, Ticket_Availibilty_Atom };

// export interface Todo {
//   id?: string;
//   title: string;
//   completed: boolean;
// }

// export const todosState = atom({
//   key: "todos",
//   default: [] as Todo[],
// });
