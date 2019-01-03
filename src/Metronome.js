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

    // Determine if input is from slider or text input
    const bpm = event.currentTarget.value ? event.currentTarget.value : this.refs.myInput.value; 

    // Update text field
    document.getElementById('input-box').value = bpm;

    if ( this.state.playing ) {
      
      // Stop the old timer and start a new one
      clearInterval( this.timer );
      this.timer = setInterval( this.playClick, ( 60 / bpm ) * 1000 );

      // Set the new BPM, and reset the beat counter
      this.setState({ 
        count: 0,
        bpm 
      });
    }
    else {
      // Otherwise, just update the BPM
      this.setState({ bpm });
    }
  };

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
    
    if ( this.state.playing ) {
      
      // Stop the timer
      clearInterval( this.timer );

      this.setState({
        playing: false
      });
    } 
    else {
      
      // Start timer with the current BPM
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );

      this.setState(
        {
          count: 0,
          playing: true
          // Play a click "immediately" (after setState finishes)
        },
        this.playClick
      );
    }
  };

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    // The first beat will have a different sound than the others
    if ( count % beatsPerMeasure === 0 ) {
      this.click2.play();
    }
    else {
      this.click1.play();
    }

    // Keep track of which beat we're on
    this.setState( state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  };

  render() {

    // Don't really understand the syntax behind this line of code.
    const { playing, bpm } = this.state;

    return (
      <div className = "metronome">
        <form>
          <label htmlFor = "submit"> BPM </label> 
          <div className = "bpm-input">
            {/* Used a ref to tell handleBpmChange input is from button.
                Also, used defaultValue to make text box input modifiable
              */}
            <input type = "text" id = "input-box" ref = "myInput" defaultValue = { bpm } />
            <button type = "button" onClick = { this.handleBpmChange }>{ 'Submit' }</button>
          </div>
        </form>
        <div className = "bpm-slider">
          <input 
            type = "range"
            id = "slider"
            min = "60" 
            max = "300" 
            value = { bpm }
            onChange = { this.handleBpmChange }
          />
        </div> 
        <button onClick = { this.startStop }>
          { playing ? 'Stop' : 'Start' }
        </button>
      </div>
    );
  }
}

export default Metronome;
