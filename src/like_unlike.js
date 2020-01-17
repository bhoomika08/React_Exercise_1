import React from 'react';

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState({
      isLiked: !this.state.isLiked,
    });
  }
  
  render() {
    const label = "Like";
    return (
      <div className="iconContainer pointer" onClick={this.handleClick}>
        <img className="align-vertical" src={`${this.state.isLiked ? `${this.props.icon.likedIconUrl}` : `${this.props.icon.unlikedIconUrl}`}`} alt='Like/Unlike Icon'/>
        <span className={`${this.state.isLiked ? "liked" : "unliked"}`}>{label}</span>
      </div>
    );
  }
}

export default LikeButton;
