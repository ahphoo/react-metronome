import React, { Component } from 'react';
import './Metronome.css';
import click1 from './click1.wav'
import click2 from './click2.wav'

class Metronome extends Component {

  // Use state to keep track if on/off, count, etc
  constructor( props ) {
    super( props );

    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4
    };

    // Create Audio objects
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  /*
   * Function Name: handleBpmChange()
   * Function Prototype: void handleBpmChange( event )
   * Description: function used to change the bpm when the slider is moved.
   * Parameters: 
   *   event -- the event object created from user interaction with the slider
   * Side Effects: None. 
   * Error Conditions: None.
   * Return Value: None. ( Technically, undefined )
   * Local variables:
   *   bpm -- used to update the bpm property in Metronome's state.
   */ 
  handleBpmChange = event => {
    const bpm = event.target.value;
    this.setState({ bpm });
  }

  /*
   * Function Name: startStop()
   * Function Prototype: void startStop()
   * Description: Plays the wav file click1.wav
   * Parameters: None.
   * Side Effects: None.
   * Error Conditions: None.
   * Return Value: Undefined
   * Local variables: None.
   */
  startStop = () => {
    this.click1.play();
  }

  render() {

    // Don't really understand the syntax behind this line of code.
    const { playing, bpm } = this.state;

    return (
      <div className = "metronome">
        <div className = "bpm-slider">
          <div>{bpm} BPM</div>
          <input 
            type = "range" 
            min = "60" 
            max = "240" 
            value = {bpm}
            onChange = {this.handleBpmChange}
          />
        </div> 
        <button onClick = { this.startStop }>
          {playing ? 'Stop' : 'Start'}
        </button>
      </div>
    );
  }
}

export default Metronome;
