import React, { useState, useEffect} from 'react';
import { useButtons } from './hooks/useButtons';
import { formSchema } from './validation';
import axios from 'axios';
import * as yup from 'yup';
// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [initialDataObject, setInitialDataObject] = useState({
      x: 2,
      y: 2,
      steps: initialSteps,
      email: initialEmail
    })
  const [left, right, up, down, reset, newIndex, eMessage, setEMessage, dataObject, setDataObject] = useButtons(initialIndex, initialDataObject, setInitialDataObject);
  
  

   function emailChange (e) {
    const { value } = e.target;
    setDataObject({ ...dataObject, email: value });
   }
  
  async function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    axios.post('http://localhost:9000/api/result', dataObject)
      .then(res => {
        setEMessage(res.data.message)
        reset(true);
      }).catch((err) => {
        setEMessage(err.response.data.message)
      })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({dataObject.x}, {dataObject.y})</h3>
        <h3 id="steps">You moved {dataObject.steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === newIndex ? ' active' : ''}`}>
              {idx === newIndex ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{eMessage}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={left}>LEFT</button>
        <button id="up" onClick={up}>UP</button>
        <button id="right" onClick={right}>RIGHT</button>
        <button id="down" onClick={down}>DOWN</button>
        <button id="reset" onClick={() => reset(false)}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={emailChange} value={dataObject.email}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
