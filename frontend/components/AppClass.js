import React from 'react'
import axios from 'axios'
import { formSchema } from './validation'
// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialX = 2;
const initialY = 2;
const initialState = {
  x: initialX,
  y: initialY,
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}


export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor() {
    super();
    this.state = {
      ...initialState
    }
  }
  handleMove = (e) => {
    let { x, y, index, steps, email, message } = this.state;
    //left
    if (e.target.id === 'left' && index != 0 && index != 3 && index != 6) {
      index -= 1;
      steps++;
      x -= 1;
      //handle message
        message = ''
    } else if (e.target.id === 'left') {
        message = 'cant move left'
    }
    //right
    if (e.target.id === 'right' && index != 2 && index != 5 && index != 8) {
      index += 1;
      steps++;
      x += 1;
      //handle message
        message = ''
    } else if (e.target.id === 'right') {
        message = 'cant move right'
    }
    //up
    if (e.target.id === 'up' && index > 2) {
      index -= 3;
      steps++;
      y -= 1;
      //handle message
        message = ''
    } else if (e.target.id === 'up') {
        message = 'cant move up'
    }
    //down
    if (e.target.id === 'down' && index < 6) {
      index += 3;
      steps++;
      y += 1;
      //handle message 
        message = ''
    } else if (e.target.id === 'down') {
        message = 'cant move down'
    }
    //reset
    if (e.target.id === 'reset') {
      index = initialIndex;
      steps = initialSteps;
      x = initialX;
      y = initialY;
      email = initialEmail;
      message = initialMessage;
    }
    //add to state on every button click
    this.setState({
      ...this.state,
      x,
      y,
      index,
      steps,
      email,
      message
    })
  }
  //handle email state
  emailChange = (e) => {
    this.setState({ ...this.state, email: e.target.value });
  }
  //handle submit
  onSubmit = (e) => {
    e.preventDefault();
    //prep data
    let dataObj = {
      x: this.state.x,
      y: this.state.y,
      steps: this.state.steps,
      email: this.state.email
    }
        //submit to server on success
        axios.post('http://localhost:9000/api/result', dataObj)
          .then((res) => {
            this.setState({ ...this.state, email: '', message: res.data.message });
          })
          .catch((err) => {
            
            this.setState({...this.state, message: err.response.data.message})
          })
  }
  
  
  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y})</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.handleMove} id="left">LEFT</button>
          <button onClick={this.handleMove} id="up">UP</button>
          <button onClick={this.handleMove} id="right">RIGHT</button>
          <button onClick={this.handleMove} id="down">DOWN</button>
          <button onClick={this.handleMove} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.emailChange} value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
