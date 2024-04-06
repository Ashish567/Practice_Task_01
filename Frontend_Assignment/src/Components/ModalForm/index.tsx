import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FunctionComponent } from "react";
import { LocalDB } from "../../DB/DB";
interface ModalFormProps {
  onHide: () => void;
  show: boolean;
  seatNumber: number;
}
async function saveToDB(
  firstName: string,
  lastName: string,
  email: string,
  seatNumber: number,
  closeModal: () => void
) {
  const id = await LocalDB.tickets.add({
    firstName,
    lastName,
    email,
    seatNumber,
  });
  closeModal();
  return id;
}

const ModalForm: FunctionComponent<ModalFormProps> = (ModalFormProps) => {
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
              <p>Your Awesome Journey Starts Here</p>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const firstName = form.elements.namedItem(
              "formFirstName"
            ) as HTMLInputElement;
            const lastName = form.elements.namedItem(
              "formLastName"
            ) as HTMLInputElement;
            const email = form.elements.namedItem(
              "formEmail"
            ) as HTMLInputElement;
            saveToDB(
              firstName.value,
              lastName.value,
              email.value,
              ModalFormProps.seatNumber,
              ModalFormProps.onHide
            );
          }}
        >
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              required={true}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Lat Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              required={true}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required={true}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;
