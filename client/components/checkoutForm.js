import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false
    }
    this.submit = this.submit.bind(this);
  }

  async submit(event) {
    // User clicked submit
    // provide object in createToken containing form details
    let {token} = await this.props.stripe.createToken({name: "Name"});

    //axios request. thunk
    let response = await fetch("/charge", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: {
        amount: "total",
        token: token.id
      }
    });

    if (response.ok) this.setState({complete: true});
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Submit Order</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
