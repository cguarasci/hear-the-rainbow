import React from 'react';
import './AddAll.css';

class AddAll extends React.Component {
  constructor(props) {
    super(props);
    this.addAllTracks = this.addAllTracks.bind(this);
  }

  renderActionAll() {
    return (
    <a className="Add-all-tracks" onClick={this.addAllTracks}>Add All +</a>
    );
  }

  addAllTracks(event) {
    this.props.tracks.map(track => this.props.onAddAll(track))
  }

  render() {
    return (
        <div>
            {this.renderActionAll()}
        </div>
    );
  }
}

export default AddAll;