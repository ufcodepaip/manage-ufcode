import React, { useState, useEffect } from "react"
import { Modal, Form, Col, Button } from "react-bootstrap"
import { postProblems, getListCourses, getListModules, getListEvents, getListDifficulty } from "../../api/axios"
import { useForm } from 'react-hook-form'
import Select from "react-select";
import Multiselect from "../../common/multiselect"
import Singleselect from "../../common/singleselect"

const AddProblems = (props) => {
    const [courseList, setCourseList] = useState([])
    const [moduleList, setModuleList] = useState([])
    const [eventList, setEventList] = useState([])
    const [difficultyList, setDifficultyList] = useState([])


    const [event, setEvent] = useState('any')
    const [difficulty, setDifficulty] = useState('any')

    const { handleSubmit, control, register } = useForm();

    useEffect(() => {
        getListCourses().then(res => {
            setCourseList(res.data)
        }).catch(error => console.log(error))
    }, [])

    useEffect(() => {
        getListModules().then(res => {
            setModuleList(res.data)
        }).catch(error => console.log(error))
    }, [])

    useEffect(() => {
        getListEvents().then(res => {
            setEventList(res.data)
        }).catch(error => console.log(error))
    }, [])
    useEffect(() => {
        getListDifficulty().then(res => {
            setDifficultyList(res.data)
        }).catch(error => console.log(error))
    }, [])


    const onSubmit = (problems) => {
        postProblems(problems).then(res => {
            alert("Sucesso!!!")
        }).catch(error => {
            alert(error)
        })

    }

    const opt = [
        { label: "teste1", value: "teste1" },
        { label: "teste2", value: "teste2" }

    ]

    return (
        <Modal.Body>
            <Form className="rounded mx-5 mt-2 p-sm" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Nome</Form.Label>
                    <input type="text" className="form-control"
                        placeholder="Insira o nome do evento"
                        {...register("name", {
                            required: "Required",
                        })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Descrição</Form.Label>
                    <textarea rows={1} type="text" className="form-control"
                        placeholder="Insira a descrição"
                        {...register("description", {
                            required: "Required",
                        })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicInput">
                    <Form.Label>Entrada</Form.Label>
                    <input type="text" className="form-control"
                        placeholder="Insira a entrada"
                        {...register("input", {
                            required: "Required",
                        })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicOutput">
                    <Form.Label>Saída Esperada</Form.Label>
                    <input type="text" className="form-control"
                        placeholder="Insira a saída esperada"
                        {...register("expectedOutput", {
                            required: "Required",
                        })}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEvents">
                    <Form.Label>Evento</Form.Label>
                    <Singleselect
                        cname={"id_house"}
                        cselect={"Selecione o evento"}
                        ctrl={control}
                        values={eventList}
                        defaultList={false}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDifficulty">
                    <Form.Label>Dificuldade</Form.Label>
                    <Singleselect
                        cname={"id_difficulty"}
                        cselect={"Selecione a dificuldade"}
                        ctrl={control}
                        values={difficultyList}
                        defaultList={false}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCourse">
                    <Form.Label>Curso</Form.Label>
                    <Multiselect
                        cname={"courses"}
                        cselect={"Selecione o curso"}
                        ctrl={control}
                        values={courseList}
                        defaultList={false}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPModule">
                    <Form.Label>Módulo</Form.Label>
                    <Multiselect
                        cname={"modules"}
                        cselect={"selecione o módulo"}
                        ctrl={control}
                        values={moduleList}
                        defaultList={false}
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
        </Modal.Body>
    )
}

export default AddProblems