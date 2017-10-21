import React, { Component } from 'react';
import { LineChart, Line } from 'recharts';
import { render } from 'react-dom';
import { VictoryChart, VictoryLabel, VictoryAxis, VictoryLine, VictoryScatter,
  VictoryVoronoiContainer, VictoryGroup, VictoryTooltip, VictoryZoomContainer,
  VictoryBrushContainer} from 'victory';
import API from "../../actions/axiosApi.js";

class Stats extends Component {
  state = {
    feelings:[],
    reasons: []
  };

  componentDidMount() {
    var email = localStorage.getItem('email');
    this.getFeelings(email);
    this.getReasons(email);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.feelings !== nextState.feelings;
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.reasons !== nextState.reasons;
  // }

  getFeelings = (email) => {
      API.getFeelings(email)

        .then( res =>
          {
            let feelingArray = [];
            let feelingdateArray = [];

            for(var i = 0; i < res.data.length; i++) {
              var temp = new Object();
              // Maps incoming data (res.data[i]) into the feelingArray
              // Data must be in the format - {a: new Date(2017-10-30T04:11:23.000Z), b: +1}
              // in order to work in victory charts
              // TODO -
              // need to construct a bar chart by building a data model (from online example)
              // a: is respect to the X-Axis (Reason Fieldname)
              // b: is respect to the Y-Axis (Count)
              temp['a'] = new Date(res.data[i].createdAt);
              temp['b'] = Number(res.data[i].feeling);
              feelingArray.push(temp);
            }
            console.log('feelingArray: ' + JSON.stringify(feelingArray));
            // var JSONifyIt = JSON.stringify(feelingArray);
            var another = JSON.stringify(feelingArray);

            this.setState({ feelings: feelingArray });
          }
      )
        .catch(err => console.log(err));
   };

   getReasons = (email) => {
     API.getReasons(email)
       .then( res =>
       {
         let dataArray = []

         for(var i = 0; i < res.data.length; i++) {
           dataArray.push(res.data[i].reasonList)
         }

         console.log('Reasons Data: ' + dataArray);

         this.setState({ reasons: dataArray });
         })
       };


  render() {
    return (
      <div>
        <VictoryChart width={500} height={250} scale={{x: "time"}}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
            />
          }
        >
            <VictoryLine
              style={{
                data: {stroke: "#80cbc4"}
              }}

              data={this.state.feelings}
              x="a"
              y="b"
            />

            <VictoryScatter data={this.state.feelings}
            x="a"
            y="b"
                style={{ data: { fill: "#80cbc4"} }}
            />

            <VictoryAxis crossAxis
              standalone={false}
            />
          <VictoryAxis dependentAxis crossAxis
            domain={[-2, 2]}
            orientation="left"
            standalone={false}
          />

          </VictoryChart>
      </div>
    );
  }
}

export default Stats;
