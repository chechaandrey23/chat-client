import React, {Component, useLayoutEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Row, Col, Button, Form, Alert, Modal, Spinner} from 'react-bootstrap';

import {sagaUpdateUsername} from '../redux/saga/socket.io.chat';
import {setErrorUpdateUsername} from '../redux/chats.js';

import * as Yup from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

const validationSchemaModal = Yup.object().shape({
	username: Yup.string().required('Username is required')
						.min(5, 'Username must be minimum 5 characters')
						.max(15, 'Username must be maximum 15 characters')
});

export default function ModalUpdateUsername(props) {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.chats.username);
	const updatingUsername = useSelector((state) => state.chats.updatingUsername);
	const errorUpdateUsername = useSelector((state) => state.chats.errorUpdateUsername);

	const {register, handleSubmit, setValue, control, formState: {errors}} = useForm({resolver: yupResolver(validationSchemaModal)});

  useLayoutEffect(() => () => {dispatch(setErrorUpdateUsername(false))}, []);

  const countRender = useRef(0);
	useLayoutEffect(() => {
		countRender.current++;
		if(typeof props.successed === 'function' && countRender.current > 1) {
			props.successed.call(null, username);
		}
	}, [username]);

  return (<>
    <Modal show={true} onHide={props.closed || null} animation={false} centered>
			<Modal.Header closeButton>
				<Modal.Title>{'Modal Update Username'}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
        {updatingUsername?<Row style={{height: '100%'}} className="justify-content-center align-items-center">
				<Col sm="auto">
					<Spinner animation="border" variant={'warning'} />
				</Col>
			</Row>:null}
        {errorUpdateUsername?<Alert variant="danger" onClose={() => {dispatch(setErrorUpdateUsername(false))}} dismissible>
					<Alert.Heading>{'Server Error Message'}</Alert.Heading>
					<p>{errorUpdateUsername.message}</p>
				</Alert>:null}
        <Form id="hook-modal-form" onSubmit={handleSubmit((data) => {
					console.log(data);
					dispatch(sagaUpdateUsername(data.username));
				})}>
          <Form.Group as={Row} className="mb-3" controlId="formBasicUpdateUsername">
            <Form.Label column sm="2">{'Username'}</Form.Label>
            <Col sm="10">
              <Form.Control {...register("username")} type="text" placeholder={'Enter Username'} isInvalid={!!errors.username} />
              <Form.Control.Feedback type="invalid">
                {errors.username?.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
			<Modal.Footer className="justify-content-center">
        <Button variant="outline-secondary" onClick={props.closed || null}>{'Close'}</Button>
				<Button variant="success" type="submit" form="hook-modal-form">{'Update Username'}</Button>
			</Modal.Footer>
		</Modal>
  </>);
}
