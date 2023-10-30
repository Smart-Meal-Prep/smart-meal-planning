export const Passwordinput = (props) => {
    return (
      <div className="Password" style={{width: 392, height: 100, left: props.left, top: props.top, position: 'absolute'}}>
        <div className="Password" style={{left: 0, top: 0, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Literata', fontWeight: '500', letterSpacing: 4, wordWrap: 'break-word'}}>Password:</div>
        <input className="Passwordinput" style={{width: 250, height: 34, left: 142, top: 33, position: 'absolute', background: 'white'}} />
      </div>
    );
}

export default Passwordinput;