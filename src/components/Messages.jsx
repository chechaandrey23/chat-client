import React, {Component, useLayoutEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Row, Col, Button} from 'react-bootstrap';

import Message from './Message';
import MessageAdding from './MessageAdding';
import MessageSys from './MessageSys';

export default function Messages() {
  const messages = useSelector((state) => state.chats.dataArray);

  const addingMessage = useSelector((state) => state.chats.addingMessage);

  const bottomRef = useRef(null);

  useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView({block: "center", behavior: "smooth"});
  }, [messages, addingMessage]);

  return (<>
    <Container style={{height: '74.17vh'}}>
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
      {(messages.length < 1 && addingMessage.length < 1)?<Row className="align-items-center justify-content-center"
                                                              style={{height: 'inherit'}}>
        <Col sm='auto'>
          <h5>{'chat contains no messages!'}</h5>
        </Col>
      </Row>:null}
      <Row ref={bottomRef}><Col></Col></Row>
    </Container>
  </>)
}
