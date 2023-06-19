import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';
import AddAll from '../AddAll/AddAll';

class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0px"}}>
          <h2 style={{margin: "0px"}}>Results</h2>
          <AddAll className="Add-all" onAddAll={this.props.onAddAll} tracks={this.props.searchResults}></AddAll>
        </div>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} />
      </div>
    );
  }
}

export default SearchResults;
