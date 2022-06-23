import { Container, Row } from 'react-bootstrap';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AppFooter from './AppFooter.js';
import AppHeader from './AppHeader.js';
import Converter from './Converter.js';
import Rates from './Rates.js';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column justify-content-between h-100">
        <AppHeader />
        <main>
          <Container>
            <Row  className="justify-content-center py-4">
              <Routes>
                <Route path="/" element={<Converter />} />
                <Route path="rates" element={<Rates />} />
              </Routes>
            </Row>
          </Container>
        </main>
        <AppFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
