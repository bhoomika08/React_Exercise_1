import React from 'react';

function Link(props) {
  return <li className="list">
      <a href={props.linkUrl}>{props.linkText}</a>
    </li>
}

class Control extends React.Component {
  onClickHandler = () => {
    if(this.props.paused){
      this.props.start();
    }
    else{
      this.props.stop();
    }
  }
  
	render() {
		return (
				<button className={this.props.paused ? "btn paused" : "btn play"} onClick={this.onClickHandler}>
		    	{this.props.paused ? "play" : "pause"}
		    </button>
		);
	}
}


class NavigationBar extends React.Component {
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
    );
  }
}

export default NavigationBar;