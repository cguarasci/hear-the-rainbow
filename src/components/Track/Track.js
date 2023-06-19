import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return (
        <a className="Track-action" onClick={this.removeTrack}>-</a>
      );
    } else {
      return (
        <a className="Track-action" onClick={this.addTrack} >+</a>
      );
    }
  }

  addTrack(event) {
    this.props.onAdd(this.props.track);
  }

  removeTrack(event) {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
          <img width="100px" height="100px" alt="Album Cover" src={this.props.track.cover}></img>
          <div display="flex" flex-direction="column" className="Track-details">
            <h3>{this.props.track.name}</h3>
            <p>{this.props.track.artist}</p>
          </div>
          {this.renderAction()}
      </div>
    );
  }
}

export default Track;
