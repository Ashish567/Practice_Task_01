import { FunctionComponent, useRef, useState } from "react";
import "./index.css";
import Card from "react-bootstrap/Card";
import { useLiveQuery } from "dexie-react-hooks";
import { LocalDB } from "../../DB/DB";
import ModalForm_UD from "../../Components/ModalForm_UD";
import { useRecoilState } from "recoil";
import { UD_Form_Atom } from "../../Atoms";

interface ReservationProps {}

const Reservation: FunctionComponent<ReservationProps> = () => {
  const target = useRef(null);

  const [modalForm, setModalForm] = useState(false);
  const [cardVals, setCardVals] = useRecoilState(UD_Form_Atom);
  return (
    <div>
      <div className="res_cont">
        <div>
          Reservation Directory..........., User Can Update & Delete Tickets.
        </div>
      </div>
      <div className="reservation-container">
        {useLiveQuery(() => LocalDB.tickets.toArray())?.map(
          ({ id, firstName, lastName, email, seatNumber }) => {
            return (
              <div className="card_content" key={id}>
                <Card
                  style={{
                    height: "inherit",
                    padding: "10px",
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
                    paddingTop: "30px",
                  }}
                  ref={target}
                  onClick={() => {
                    setModalForm(true);
                    seatNumber = seatNumber ? seatNumber : 0;
                    setCardVals({
                      firstName,
                      lastName,
                      email,
                      seatNumber, // Fix: Corrected property name from 'seatNumberr' to 'seatNumber'
                      id,
                    });
                  }}
                >
                  <div className="nam_hol">
                    <p>{firstName}</p>
                    <p>{lastName}</p>
                  </div>

                  <p>{email}</p>

                  <p>{seatNumber}</p>
                </Card>
              </div>
            );
          }
        )}
      </div>
      <ModalForm_UD show={modalForm} onHide={() => setModalForm(false)} />
    </div>
  );
};

export default Reservation;
