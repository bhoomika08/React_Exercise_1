import React from 'react';
import {formatTime} from './helper.js'

const pomodoroData = {
  pomodoroText: "Pomodoro",
  shortBreakText: "Short Break",
  longBreakText: "Long Break",
  loopText: "Loop",
  pomodoroType:'pomodoro',
  shortBreakType:'shortBreak',
  longBreakType:'longBreak',
  loopType: "loop",
}

function Button(props) {
  return (
    <li className="list">
      <button onClick={props.onClick} value={props.type}>{props.buttonText}</button>
    </li>
  );
}

class TimerOption extends React.Component {
  renderButton(buttonText, timerType) {
   return <Button 
    buttonText={buttonText}
    onClick={this.props.onClick}
    type={timerType}/>
  }
  render() {
    return (
      <div>
        <ul className="links">
          {this.renderButton(this.props.pomodoroData.pomodoroText, this.props.pomodoroData.pomodoroType)}
          {this.renderButton(this.props.pomodoroData.shortBreakText, this.props.pomodoroData.shortBreakType)}
          {this.renderButton(this.props.pomodoroData.longBreakText, this.props.pomodoroData.longBreakType)}
          {this.renderButton(this.props.pomodoroData.loopText, this.props.pomodoroData.loopType)}
        </ul>
      </div>
    );
  }
}

function Countdown(props) {
	return (
		<h1>
			{formatTime(props.time)}
		</h1>
	);
};

function Reset(props) {
	return (
		<button onClick={props.onClickReset} className="btn reset">
			Reset
		</button>
	);
};

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

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: '',
      startTime: '',
      isLoopCounter: false,
      isPomodoroPassed: false,
      paused: true,
      counters: {
        pomodoro: {
          initValue: 1500,
          name: 'pomodoro duration',
        },
        shortBreak: {
          initValue: 300,
          name: 'short break duration',
        },
        longBreak: {
          initValue: 600,
          name: 'long break duration',
        }
      },
      currentCounter: '',
      currentCounterInitValue: 0,
      pomodorosPassed: 0,
      isCountingDown: false,
    };
    this.tick = this.tick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.reset = this.reset.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(event) {
    let targetButton = event.target.value;
    if(targetButton === `${pomodoroData.pomodoroType}`) {
      this.setState({
        timer: this.state.counters.pomodoro.initValue,
        startTime: this.state.counters.pomodoro.initValue,
      });
    }
    else if (targetButton === `${pomodoroData.shortBreakType}`) {
      this.setState({
        timer: this.state.counters.shortBreak.initValue,
        startTime: this.state.counters.shortBreak.initValue,
      });  
    }
    else if (targetButton === `${pomodoroData.longBreakType}`) {
      this.setState({
        timer: this.state.counters.longBreak.initValue,
        startTime: this.state.counters.longBreak.initValue,
      });
    }
    else if (targetButton === `${pomodoroData.loopType}`) {
      this.setState({
        isLoopCounter: true,
        currentCounter: 'pomodoro',
        timer: this.state.counters.pomodoro.initValue,
        startTime: this.state.counters.pomodoro.initValue,
      });
    }
  }

  handleLoop() {
    if(this.state.timer >= 1) {
      this.setState({ timer: this.state.timer - 1 });
    } else {
      this.setPomodorosPassed();
      this.setNextCounter();
    }
  }

  setPomodorosPassed() {
    let pomodorosPassed = this.state.pomodorosPassed;
    if(this.state.currentCounter === 'pomodoro') {
      pomodorosPassed++;
      this.setState({pomodorosPassed: pomodorosPassed});
    }
  }

  setNextCounter() {
    let nextCounter = '';
    if(this.state.currentCounter === 'pomodoro') {
      nextCounter = this.state.pomodorosPassed % 4 === 0 ? 'longBreak' : 'shortBreak';
    } else {
      nextCounter = 'pomodoro';
    }
    this.setState({
      currentCounter: nextCounter,
      currentCounterInitValue: this.state.counters[nextCounter].initValue,
      timer: this.state.currentCounterInitValue,
      startTime: this.state.currentCounterInitValue,
    });
  }

  tick = () => {
    if(this.state.isLoopCounter) {
      this.handleLoop();
    }
    else if(!this.state.timer) {
      clearInterval( this.interval)
    } else {
      this.setState({ timer: this.state.timer - 1 });
    }
  }

	startTimer = () => {
    this.interval = setInterval(this.tick,1000);
    this.setState({ paused: false,
    isCountingDown: true });
	}

  stopTimer = () => {
  	clearInterval( this.interval );
    this.setState({ 
      paused: true,
      isCountingDown: false 
    });
	}

  reset = () => {
    this.setState({ 
    timer: this.state.startTime,
    paused: true,
    isCountingDown:false,
    });
    clearInterval( this.interval );
  }

  render() {
    return (
      <div className="timerContainer">
        <h5>Pomodoro Clock</h5>
        <TimerOption pomodoroData={pomodoroData} onClick={this.handleClick}/>
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

export default PomodoroClock;