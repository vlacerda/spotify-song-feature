import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';
const MusicItem = ({music}) => (
  <Link to={`/detail/${music.id}`}>
    <div className='music__item'>
      <img className='music__item__image' src={music.album.images[2].url} alt={music.name}/>
      <h4  className='music__item__name'>{music.name}</h4>
      <small className='music__item__album'>{music.album.name}</small>
    </div>
  </Link>
);

export default MusicItem;