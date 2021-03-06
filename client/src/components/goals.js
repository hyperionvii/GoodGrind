import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router";
import API from "../actions/axiosApi.js";
import FontAwesome from 'react-fontawesome';

class Goals extends Component {

  state = {
    goalList: [],
    goal: ''
  };
  // this.handleChange = this.handleChange.bind(this);
  // this.handleSubmit = this.handleSubmit.bind(this);

  componentWillMount() {
    this.loadGoals();
  }


  loadGoals = () => {
    console.log('sfdgfdg')
    var email = localStorage.getItem('email');

    API.getGoals(email)
      .then(res => {

        let goalListInFunction = []

        for(var i = 0; i < res.data.length; i++) {
          goalListInFunction.push(res.data[i].goal)
        }
        this.setState({goalList: this.state.goalList = goalListInFunction})
      })
      .catch(err => console.log(err));
  };

  ComponentDidUpdate(nextProps, nextState) {
      this.state.goalList !== nextState.goalList;
      this.state.goal !== nextState.goal;
  }


  deleteGoal = goal => {

    var email = localStorage.getItem('email');

    API.deleteGoal(goal, email)
      .then(res => this.loadGoals() )
      .catch(err => console.log(err));
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  handleSubmit() {
      API.saveGoals({
        goal: this.state.goal,
        email: localStorage.getItem('email')
      })
      .then(res =>{

        console.log(res.data.goal);

          let goalListInFunction = [res.data.goal]
            this.setState({goalList: this.state.goalList.concat(goalListInFunction)})
        })
        .catch(err => console.log('error submitting goal'))
      }

render() {
  return (

    <div>
      <div>
        <h1 id='goalsWord'>Goals</h1>
        <div> { this.state.goalList.map( (goal) => (<div> <li id ='goalOutput'> {goal} </li>
          <button id = 'goalBye' value={goal} onClick={() => this.deleteGoal(goal)}> Delete </button> </div>))} </div>
      </div>

      <div id='goalInputDiv'>
          <input id='goalInput'
            value= {this.state.value}
            name = 'goal'
            onChange={this.handleChange.bind(this)}
          />
      </div>

      <p id='submitP'>
          <FontAwesome name="plus-circle" id="plus" onClick={() => this.handleSubmit()} />
      </p>

    </div>
      );
    }
  }

export default Goals;
