import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <header>
      <Navbar bg="light" expand="sm">
        <Container>
          <Navbar.Brand>Конвертер валют</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="nav-link">Конвертер</Link>
              <Link to="/rates" className="nav-link">Курсы валют</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default AppHeader;