import { useEffect, useState } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import fx from 'money';
import _ from 'lodash';
import './css/Converter.css';
import getRates from './api/index.js';

const Converter = () => {
  const [names, setNames] = useState([]);
  const [currencyFrom, setCurrencyFrom] = useState('RUB');
  const [currencyTo, setCurrencyTo] = useState('USD');
  const [valueFrom, setValueFrom] = useState(100);
  const [valueTo, setValueTo] = useState(0);

  const calculate = (value, nameFrom, nameTo) => {
    const result = _.round(fx(value).convert({ from: nameFrom, to: nameTo }), 2);
    setValueTo(result);
  };

  useEffect(() => {
    const getData = async () => {
      const { base, rates } = await getRates();
      setNames(Object.keys(rates));
      fx.base = base;
      fx.rates = rates;
      calculate(100, 'RUB', 'USD');
    };
    getData();
  }, []);

  const changeNameFrom = (e) => {
    const name = e.target.value;
    setCurrencyFrom(name);
    calculate(valueFrom, name, currencyTo);
  };
  const changeNameTo = (e) => {
    const name = e.target.value;
    setCurrencyTo(name);
    calculate(valueFrom, currencyFrom, name);
  };
  const changeValueFrom = (e) => {
    const { value } = e.target;
    setValueFrom(value);
    calculate(value, currencyFrom, currencyTo);
  };

  return (
    <Col lg={10} xl={8}>
      <Form>
        <Row>
          <Col xs={12} md={6} className="mb-3">
            <h2 className="h4 alert alert-info">У меня есть</h2>
            <Form.Select
              aria-label="Default select example"
              className="mb-3" 
              onChange={changeNameFrom} 
              value={currencyFrom}
            >
              {names.map((name) => <option key={name}>{name}</option>)}
            </Form.Select>
            <Form.Control 
              type="text" 
              placeholder="100" 
              className="number" 
              onChange={changeValueFrom}
              value={valueFrom}
            />
          </Col>
          <Col xs={12} md={6} className="mb-3">
            <h2 className="h4 alert alert-info">Это будет</h2>
            <Form.Select 
              aria-label="Default select example" 
              className="mb-3" 
              onChange={changeNameTo} 
              value={currencyTo}
            >
              {names.map((name) => <option key={name}>{name}</option>)}
            </Form.Select>
            <Form.Control 
              type="text" 
              className="number"
              value={valueTo} 
              readOnly />
          </Col>
        </Row>
      </Form>
    </Col>
  );
};

export default Converter;