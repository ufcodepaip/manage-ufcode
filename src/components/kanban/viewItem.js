import React from "react"
import { Card, Form, Col, Button, Modal } from "react-bootstrap"
import { postCourse } from "../../api/axios"
import { useForm } from 'react-hook-form'
import { getDatabase, ref, set, update } from "firebase/database";
import { db } from "../../api/firebase"
import { v4 as uuidv4 } from 'uuid'

const ViewItem = (props) => {

    const defaultValues = {
        title: props.task.title,
        description: props.task.description
    }
    const { register, handleSubmit } = useForm({
        defaultValues
    })
    const onSubmit = (item) => {
        update(ref(db, `/${props.sectionId}/tasks/${props.idx}`), {
            id: props.task.id,
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
                            Salvar
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

export default ViewItem