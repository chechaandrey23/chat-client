import React, {Component, useLayoutEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Row, Col, Button} from 'react-bootstrap';

import {sagaStartFetch, sagaStopFetch} from '../redux/saga/socket.io.fetch';

import ModalCreateUser from './ModalCreateUser';
import Messages from './Messages';
import SendMessage from './SendMessage';

export default function Chat() {
  const dispatch = useDispatch();

  const [enteredUsername, setEnteredUsername] = useState(false);

  useLayoutEffect(() => {
    if(enteredUsername) {
      dispatch(sagaStartFetch());
  		return () => {
  			dispatch(sagaStopFetch());
  		}
    }
	}, [enteredUsername]);

  return (<>
    <div className="border border-primary rounded container-sm" style={{minHeight: '99.9vh'}}>
      <div className="border border-primary rounded overflow-auto w-100"
           style={{height: '75vh', marginTop: '1.5vh', marginBottom: '1.5vh'}}>
        <Messages />
      </div>
      <div className="border border-primary rounded w-100" style={{height: '20.27vh', marginBottom: '1.5vh'}}>
        <SendMessage />
      </div>
    </div>
    {!enteredUsername?<ModalCreateUser successed={(username) => {setEnteredUsername(true)}} />:null}
  </>);
}
