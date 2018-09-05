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
