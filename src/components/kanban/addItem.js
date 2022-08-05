import React from "react"
import { Card, Form, Col, Button, Modal } from "react-bootstrap"
import { postCourse } from "../../api/axios"
import { useForm } from 'react-hook-form'
import { getDatabase, ref, set } from "firebase/database";
import { db } from "../../api/firebase"
import { v4 as uuidv4 } from 'uuid'

const AddItem = (props) => {
    const { register, handleSubmit } = useForm()
    const itemId = uuidv4()
    const onSubmit = (item) => {
        set(ref(db, `/${props.taskId}/tasks/${itemId}`), {
            id: itemId,
            title: item.title,
            description: item.description
        })
        props.close()
    }

    return (
        <Col>
            <Card.Body>
                <Form className="mx-5 mt-2 p-sm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicAreas">
                        <Form.Label>Título</Form.Label>
                        <input type="text" className="form-control"
                            placeholder="Título"
                            {...register("title", {
                                required: "Required",
                            })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicAreas">
                        <Form.Label>Descrição</Form.Label>
                        <textarea rows={3} type="text" className="form-control"
                            placeholder="Descrição"
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

export default AddItem