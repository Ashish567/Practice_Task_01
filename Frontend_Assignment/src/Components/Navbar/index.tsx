import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { FunctionComponent } from "react";
import "./index.css";

interface NavbarProps {}

const MyNavbar: FunctionComponent<NavbarProps> = () => {
  return (
    <div className="navbar_custom">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Bus Ticketing System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/" className="curs">
                <Navbar.Text>Dashboard</Navbar.Text>
              </LinkContainer>
              <LinkContainer to="/reservation" className="curs">
                <Navbar.Text>Reservation</Navbar.Text>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
