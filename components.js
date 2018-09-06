
class Pomodoro extends React.Component{
  constructor(props){
    super(props);
   this.state={
      breakLength: 5,
      sessionLength: 25,
      sessionTimer: 1500,
      breakTimer: 300,
      timer: 1500,
      play: false,
      currentStatus: 'Session'
    }
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.playPause = this.playPause.bind(this);
    this.refresh = this.refresh.bind(this);
    this.convertSeconds = this.convertSeconds.bind(this);
    this.phaseChange = this.phaseChange.bind(this);
    this.time = this.time.bind(this);
    this.buzzer = this.buzzer.bind(this);
  }
  time(){
      this.interval = setInterval(()=>{
            if(this.state.timer <= 0){
       this.phaseChange()
            }
        this.setState({
        timer: this.state.timer -1,
        })
      }, 1000)
  }
  convertSeconds(s){
    let min = Math.floor(s / 60);
    let sec = s % 60;
    if (min < 10) {min = '0'+min}
    if (sec < 10) {sec = '0'+sec}
    return min + ':' + sec
  }
  buzzer(){
    if(this.state.timer <= 0){
      this.audioBeep.play()
    }
  }
  phaseChange(){
    this.audioBeep.play()
    this.state.currentStatus === 'Break' ?
      this.setState({
        timer: this.state.sessionTimer+1,
        currentStatus: 'Session',
      })
    :
      this.setState({
        timer: this.state.breakTimer+1,
        currentStatus: 'Break'
      })
  }
  playPause(){
    if(!this.state.play){
      this.time()
      this.setState({
        play: true
      })
    }
    else{
      clearInterval(this.interval);
      this.setState({
        play: false
      })
    }
  }
  refresh(){
    clearInterval(this.interval)
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      sessionTimer: 1500,
      breakTimer: 300,
      timer: 1500,
      currentStatus: 'Session',
      play: false
    })
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }
  incrementBreak(){
    if(this.state.breakLength === 60){
      this.setState({
        breakLength: this.state.breakLength
      })
    }
    else{
    let number = Number(this.state.breakLength)
    let incBreak = eval(number + 1);
    this.setState({
      breakLength: incBreak,//.toString(),
      breakTimer: this.state.breakTimer + 60
    })
   }
  }
  decrementBreak(){
       if(this.state.breakLength === 1){
       this.setState({
         breakLength: this.state.breakLength
       })
     }
      else{
    let decBreak = eval(this.state.breakLength - 1);
    this.setState({
      breakLength: decBreak,//.toString(),
      breakTimer: this.state.breakTimer - 60
    })
   }
  }
  incrementSession(){
    if(this.state.sessionLength === 60){
      this.setState({
        sessionLength: this.state.sessionLength,
      })
    }
    else{
    let number = Number(this.state.sessionLength)
    let incSession = eval(number + 1);
    this.setState({
      sessionLength: incSession,//.toString(),
      sessionTimer: this.state.sessionTimer + 60,
      timer: this.state.timer + 60
    })
   }
  }
    decrementSession(){
     if(this.state.sessionLength === 1){
       this.setState({
         sessionLength: this.state.sessionLength
       })
     }
      else{
    let decSession = eval(this.state.sessionLength - 1);
    this.setState({
      sessionLength: decSession,//.toString(),
      sessionTimer: this.state.sessionTimer - 60,
      timer: this.state.timer -60
    })
   }
  }
  render(){
    return(
    <div className="wrapper">
    <div className='lengths'>
<BreakLength
  incrementBreak={this.incrementBreak}
  decrementBreak={this.decrementBreak}
  breakLength={this.state.breakLength}
  />
<SessionLength
  incrementSession={this.incrementSession}
  decrementSession={this.decrementSession}
  sessionLength={this.state.sessionLength}
  />
      </div>
        <div className='sessionContainer'>
          <h1 id='timer-label'>{this.state.currentStatus}</h1>
          <div>
          <div id='time-left'>{this.convertSeconds(this.state.timer)}</div>
          </div>
          <br/>
          <div>
          <button onClick={this.playPause} id='start_stop' className='icono-next'>play</button><button onClick={this.refresh} id='reset' className='icono-sync'>reset</button>
          </div>
        </div>
        <audio id='beep' ref={(audio) => { this.audioBeep = audio; }} src='https://www.freesfx.co.uk/rx2/mp3s/5/16902_1461333025.mp3' />
      </div>
    )
  }
}

class BreakLength extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className='breakLabel'>
        <div id='break-label' value={this.props.breakLength}>Break Length</div>
        <button id='break-increment'className='icono-caretUpCircle' onClick={this.props.incrementBreak}>UP</button>
        <span id='break-length'value='5'>{this.props.breakLength}</span>
        <button id='break-decrement' className='icono-caretDownCircle' onClick={this.props.decrementBreak}>DOWN</button>
      </div>
    )
  }
}

class SessionLength extends React.Component{
  constructor(props){
    super(props);

  }
  render(){
    return(
      <div className='sessionLabel'>
            <div id='session-label' value={this.props.sessionLength}>Session Length</div>
        <button id='session-increment'className='icono-caretUpCircle'onClick={this.props.incrementSession}>UP</button>
        <span id='session-length'value={this.props.sessionLength}>{this.props.sessionLength}</span>
        <button id='session-decrement' className='icono-caretDownCircle'onClick={this.props.decrementSession}></button>
      </div>
    )
  }
}

ReactDOM.render(<Pomodoro />, document.getElementById('root'));
