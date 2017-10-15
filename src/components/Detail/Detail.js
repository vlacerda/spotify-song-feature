import {getFeatureAction} from '../../redux/modules/detail';
import React from 'react';
import {connect} from 'react-redux';


class Detail extends React.Component{
  // console.log(props);

  componentDidMount(){
    const match = this.props.match;
    this.props.getDetail(match.params.id)
  }

  render(){
    const detail = this.props.detail;
    const song = this.props.song;
    return (
      <div>
        {song 
          ? <div>
              <img src={song.album.images[1].url} alt=""/>
              <h4>{song.name}</h4>
            </div>
          : null
        }
        <ul>
          <li>Danceability: {Math.round(detail.danceability*100)}%</li>
          <li>Energy: {Math.round(detail.energy*100)}%</li>
          <li>Speechiness: {Math.round(detail.speechiness*100)}%</li>
          <li>Acousticness: {Math.round(detail.acousticness*100)}%</li>
          <li>Instrumentalness: {Math.round(detail.instrumentalness*100)}%</li>
          <li>Liveness: {Math.round(detail.liveness*100)}%</li>
          <li>Tempo: {detail.tempo}bpm</li>
        </ul>
      </div>
    );
  }
}

const mapState = ({detail, search}) => ({
  loading: detail.loading,
  detail,
  song: search.selectedSong
})

const mapDispatchToProps = (dispatch) => ({
  getDetail: (id) => dispatch(getFeatureAction(id))
})

export default connect(mapState, mapDispatchToProps)(Detail);
