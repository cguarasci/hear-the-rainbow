import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "searchTerm": ""
    };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.target.setSelectionRange(0, event.target.value.length);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter' && event.target.value) {
      this.search();
    }
  }

  handleTermChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  search() {
    this.state.searchTerm && this.props.onSearch(this.state.searchTerm);
  }

  render() {
    return (
      <div className="SearchBar">
        <input id="search-input" placeholder="Enter a Genre" onChange={this.handleTermChange} onKeyPress={this.handleKeyPress} onClick={this.handleClick} />
        <a onClick={this.search}>GENERATE PLAYLIST</a>
      </div>
    );
  }
}

export default SearchBar;
