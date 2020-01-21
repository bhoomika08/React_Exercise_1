import React, {Component} from 'react';

function FormInput(props) {
  return (
    <div className="formField">
      <label>{props.label}
        <input type={props.inputType} name={props.inputName} onChange={props.onChange}></input>
      </label>
    </div>  
  );
}

class UserForm extends React.Component{
  renderFormLabel(prop) {
    return <FormInput label={prop.labelText} inputType={prop.inputType} inputName={prop.name} onChange={this.props.onChange}/>
  }
  render() {
    return(
      <div className={this.props.className}>
        {this.renderFormLabel({labelText: "Email: ", name: "email", inputType: "text"})}
        {this.renderFormLabel({labelText: "Password: ", name: "password", inputType: "password"})}
      </div>  
    );
  }
}

class NewPassword extends React.Component{
  renderFormLabel(prop) {
    return <FormInput label={prop.labelText} inputType={prop.inputType} inputName={prop.name} onChange={this.props.onChange}/>
  }
  render() {
    return(
      <div className={this.props.className}>
        {this.renderFormLabel({labelText: "Token: ", name: "tokenInput", inputType: "text"})}
        {this.renderFormLabel({labelText: "New Password: ", name: "newPassword", inputType: "password"})}
        {this.renderFormLabel({labelText: "Confirm Password: ", name: "confirmPassword", inputType: "password"})}
        <button type="submit" onClick={this.props.onClick}>Submit</button>
      </div>  
    );
  }
}

function ForgotPasswordLink(props) {
  return (
  <div className="formField">
    <a href="#" onClick={props.onClick}>Forgot Password ?</a>
  </div>  
  );
}

function TokenLabel(props) {
  return <label>Token: {props.tokenVal}</label>
}

function Success(props) {
  return (
    <div className={props.className}>
      <h5>{props.val}</h5>
    </div>
  ); 
}

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmPassword: '',
      tokenInput: '',
      token: '',
      isForm: true,
      isUserForm: true,
      isNewPassword: false,
      isSuccess: false,
      isSuccessDisplay: false,
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  
  clickHandler(event) {
    event.preventDefault();
    this.generateToken();
    this.setState({
      isUserForm: false,
      isNewPassword: true,
    })
  }
  
  generateToken() {
    var rand = () => {
      return Math.random().toString(36).substr(2);
    };
  
    var token = () => {
      let loginToken = rand();
      this.setState({
        token: loginToken,
      });
    };
    token();
  }
  
  submitHandler(event) {
    event.preventDefault();
    if(this.state.tokenInput === this.state.token && this.state.newPassword === this.state.confirmPassword) {
      this.setState({
        isForm: false,
        isSuccess: true,
        isSuccessDisplay: true,
      });
    } else {
      this.setState({
        isSuccess: false,
        isSuccessDisplay: true,
      });
    }
  }
  
  changeHandler(event) {
    const target = event.target;
    const name = target.name;
    this.setState({[name]: target.value});
  }

  render() {
    return (
      <div className="formContainer">
        <form className={this.state.isForm ? "show" : "hide"}>
          <UserForm className={this.state.isUserForm ? "show" : "hide"} onChange={this.changeHandler}/>
          <NewPassword className={this.state.isNewPassword ? "show" : "hide" } onClick={this.submitHandler} onChange={this.changeHandler}/>
          <ForgotPasswordLink onClick={this.clickHandler}/>
          <div>
            <TokenLabel tokenVal={this.state.token}/>
          </div>  
        </form>  
        <Success className={this.state.isSuccessDisplay ? "show" : "hide"} val={this.state.isSuccess ? "Successful" : "Unsuccessful"}/>
      </div>
    );
  }
}

export default UserLogin;
