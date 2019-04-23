import React from 'react';
import {padZeros} from './util/helperFuncs';


const OrderConfirmation = ({order}) => (
  <div>
    {/* <h1>Your order {`#${padZeros(order.id)}`} has been successfully processed!</h1> */}
    <h1>Your order has been successfully processed!</h1>
    <div>

    </div>
  </div>
);

export default OrderConfirmation;
