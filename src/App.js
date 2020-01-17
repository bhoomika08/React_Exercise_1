import React from 'react';
import './App.css';
import JSXElement from './jsxElement.js';
import FormMessage from './formMessage.js';
import NavigationBar from './navigationBar';
import LikeButton from './like_unlike.js';
import Timer from './timer.js';


class App extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar links={this.props.data.links}/>
        <JSXElement buttonInfo={this.props.data.buttonInfo}/>
        <FormMessage />
        <LikeButton icon={this.props.data.icon}/>
        <Timer />
      </div>
    );
  }
}

export default App;
