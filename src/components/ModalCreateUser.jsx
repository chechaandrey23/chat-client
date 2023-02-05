import React, {Component, useLayoutEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Row, Col, Button, Form, Alert, Modal, Spinner} from 'react-bootstrap';

import {sagaCreateUsername} from '../redux/saga/socket.io.chat';
import {setErrorCreateUsername} from '../redux/chats.js';

import * as Yup from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

const validationSchemaModal = Yup.object().shape({
	username: Yup.string().required('Username is required')
						.min(5, 'Username must be minimum 5 characters')
						.max(15, 'Username must be maximum 15 characters')
});

export default function ModalCreateUser(props) {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.chats.username);
	const creatingUsername = useSelector((state) => state.chats.creatingUsername);
	const errorCreateUsername = useSelector((state) => state.chats.errorCreateUsername);

	const {register, handleSubmit, setValue, control, formState: {errors}} = useForm({resolver: yupResolver(validationSchemaModal)});

  useLayoutEffect(() => () => {dispatch(setErrorCreateUsername(false))}, []);

  const countRender = useRef(0);
	useLayoutEffect(() => {
		countRender.current++;
		if(typeof props.successed === 'function' && countRender.current > 1) {
			props.successed.call(null, username);
		}
	}, [username]);

  return (<>
    <Modal show={true} animation={false} centered>
			<Modal.Header>
				<Modal.Title>{'Modal Create User'}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
        {creatingUsername?<Row style={{height: '100%'}} className="justify-content-center align-items-center">
				<Col sm="auto">
					<Spinner animation="border" variant={'warning'} />
				</Col>
			</Row>:null}
        {errorCreateUsername?<Alert variant="danger" onClose={() => {dispatch(setErrorCreateUsername(false))}} dismissible>
					<Alert.Heading>{'Server Error Message'}</Alert.Heading>
					<p>{errorCreateUsername.message}</p>
				</Alert>:null}
        <Form id="hook-modal-form" onSubmit={handleSubmit((data) => {
					console.log(data);
					dispatch(sagaCreateUsername(data.username));
				})}>
          <Form.Group as={Row} className="mb-3" controlId="formBasicCreateUsername">
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
				<Button variant="success" type="submit" form="hook-modal-form">{'Create User'}</Button>
			</Modal.Footer>
		</Modal>
  </>);
}
