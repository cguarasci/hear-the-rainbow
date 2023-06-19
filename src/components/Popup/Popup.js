import React from 'react';
import './Popup.css';

class Popup extends React.Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <h2 style={{color: "black", margin: 0, textShadow: "0 0 0 black"}}>Available Genres:</h2>
            <h5 style={{color: "black", margin: 0, textShadow: "0 0 0 black"}}>(Copy the name of the one you'd like to select.)</h5>
            <dl style={{overflow: "auto", color: "black", fontWeight: "100", textShadow: "0 0 0 black"}}>
                {this.props.genres.map(genre => <dt>{genre}</dt>)}
            </dl>
            <button onClick={this.props.closePopup}>Close</button>
          </div>
        </div>
      );
    }
  }

export default Popup;