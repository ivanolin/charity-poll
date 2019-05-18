import React, { Component } from 'react';
import { VictoryPie, VictoryLabel, VictoryContainer, VictoryBar, VictoryChart, VictoryAnimation } from 'victory';
import { getPollResults } from "../queries.js";

export default class PollChart extends Component {

  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      question: props.question,
      sampleData: props.sampleData,
      categories: props.categories,
      collapsed: true,
      startAngle: 0,
      endAngle: 0,
      labelSize: 0
    };
  }

  clickHandler() {
    if (this.state.collapsed) {
      this.setState({
        collapsed: false,
        startAngle: -90,
        endAngle: 90,
        labelSize: 10
      });
    }
    else {
      this.setState({
        collapsed: true,
        startAngle: 0,
        endAngle: 0,
        labelSize: 0
      });
    }
  }

  componentDidMount() {
    this.setState({
      collapsed: false,
      startAngle: -90,
      endAngle: 90,
      labelSize: 10
    });
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  render() {
    return (
      <VictoryAnimation
        data={
          {
            sampleData: this.state.sampleData,
            startAngle: this.state.startAngle,
            endAngle: this.state.endAngle,
            labelSize: this.state.labelSize
          }}>
        {(data) => {
          return (
            <VictoryPie
              style={{
                data: {
                  fillOpacity: 0.9, stroke: "#ffffff", strokeWidth: 3
                },
                labels: {
                  fontSize: data.labelSize, fill: "#000000"
                }
              }}
              colorScale={["#cd6137", "#4aa6db", "#acc352", "gold"]}
              startAngle={data.startAngle}
              endAngle={data.endAngle}
              data={data.sampleData}
              labelRadius={90}
            />
          );
        }}
      </VictoryAnimation>
    );
  }
}

