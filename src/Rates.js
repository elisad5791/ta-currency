import { useEffect, useState } from 'react';
import { Form, Row, Col, Table } from 'react-bootstrap';
import fx from 'money';
import _ from 'lodash';
import './css/Rates.css';
import getRates from './api/index.js';

const Rates = () => {
  const [names, setNames] = useState([]);
  const [ratesInfo, setRatesInfo] = useState([]);
  const [currencyBase, setCurrencyBase] = useState('USD');
  useEffect(() => {
    const getData = async () => {
      const { base, rates } = await getRates();
      setRatesInfo(Object.entries(rates));
      setNames(Object.keys(rates));
      fx.base = base;
      fx.rates = rates;
    };
    getData();
  }, []);

  const calculate = (value) => {
    const result = names.map((name) => {
      const rate = _.round(fx(1).convert({ from: value, to: name }), 2);
      return [name, rate];
    });
    setRatesInfo(result);
  };

  const changeBase = (e) => {
    const { value } = e.target;
    setCurrencyBase(value);
    calculate(value);
  };


  return (
    <Col sm={8} md={6} lg={4}>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column htmlFor="base" className="text-end">
            Базовая валюта
          </Form.Label>
          <Col>
            <Form.Select id="base" value={currencyBase} onChange={changeBase}>
              {names.map((name) => <option key={name}>{name}</option>)}
            </Form.Select>
          </Col>
        </Form.Group>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Наименование валюты</th>
            <th>Курс</th>
          </tr>
        </thead>
        <tbody>
          {ratesInfo.map(([name, rate]) => <tr key={name}><td>{name}</td><td>{_.round(rate, 2)}</td></tr>)}
        </tbody>
      </Table>
    </Col>
  );
};

export default Rates;