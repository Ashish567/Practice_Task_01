import { FunctionComponent, useEffect } from "react";
import { useState, useRef } from "react";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import "./index.css";
import ModalForm from "../ModalForm";

interface SeatsProps {
  status: string;
  direction: string;
  xtraStyle: string;
  xtrastyle_1: string;
  seatNumber: number;
}

const Seats: FunctionComponent<SeatsProps> = ({
  status,
  direction,
  xtraStyle,
  xtrastyle_1,
  seatNumber,
}) => {
  const [bookingstatus] = useState({
    Available: "white",
    Booked: "red",
    Occupied: "gray",
  });
  const [dirprop, setSeatDirectionProp] = useState([
    { width: "120px", height: "60px" },
    {
      height: "40px",
      width: "15px",
    },
  ]);
  useEffect(() => {
    if (direction === "col") {
      setSeatDirectionProp([
        { width: "60px", height: "120px" },
        { width: "40px", height: "15px" },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add index signature to bookingstatus object
  const bookingStatusColors: { [key: string]: string } = bookingstatus;

  const [show, setShow] = useState(false);
  const target = useRef(null);

  const [modalForm, setModalForm] = useState(false);

  return (
    <>
      <div
        ref={target}
        onMouseEnter={() => {
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 2000);
        }}
        onMouseLeave={() => setShow(false)}
        onClick={() => setModalForm(true)}
        className="seat"
        style={{
          backgroundColor: bookingStatusColors[status],
          ...dirprop[0],
          ...JSON.parse(xtraStyle),
        }}
      >
        <div
          className="circ"
          style={{ ...dirprop[1], ...JSON.parse(xtrastyle_1) }}
        ></div>
      </div>
      <Overlay target={target.current} show={show} placement="right">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            {status}
          </Tooltip>
        )}
      </Overlay>
      <ModalForm
        show={modalForm}
        onHide={() => setModalForm(false)}
        seatNumber={seatNumber}
      />
    </>
  );
};

export default Seats;
