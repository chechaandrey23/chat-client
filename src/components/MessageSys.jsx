import React, {Component, useLayoutEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Row, Col, Button, Spinner} from 'react-bootstrap';

export default function MessageSys(props) {

  return (<>
    {props.type == 'enter'?<>
      <Row className="align-items-center justify-content-center bg-primary text-white mt-1 pt-1 pb-1">
        <Col md='auto'>
          <span className="fw-bold">{props.username}</span><span> entered to chat</span>
        </Col>
      </Row>
    </>:<>
      <Row className="align-items-center justify-content-center bg-secondary text-white mt-1 pt-1 pb-1">
        <Col md='auto'>
          <span className="fw-bold">{props.username}</span><span> left from chat</span>
        </Col>
      </Row>
    </>}
  </>)
}
