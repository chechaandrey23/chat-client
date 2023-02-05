import React, {Component, useLayoutEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Row, Col, Button} from 'react-bootstrap';

export default function Message(props) {
  const date = new Date(props.date);

  return (<>
    <Row className="align-items-center bg-light text-dark mt-1">
      <Col sm='3'>
        <Row className="justify-content-center fw-bold">
          <Col sm='auto'>
            <span>{props.username}</span>
          </Col>
        </Row>
        <Row className="justify-content-center fw-light">
          <Col sm='auto'>
            <span>{(date.getHours()+'').padStart(2, '0')}</span>:<span>{(date.getMinutes()+'').padStart(2, '0')}</span>:<span>{(date.getSeconds()+'').padStart(2, '0')}</span>
          </Col>
        </Row>
      </Col>
      <Col sm='9'>
        <span>{props.message}</span>
      </Col>
    </Row>
  </>)
}
