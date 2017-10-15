import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../../redux/modules/auth';
import './Authenticate.css';
const mapDispatch = (dispatch) => ({
  authenticate: () => dispatch(authenticate())
});

export const Authenticate = (props) => (<button className='auth-btn' onClick={props.authenticate}>AUTHENTICATE</button>)

export default connect(null, mapDispatch)(Authenticate);
