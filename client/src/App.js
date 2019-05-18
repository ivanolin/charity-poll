import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { ApolloProvider, Query, Mutation } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import { getPollResults } from "./queries.js";
import PollChart from "./Components/PollChart.js"
import ConfirmDonation from "./Components/ConfirmDonation.js"

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

/**
* Create new client 
*/
const client = new ApolloClient({
  uri: 'http://localhost:4000'
});

const pollCategories = ["Cats", "Dogs"];

/**
 * 
 */
class App extends Component {
  render() {

    //Get time
    let today = new Date();
    let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}:${today.getMilliseconds()}`

    //Create-react-app starter code with added query
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div style={{ flexGrow: 1 }}>
            <Grid container spacing={12} alignItems="stretch">
              <Grid item xs={12}>
                <Card>
                  Please enter the amount you would like to donate to: Dogs
                </Card>
                <Grid item xs={12}>
                <ConfirmDonation donationAmount={5} category="Dogs"/>
                <ConfirmDonation donationAmount={5} category="Cats"/>
                </Grid>
                </Grid>
            </Grid>


            <Grid container spacing={24} alignItems="center">

              <Grid item xs={2}></Grid>
              <Grid item xs={8}>


                <Query query={getPollResults} variables={{ categories: pollCategories }}>
                  {({ data, loading, error }) => {

                    //render error
                    if (error)
                      return (<p className="App-intro">error</p>);

                    //render loader
                    if (loading)
                      return (<p className="App-intro">LOADING</p>)

                    //render chart
                    if (data) {
                      var pollResults = data.getPollResults;
                      var remappedResults = [];
                      for (var i = 0; i < pollResults.length; i++) {
                        remappedResults.push({
                          x: pollResults[i].category + ": $" + pollResults[i].total,
                          y: pollResults[i].total
                        });
                      }

                      return (
                        <PollChart
                          question="What type of pet do you prefer?"
                          categories={[pollCategories]}
                          sampleData={remappedResults} />
                      );

                    }
                  }}
                </Query>
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
