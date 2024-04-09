import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FunctionComponent, useEffect, useState } from "react";
import { LocalDB } from "../../DB/DB";
import { useRecoilState } from "recoil";
import { Ticket_Availibilty_Atom, UD_Form_Atom } from "../../Atoms";
interface ModalFormProps {
  onHide: () => void;
  show: boolean;
}
async function updateDB(
  firstName: string,
  lastName: string,
  email: string,
  seatNumber: number,
  id: number,
  closeModal: () => void
) {
  await LocalDB.tickets.update(id, {
    firstName,
    lastName,
    email,
    seatNumber,
  });
  closeModal();
}

const ModalForm: FunctionComponent<ModalFormProps> = (ModalFormProps) => {
  const [{ firstName, lastName, email, seatNumber, id }, setUD_Form_Atom] =
    useRecoilState(UD_Form_Atom);
  const [ticketAvailibilty, setTicketAvailibilty] = useRecoilState(
    Ticket_Availibilty_Atom
  );
  const [firstNamee, setFirstName] = useState(firstName);
  const [lastNamee, setLastName] = useState(lastName);
  const [emaile, setEmail] = useState(email);
  useEffect(() => {
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
  }, [firstName, lastName, email]);
  async function form_action(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    action: string
  ) {
    if (action === "update") {
      setUD_Form_Atom({
        firstName: firstNamee,
        lastName: lastNamee,
        email: emaile,
        seatNumber: seatNumber,
        id: id,
      });
      updateDB(
        firstNamee,
        lastNamee,
        emaile,
        Number(seatNumber),
        Number(id),
        ModalFormProps.onHide
      );
    } else if (action === "delete") {
      await LocalDB.tickets.delete(id);
      setTicketAvailibilty((prev) => {
        const newTicketAvailibilty: { [key: string]: string } = { ...prev };
        newTicketAvailibilty[seatNumber] = "Available";
        return newTicketAvailibilty;
      });
      ModalFormProps.onHide();
    }
  }
  return (
    <Modal
      {...ModalFormProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div style={{ textAlign: "center" }}>
            <div>
              <p>You Can Update Your Booking Here</p>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              required={true}
              value={firstNamee}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Lat Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              required={true}
              value={lastNamee}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required={true}
              value={emaile}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Button
            variant="primary"
            style={{ marginRight: "40px" }}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              form_action(e, "update")
            }
          >
            Submit
          </Button>

          <Button variant="danger" onClick={(e) => form_action(e, "delete")}>
            Delete
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;
