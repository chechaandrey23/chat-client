import React, {Component, useLayoutEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Row, Col, Button} from 'react-bootstrap';

import Message from './Message';
import MessageAdding from './MessageAdding';
import MessageSys from './MessageSys';

export default function Messages() {
  const messages = useSelector((state) => state.chats.dataArray);

  const addingMessage = useSelector((state) => state.chats.addingMessage);

  //const addUser = useSelector((state) => state.chats.addUser);
  //const leaveUser = useSelector((state) => state.chats.leaveUser);

  return (<>
    <Container style={{height: '74.41vh'}}>
      {messages.map((item, index) => {
        if(item.type) {
          return (<><MessageSys key={Date.now()}
                                type={item.type}
                                username={item.username}/></>)
        } else {
          return (<><Message key={item.id}
                             username={item.username}
                             message={item.message}
                             date={item.date}/></>)
        }
      })}
      {addingMessage.map((item, index) => {
        return (<><MessageAdding key={Date.now()}
                                 message={item.message}/></>)
      })}
      {(messages.length < 1 && addingMessage.length < 1)?<Row className="align-items-center justify-content-center" style={{height: '74.81vh'}}>
        <Col md='auto'>
          <h5>{'chat contains no messages!'}</h5>
        </Col>
      </Row>:null}
    </Container>
  </>)
}
