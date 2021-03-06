import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const data = {
  buttonInfo: {
    loginButtonText: 'Login',
    signupButtonText: 'Sign Up',
    loginCustomText: 'You have clicked Login button',
    signupCustomText: 'You have clicked SignUp button',
  },
  links: {
    google: {
      text: "Google",
      url: "https://www.google.com/",
    },
    react: {
      text: 'React',
      url: 'https://reactjs.org/',
    }
  },
  icon: {
    likedIconUrl: 'https://i.imgur.com/6cjqKy3.png', 
    unlikedIconUrl: 'https://i.imgur.com/DYHVKQm.png',
  }
  
};

ReactDOM.render(
  <App data={data}/>,
  document.getElementById('my-jsx-element')
);
