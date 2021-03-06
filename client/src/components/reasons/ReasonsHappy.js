import React, { Component } from 'react';
import UpdateReasons from '../../actions/updateReasons.js';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

class Item extends React.Component {
    handleClick = () => {
      const { itemId, onClick } = this.props;
      onClick(itemId);
    }

    render() {
      const { text, active } = this.props;
      return (
        <div id='reasonsId' className={`header ${active && 'active'}`} onClick={this.handleClick}>{text}</div>
      );
    }
  }


class ReasonsHappy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reasons: [],
      redirect: false,
      items: [
        {
          text: "Great Culture",
          id: 1
        },
        {
          text: "Flexible Managers",
          id: 2
        },
        {
          text: "Friendly Co-workers",
          id: 3
        },
        {
          text: "Upbeat Work Environment",
          id: 4
        },
        {
          text: "Work is Appreciated",
          id: 5
        },
        {
          text: "Flexible Work Hours",
          id: 6
        },
        {
          text: "New Opportunities",
          id: 7
        },
      ]
    }
  }

  handleOnClick = () => {
    // some action...
    // then redirect
    var reasons = this.state.reasons
    var items = this.state.items
    var finalOutput = []


    for(var i = 0; i < items.length; i ++){
      if(reasons.indexOf(items[i].id) >= 0)
          finalOutput.push(items[i].text)
        }


    UpdateReasons(finalOutput)
    window.location.assign("/stats");
    // this.setState({redirect: true});
  }

  onItemClick = (id) => {
    var stateless = this.state.reasons;

    if(stateless.indexOf(id) == -1) {
      const reasonsInFunc = []
      reasonsInFunc.push(id)
      this.setState({reasons: this.state.reasons.concat(reasonsInFunc)});
    } else {
      let newState = this.state.reasons
      const index = newState.indexOf(id)
      newState.splice(index, 1);
      this.setState({reasons: newState})
    }
  }


  render() {
    const { items, reasons } = this.state;
    return (
      <div >
        {
          items.map((item) => {
            return (
              <Item
                key={item.id}
                text={item.text}
                itemId={item.id}
                onClick={this.onItemClick}
                active={ item.id === reasons[reasons.indexOf(item.id)]}
              />
            )
          })
        }

        <br></br>

        <p id='submitP'>
            <FontAwesome name="arrow-circle-right" id="arrow" onClick={this.handleOnClick} />
        </p>

      </div>
    );
  }

}



export default ReasonsHappy
