import React, { Component } from 'react';
import { submitPoll } from "../queries.js";
import { Mutation } from 'react-apollo';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

export default class ConfirmDonation extends Component {

  constructor(props) {
    super(props);
    this.state =
    {
        category: props.category,
        donationAmount: props.donationAmount
    }
  }

  componentDidMount() {
  }

  handleChange = propName => event => {
    this.setState({
      [propName]: event.target.value,
    });
  };

  render() {
    let input;

    return (
          <Mutation mutation={submitPoll}>
            {(doSubmitPoll, { data }) => (
              <div>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    doSubmitPoll({ variables: { category: this.state.category, amount: this.state.donationAmount } });
                  }}
                >
                  <Grid item xs={12}>
                    <Button variant="contained" type="submit">Donate ${this.state.donationAmount} to {this.state.category}</Button>
                  </Grid>
                </form>
              </div>
            )}
          </Mutation>
    );
  }
}

