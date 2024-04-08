import { FunctionComponent, useEffect, useState } from "react";
import "./index.css";
import Card from "react-bootstrap/Card";
import { useLiveQuery } from "dexie-react-hooks";
import { LocalDB } from "../../DB/DB";

interface ReservationProps {}
// interface Ticket {
//   id: number | undefined;
//   firstName: string;
//   lastName: string;
//   email: string;
//   seatNumber: number;
// }

const Reservation: FunctionComponent<ReservationProps> = () => {
  return (
    <div>
      <p>Reservation</p>
      <div className="reservation-container">
        {useLiveQuery(() => LocalDB.tickets.toArray())?.map(
          ({ id, firstName, lastName, email, seatNumber }) => {
            return (
              <div key={id}>
                <Card style={{ width: "18rem" }}>
                  <p>{firstName}</p>
                  <p>{lastName}</p>
                  <p>{email}</p>
                  <p>{seatNumber}</p>
                </Card>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Reservation;
