import React from 'react';
import {formatTime} from './helper.js'

function Countdown(props) {
	return (
		<h1>
			{formatTime(props.time)}
		</h1>
	);
};

// Resets the timer on click and clear the setInterval
function Reset(props) {
	return (
		<button onClick={props.onClickReset} className="btn reset">
			Reset
		</button>
	);
};

// Pause/ play button
class Control extends React.Component {

  onClickHandler = () => {
    if(this.props.paused){
      this.props.start();
    }
    else{
      this.props.stop();
    }
  }
  
	render() {
		return (
				<button className={this.props.paused ? "btn paused" : "btn play"} onClick={this.onClickHandler}>
		    	{this.props.paused ? "play" : "pause"}
		    </button>
		);
	}
}

class TimerInput extends React.Component {
  render() {
    return (
     <div>
        <h3>Input your desired time</h3>
        <input type="number" value={this.props.time} onChange={this.props.handleTimeChange} required />
     </div>
    );
  }
}

class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
      startTime: '', 
      timer: '',
      paused: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.tick = this.tick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.reset = this.reset.bind(this);
	}
  
  tick = () => {
    if(!this.state.timer) {
      clearInterval( this.interval)
    } else {
      this.setState({ timer: this.state.timer - 1 });
    }
  }
  
	startTimer = () => {
		this.interval = setInterval(this.tick,1000);
    this.setState({ paused: false });
	}
  
  stopTimer = () => {
  	clearInterval( this.interval );
    this.setState({ paused: true });
	}
  
  reset = () => {
  	this.setState({ timer: `${this.state.startTime}`, paused: true });
    clearInterval( this.interval );
  }
  
  handleChange(event) {
    this.setState({
      startTime: event.target.value,
      timer: event.target.value,
    });
  }
  
	render() {
		return (
			<div className="timerContainer">
        <h5>Timer</h5>
        <TimerInput time={this.state.time} handleTimeChange={this.handleChange}/>
				<Countdown time={this.state.timer} />
        <Control
          paused={this.state.paused} 
          start={this.startTimer} 
          stop={this.stopTimer} 
        />
        <Reset onClickReset={this.reset}/>
			</div>
		);
	}
}

export default Timer;