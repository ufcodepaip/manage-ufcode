import React, { useState } from "react"
import { Card, Form, Col, Button, Row, Modal } from "react-bootstrap"
import { postEvents } from "../../api/axios"
import { useForm } from 'react-hook-form'
import MyImage from "../map1.png"

const AddEvents = (props) => {
    const { register, handleSubmit } = useForm()
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    const onSubmit = (events) => {

        postEvents(events).then(res => {
            alert("Sucesso!!!")
        }).catch(error => {
            alert(error)
        })

    }

    const handleClick = (event) => {
        setX(event.pageX - event.target.x)
        setY(event.pageY - event.target.y)
    }

    return (

        <Col >
            <Card.Body>
                <Form className="mx-5 mt-2 p-sm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEvents">
                        <Form.Label>Nome</Form.Label>
                        <input type="text" className="form-control"
                            placeholder="Insira o nome do evento"
                            {...register("name", {
                                required: "Required",
                            })}
                        />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicPositionX">
                                <Form.Label>Posição X</Form.Label>
                                <input type="number" className="form-control"
                                    value={x}
                                    placeholder="Insira a posição x"
                                    {...register("positionX", {
                                        required: "Required",
                                    })}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicPositionY">
                                <Form.Label>Posição Y</Form.Label>
                                <input type="number" className="form-control"
                                    value={y}
                                    placeholder="Insira a posição y"
                                    {...register("positionY", {
                                        required: "Required",
                                    })}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="formBasicPositionY">
                        <Form.Label>posição x: {x} e posição y: {y}</Form.Label>
                        <div class="overflow-auto img" witdh="200px">
                            <img
                                src={MyImage}
                                onClick={(event) => handleClick(event)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPositionY">
                        <Form.Label>Descrição</Form.Label>
                        <textarea rows={3} type="text" className="form-control"
                            placeholder="Insira a descrição"
                            {...register("description", {
                                required: "Required",
                            })}
                        />
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="success" className="rounded m-1 p-md" type="submit">
                            Cadastrar
                        </Button>
                        <Button variant="secondary" onClick={() => props.close()}>
                            Close
                        </Button>
                    </Modal.Footer>

                </Form>
            </Card.Body>
        </Col>
    )
}

export default AddEvents