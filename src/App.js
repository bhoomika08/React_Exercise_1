import React from 'react';
import './App.css';

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

class FormMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({[name]: target.value});
  }

  handleSubmit(event) {
    this.setState({message: ''});
    alert('Message Entered: ' + this.state.message);
    event.preventDefault();
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <label>
          Message:
          <div>
            <textarea name="message" value={this.state.value} onChange={this.handleChange}></textarea>
          </div>
        </label> 
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function Link(props) {
  return <li className="list">
      <a href={props.linkUrl}>{props.linkText}</a>
    </li>
}

class Navigation extends React.Component {
  renderLink(linkInfo) {
    return <Link
      linkText = {linkInfo.text}
      linkUrl = {linkInfo.url}
    />
    }

    render() {
      return (
        <div className="navigationBar">
          <ul className="links">
            {/* creating Google Link */}
            {this.renderLink(this.props.links.google)}

            {/* creating React Link */}
            {this.renderLink(this.props.links.react)}
          </ul>
        </div>
      )
    }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Navigation links={this.props.data.links}/>
        <JSXElement buttonInfo={this.props.data.buttonInfo}/>
        <FormMessage />
      </div>
    );
  }
}

export default App;
