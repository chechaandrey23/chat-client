import React, {Component, useLayoutEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Row, Col, Button, Form, Toast} from 'react-bootstrap';

import {sagaAddMessage} from '../redux/saga/socket.io.chat';
import {setErrorAddMessage} from '../redux/chats.js';

import ModalUpdateUsername from './ModalUpdateUsername';

import * as Yup from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

const validationSchemaSend = Yup.object().shape({
	message: Yup.string().required('Message is required')
						.min(1, 'Message must be minimum 1 characters')
						.max(256, 'Message must be maximum 256 characters')
});

export default function SendMessage() {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.chats.username);

  //const addingMessage = useSelector((state) => state.chats.addingMessage);
	const errorAddMessage = useSelector((state) => state.chats.errorAddMessage);

  const {register, handleSubmit, setValue, control, formState: {errors}} = useForm({resolver: yupResolver(validationSchemaSend)});

  useLayoutEffect(() => () => {dispatch(setErrorAddMessage(false))}, []);

  const [showModalUpdateUsername, setShowModalUpdateUsername] = useState(false);

  return (<>
    <Container>
      <Row className="align-items-center" style={{height: '20vh'}}>
        <Col sm='9'>
          <Row className="align-items-center" style={{height: '4vh'}}>
            <Col sm='1' className="align-self-end" style={{textAlign: 'end'}}>
              <span><Button variant="primary"
                            onClick={() => {setShowModalUpdateUsername(true)}}
                            size="sm"><span>e</span></Button></span>
            </Col>
            <Col sm='auto' className="align-self-center" style={{verticalAlign: 'center'}}>
              <span className="h4">{username}</span>
            </Col>
          </Row>
          <Row className="align-items-center"  style={{height: '16vh'}}>
            <Col sm='12'>
              <Form id="hook-send-form" onSubmit={handleSubmit((data) => {
                console.log(data);
                dispatch(sagaAddMessage(data.message));
                setValue('message', '');
              })}>
                <Form.Group as={Row} controlId="formBasicAddMessage">
                  <Col sm="12">
                    <Form.Control {...register("message")} as="textarea"
                                  placeholder={'Enter You Message'}
                                  isInvalid={!!errors.message}
                                  style={{height: '10vh'}}/>
                    <Form.Control.Feedback type="invalid" style={{paddingLeft: '5px'}}>
                      {errors.message?.message}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Col>
        <Col sm='3'>
          <Button variant="primary" type="submit" form="hook-send-form" style={{width: '100%', height: '17vh'}}><h1>send</h1></Button>
        </Col>
      </Row>
    </Container>
    {showModalUpdateUsername?<ModalUpdateUsername closed={() => {setShowModalUpdateUsername(false);}}
                                                  successed={(newUsername) => {
                                                    setShowModalUpdateUsername(false);
                                                  }}/>:null}
  </>)
}
