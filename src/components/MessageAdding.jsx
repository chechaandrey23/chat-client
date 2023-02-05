import React, {Component, useLayoutEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Row, Col, Button, Spinner} from 'react-bootstrap';

export default function MessageAdding(props) {

  return (<>
    <Row className="align-items-center bg-warning text-dark mt-1 pt-1 pb-1">
      <Col sm='3'>
        <Row style={{height: '100%'}} className="justify-content-center align-items-center">
          <Col sm="auto">
            <Spinner animation="border" variant={'light'} />
          </Col>
        </Row>
      </Col>
      <Col sm='9'>
        <span>{props.message}</span>
      </Col>
    </Row>
  </>)
}
