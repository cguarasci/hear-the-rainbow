import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import Popup from '../Popup/Popup';
import Spotify from '../../util/Spotify';
import { HexColorPicker } from "react-colorful";
import logo from './logo.png';

var tinycolor = require("tinycolor2")

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "searchResults": [],
      "playlistName": "New Playlist",
      "playlistTracks": [],
      genres: [],
      tracks: [],
      showPopup: false,
      color: "black",
      artPaletteLink: "https://artsexperiments.withgoogle.com/artpalette/colors/000000",
      playlistLink: "https://open.spotify.com/user/1247363960/playlists"
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.addAllTracks = this.addAllTracks.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.getGenres =this.getGenres(this);
    this.hexToValues = this.hexToValues.bind(this);
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (!tracks.find(trackIndex => trackIndex.id === track.id)) {
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let newTracks = tracks.filter(trackIndex => trackIndex.id !== track.id);
    this.setState({playlistTracks: newTracks});
  }

  addAllTracks(track) {
    let tracks = this.state.playlistTracks;
    if (!tracks.find(trackIndex => trackIndex.id === track.id)) {
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    let tracks = this.state.playlistTracks;
    if(tracks.length && this.state.playlistName) {
      let trackURIs = tracks.map(trackIndex => trackIndex.uri);
      Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        });
        document.getElementById('Playlist-name').value = this.state.playlistName;
      });
    }
  }

  search(searchTerm) {
    Spotify.search(searchTerm, this.hexToValues(this.state.color)).then(results => {
      this.setState({searchResults: results});
    });
  }

  getGenres() {
    Spotify.getGenres().then(results => {
      this.setState({genres: results});
    });
  }

  hexToValues(color) {
    var r = tinycolor(color).toRgb().r
    var g = tinycolor(color).toRgb().g
    var b = tinycolor(color).toRgb().b
    var energy
    var danceability
    var valence
    var loudness
    this.setState({artPaletteLink: 'https://artsexperiments.withgoogle.com/artpalette/colors/' + color.substring(1)})
  
    if (r >= b) {
      energy = r 
      danceability = r
      valence = r
    } else {
      var maxB = 255
      if (b < 50) {
        maxB = (255 + b)
      }
      energy = (maxB - b)
      danceability = (maxB - b)
      valence = tinycolor(color.toString()).getBrightness()
      loudness = (255 - tinycolor(color.toString()).getBrightness())
    }
  
    if (r >= g) {
      loudness = r
    } else {
      var maxG = 255
      if (g < 50) {
        maxG = (255 + g)
      }
      loudness = (maxG - g)
    }
  
    energy = energy / 255
    danceability = danceability / 255
    valence = valence / 255
    loudness = loudness / 255

    return({energy, danceability, valence, loudness})
  }

  state = {
    color: ''
  }

  handleNameInput = e => {
    this.hexToValues(e)
    this.setState({ color: e });
  };

  render() {
    return (
      <div>
        {this.getGenres}
        <div style={Object.assign({}, styles.header)}>
          <img style={styles.logo} src={logo}></img>
        </div>
        <div style={Object.assign({}, styles.app, {background: "linear-gradient(transparent 95%, black), radial-gradient(" + this.state.color + ", " + this.state.color + ", black)"})}>
          <h2 style={styles.descriptionOne}>Choose a color and enter a genre below!</h2>
          <h4 style={styles.descriptionTwo}>We'll help you make a playlist that fits your color mood, that you can add straight to your Spotify account.</h4>
          <div style={styles.genreOptions} >
            <a style={styles.popup} onClick={this.togglePopup.bind(this)}>(Click here to see available genre input options...)</a>
            {this.state.showPopup ? <Popup genres={this.state.genres} closePopup={this.togglePopup.bind(this)}/>: null}
          </div>
          <div style={styles.inputs}>
            <HexColorPicker style={styles.colorPicker} value={this.state.color} onChange={this.handleNameInput} />
            <SearchBar onSearch={this.search} />
          </div>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} onAddAll={this.addAllTracks} />
            <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
          <div style={styles.moreLinks}>
            <p styles={styles.moreLink}>WANT MORE?</p>
            {/* <a className="More-link" href={this.state.playlistLink} target="_blank">SEE YOUR PLAYLIST</a> */}
            <a className="More-link" href={this.state.artPaletteLink} target="_blank">FIND COVER ART...</a>
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  app: {
    height: "100%",
    padding: "0 17% 10% 17%",
    top: 0,
    left: 0,
    backgroundPosition: "top",
    fontFamily: "'Avenir', sans-serif",
    fontWeight: "500",
    color: "#fff",
    textShadow: "0 0 5px black, 0 0 20px black",
  },
  container: {
    paddingLeft: 20,
    color: "white",
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    position: "fixed",
    background: "linear-gradient(rgb(0, 0, 0, 1), rgb(0, 0, 0, 0.8), transparent)",
    zIndex: 4,
    width: "100%"
  },
  logo: {
    height: "150px", 
    marginTop: "10px", 
    marginBottom: "50px"
  },
  descriptionOne: { 
    paddingTop: "210px", 
    marginTop: 0, 
    fontFamily: "'Avenir', sans-serif", 
    textAlign: "center", 
    fontWeight: "500" 
  },
  descriptionTwo: { 
    fontFamily: "'Avenir', sans-serif", 
    textAlign: "center", 
    fontWeight: "100" 
  },
  genreOptions: { 
    display: "flex", 
    justifyContent: "center", 
    marginBottom: "40px" 
  },
  inputs: { 
    display: "flex", 
    justifyContent: "space-around", 
    flexWrap: "wrap" 
  },
  colorPicker: {
    alignContent: "center"
  },
  popup: {
    fontStyle: "italic", 
    fontWeight: "100", 
    textAlign: "center", 
    cursor: "pointer"
  },
  popuptext: {
    visibility: "hidden",
    width: "160px",
    backgroundColor: "#555",
    color: "#fff",
    textAlign: "center",
    borderRadius: "6px",
    padding: "8px 0",
    position: "absolute",
    zIndex: 1,
    bottom: "125%",
    left: "50%",
    marginLeft: "-80px"
  },
  show: {
    visibility: "visible",
    animation: "fadeIn 1s"
  },
  moreLinks: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "20px"
  },
  moreLink: {
    marginTop: "0px"
  }
}

export default App;
