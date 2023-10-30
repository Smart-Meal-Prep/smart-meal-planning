export const EmailInput = (props) => {
    return (
      <div className="Email" style={{width: 344, height: 100, left: props.left, top: props.top, position: 'absolute'}}>
        <div className="Email" style={{left: 0, top: 0, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Literata', fontWeight: '500', letterSpacing: 4, wordWrap: 'break-word'}}>Email:</div>
        <input className="Emailinput" style={{width: 250, height: 34, left: 94, top: 31, position: 'absolute', background: 'white'}} />
      </div>
    )
}

export default EmailInput;