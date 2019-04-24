import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Header} from 'semantic-ui-react';

const OrderConfirmation = () => (
  <Container text>
    <Header as='h2'>Your Order Has Been Successfully Processed!</Header>
    <p>
      You can continue shopping <Link to="/home">here</Link>.
    </p>
  </Container>
);

export default OrderConfirmation;
