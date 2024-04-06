import Dexie, { Table } from "dexie";

export interface Tickets {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  seatNumber?: number;
}

export class TicketDBDexie extends Dexie {
  tickets!: Table<Tickets>;

  constructor() {
    super("seat_reservationDB");
    this.version(1).stores({
      tickets: "++id, firstName, lastName, email, seatNumber", // Primary key and indexed props
    });
  }
}

export const LocalDB = new TicketDBDexie();
