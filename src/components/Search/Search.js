import React from 'react';
import {connect} from 'react-redux';
import {searchMusicAction} from '../../redux/modules/search';
import {authenticate, authenticated} from '../../redux/modules/auth';
import MusicList from '../Music/MusicList';
import './style.css';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  getHash(){
    return window.location.hash ? window.location.hash.split("&").map( arrstr => { 
      let sp = arrstr.split("=");
      return {key: sp[0], value: sp[1]}
    } ) : [];
  }

  fireSearchMusic = evt => {
    this.props.searchMusic(this.state.value);
  }
  
  onChangeValue = evt => {
    this.setState({value: evt.target.value});
  }

  componentDidMount(){
    let hashes = this.getHash();
    if(hashes.length > 0){
      let authToken = hashes.find((val) => val.key === '#access_token')
      if(authToken) this.props.authenticated(authToken.value);
    }
  }

  render = () => (
    <div className='search__form'>
      <label htmlFor="">Search music
        <input value={this.state.value} onChange={this.onChangeValue} />
      </label>
      <button onClick={this.fireSearchMusic}>{this.props.loading ? 'LOADING...' : 'SEARCH'}</button>
      <MusicList></MusicList>
    </div>
  );
}

const mapState = ({search}) => ({
  loading: search.loading
})

const mapDispatchToProps = (dispatch) => ({
  searchMusic: (term) => dispatch(searchMusicAction(term)),
  authenticate: () => dispatch(authenticate()),
  authenticated: (authToken) => dispatch(authenticated(authToken))
})

export default connect(mapState, mapDispatchToProps)(Search);