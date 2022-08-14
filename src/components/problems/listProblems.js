import React, { useEffect, useState } from "react"
import { Button, Card, Table, Col, Modal, Row, Spinner } from "react-bootstrap"
import { getListProblems } from "../../api/axios"
import NumberPages from "../../common/numberpage"
import AddProblems from "./addProblems"
import EditProblems from "./editProblems"

const ListProblems = () => {


    const [problemList, setProblemList] = useState([])
    const [problem, setProblem] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItem = problemList.slice(indexOfFirstItem, indexOfLastItem)


    const [show, setShow] = useState(false);
    function handleClose() { setShow(false) };
    const handleShow = () => setShow(true);

    const [showEdit, setShowEdit] = useState(false);
    function handleCloseEdit() { setShowEdit(false) };
    const handleShowEdit = () => setShowEdit(true);


    useEffect(() => {
        getListProblems().then(res => {
            setProblemList(res.data)
        }).catch(error => console.log(error))
    }, [show])

    const handleEditProblem = (problem) => {
        setProblem(problem)
        handleShowEdit()
    }

    const paginate = pageNumber => setCurrentPage(pageNumber)



    return (
        <Col>
            <Card.Header className="fs-1">
                <Row>
                    <Col>
                        Lista de Problemas
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button variant="primary" onClick={handleShow}>
                            Cadastrar Problemas
                        </Button>
                    </Col>
                </Row>

            </Card.Header>
            <Card.Body className="m-5 p-5">
                <Table responsive>
                    <thead>
                        <tr>
                            <th className="action">Editar</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Entrada</th>
                            <th>Saída Esperada</th>
                            <th>Eventos</th>
                            <th>Cursos</th>
                            <th>Modulos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItem.map(problems => {
                            return (
                                <tr>
                                    <td className="action">
                                        <Button variant="primary" type="submit" size="sm"
                                            onClick={() => handleEditProblem(problems)}>
                                            Editar
                                        </Button>
                                    </td>
                                    <td key={problems.id}>{problems.name}</td>
                                    <td className="largetext">{problems.description}</td>
                                    <td>{problems.input}</td>
                                    <td>{problems.expectedOutput}</td>
                                    <td>{problems.houseId.name}</td>
                                    <td>{problems.courses.map(i => i.name + ", ")}</td>
                                    <td>{problems.modules.map(i => i.name + ", ")}</td>
                                </tr>)
                        })
                        }
                    </tbody>
                </Table>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastrar Problema</Modal.Title>
                    </Modal.Header>
                    <AddProblems
                        close={handleClose}
                    />
                </Modal>
                <Modal show={showEdit} onHide={handleCloseEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Problema</Modal.Title>
                    </Modal.Header>
                    <EditProblems
                        close={handleCloseEdit}
                        problem={problem}
                    />
                </Modal>
                <NumberPages
                    itemPerPage={itemsPerPage}
                    totalItems={problemList.length}
                    paginate={paginate} />
            </Card.Body>
        </Col>
    )
}

export default ListProblems