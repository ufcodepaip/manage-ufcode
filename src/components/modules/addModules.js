import React, { useState } from "react"
import { Card, Form, Col, Button, Modal } from "react-bootstrap"
import { postModule } from "../../api/axios"
import { useForm } from 'react-hook-form'

const AddModule = (props) => {
    const { register, handleSubmit } = useForm()

    const onSubmit = (modules) => {

        postModule(modules).then(res => {
            alert("Sucesso!!!")
        }).catch(error => {
            alert(error)
        })
        props.close()
    }

    return (
        <Modal.Body>
            <Form className="rounded p-2 m-2 p-sm" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicAreas">
                    <Form.Label>Nome</Form.Label>
                    <input type="text" className="form-control"
                        placeholder="Insira o nome do módulo"
                        {...register("name", {
                            required: "Required",
                        })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Ordem</Form.Label>
                    <Form.Control type="number" placeholder="Ordem" />
                    <Form.Label variant="danger">Atenção: Este campo não está sendo persistido no banco de dados.</Form.Label>

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
        </Modal.Body>
    )
}

export default AddModule