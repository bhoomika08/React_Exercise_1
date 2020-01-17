import React from 'react';

function Button(props) {
  return (
    <button onClick = {() => alert(`${props.onClickMessage}`)}>
      { props.buttonText }
    </button>
  );
}

class JSXElement extends React.Component {
  renderButton(text, message) {
    return <Button
      buttonText = {text}
      onClickMessage = {message}
    />
    }
  render() {
    return (
      <div className="buttonDiv">
        {/* Creation of Login Button */}
        {this.renderButton(this.props.buttonInfo.loginButtonText, this.props.buttonInfo.loginCustomText)}

        {/* Creation of Sign Up Button */}
        {this.renderButton(this.props.buttonInfo.signupButtonText, this.props.buttonInfo.signupCustomText)}
      </div>
    );
  }
}

export default JSXElement;