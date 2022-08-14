import React, { useState, useEffect } from "react"
import { Card, Form, Col, Button, Row, Modal } from "react-bootstrap"
import { postQuizz, getListModules } from "../../api/axios"
import { useForm } from 'react-hook-form'
import MyImage from "../map1.png"
import Singleselect from "../../common/singleselect"

const AddEvents = (props) => {
    const { register, control, handleSubmit } = useForm()
    const [moduleList, setModuleList] = useState([])

    useEffect(() => {
        getListModules().then(res => {
            setModuleList(res.data)
        }).catch(error => console.log(error))
    }, [])

    const onSubmit = (quizz) => {

        switch (quizz.option_correct) {
            case 1:
                quizz.option_correct = quizz.option_one
                break;
            case 2:
                quizz.option_correct = quizz.option_two
                break;
            case 3:
                quizz.option_correct = quizz.option_three
                break;
            case 4:
                quizz.option_correct = quizz.option_four
                break;
            default:
                break;
        }

        postQuizz(quizz).then(res => {
            alert("Sucesso!!!")
        }).catch(error => {
            alert(error)
        })
        props.close()
    }

    return (

        <Col >
            <Card.Body>
                <Form className="mx-5 mt-2 p-sm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEvents">
                        <Form.Label>Descrição</Form.Label>
                        <textarea col={3} type="text" className="form-control"
                            placeholder="Insira a descrição do questionário"
                            {...register("description", {
                                required: "Required",
                            })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEvents">
                        <Form.Label>Opção 1</Form.Label>
                        <input type="text" className="form-control"
                            placeholder="Insira a Opção 1"
                            {...register("option_one", {
                                required: "Required",
                            })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEvents">
                        <Form.Label>Opção 2</Form.Label>
                        <input type="text" className="form-control"
                            placeholder="Insira a Opção 2"
                            {...register("option_two", {
                                required: "Required",
                            })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEvents">
                        <Form.Label>Opção 3</Form.Label>
                        <input type="text" className="form-control"
                            placeholder="Insira a Opção 3"
                            {...register("option_three", {
                                required: "Required",
                            })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEvents">
                        <Form.Label>Opção 4</Form.Label>
                        <input type="text" className="form-control"
                            placeholder="Insira a Opção 4"
                            {...register("option_four", {
                                required: "Required",
                            })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEvents">
                        <Form.Label>Opção Correta</Form.Label>
                        <Singleselect
                            cname={"option_correct"}
                            cselect={"Selecione a opção correta"}
                            ctrl={control}
                            values={[{ id: 1, name: 1 }, { id: 2, name: 2 }, { id: 3, name: 3 }, { id: 4, name: 4 },]}
                            defaultList={false}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEvents">
                        <Form.Label>Opção Correta</Form.Label>
                        <Singleselect
                            cname={"modules"}
                            cselect={"Selecione o modulo"}
                            ctrl={control}
                            values={moduleList}
                            defaultList={false}
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