import ReactDOM from 'react-dom'
import React from 'React'


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
