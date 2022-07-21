import React from "react"
import { Link } from "react-router-dom"
import { Navbar, Container, Nav } from "react-bootstrap"

const UfcodeNavbar = () => {

    return (
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Manage UFCode</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/course">Cursos</Nav.Link>
            <Nav.Link as={Link} to="/module">Modulos</Nav.Link>
            <Nav.Link as={Link} to="/events">Eventos</Nav.Link>
            <Nav.Link as={Link} to="/problems">Problemas</Nav.Link>
            <Nav.Link as={Link} to="/submissions">Submissões</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
}

export default UfcodeNavbar