import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { FunctionComponent } from "react";
import "./index.css";
import { useState } from "react";

interface NavbarProps {}

const MyNavbar: FunctionComponent<NavbarProps> = () => {
  const [active, setActive] = useState("Dashboard");
  return (
    <div className="navbar_custom">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Bus Ticketing System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer
                onClick={() => setActive("Dashboard")}
                to="/"
                className="curs"
                style={{ color: active === "Dashboard" ? "red" : "black" }}
              >
                <Navbar.Text>Dashboard</Navbar.Text>
              </LinkContainer>
              <LinkContainer
                onClick={() => setActive("Reservation")}
                to="/reservation"
                className="curs"
                style={{ color: active === "Reservation" ? "red" : "black" }}
              >
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
