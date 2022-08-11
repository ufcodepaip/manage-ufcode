import React, { useEffect, useState } from "react"
import { Button, Card, Table, Col, Modal, Row, Spinner } from "react-bootstrap"
import { getListQuizz } from "../../api/axios"
import NumberPages from "../../common/numberpage"
import AddQuizz from "./addQuizz"

const ListQuizz = () => {

    const [quizzList, setQuizzList] = useState([])
    const [quizzName, setQuizzName] = useState("")
    const [quizzID, setQuizzID] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItem = quizzList.slice(indexOfFirstItem, indexOfLastItem)

    const [show, setShow] = useState(false);
    function handleClose() { setShow(false) };
    const handleShow = () => setShow(true);


    useEffect(() => {
        getListQuizz().then(res => {
            setQuizzList(res.data)
        }).catch(error => console.log(error))
    }, [])

    const handleEditQuizz = (quizz) => {
        console.log(quizz.id)
    }

    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (

        <Col>
            <Card.Header className="fs-1">
                <Row>
                    <Col>
                        Lista de Quizz
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button variant="primary" onClick={handleShow}>
                            Cadastrar Quizz
                        </Button>
                    </Col>
                </Row>

            </Card.Header>
            <Card.Body className="m-5 p-5">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Editar</th>
                            <th>Description</th>
                            <th>Opção 1</th>
                            <th>Opção 2</th>
                            <th>Opção 3</th>
                            <th>Opção 4</th>
                            <th>Opção Correta</th>
                        </tr>
                    </thead>
                    {<tbody>
                        {currentItem.map(quizz => {
                            return (
                                <tr>
                                    <td>
                                        <Button disabled variant="primary" type="submit" size="sm"
                                            onClick={() => handleEditQuizz(quizz)}>
                                            Editar
                                        </Button>
                                    </td>
                                    <td className="largetext">{quizz.description}</td>
                                    <td key={quizz.id}>{quizz.option_one}</td>
                                    <td key={quizz.id}>{quizz.option_two}</td>
                                    <td key={quizz.id}>{quizz.option_three}</td>
                                    <td key={quizz.id}>{quizz.option_four}</td>
                                    <td key={quizz.id}>{quizz.option_correct}</td>

                                </tr>)
                        })}
                    </tbody>}
                </Table>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastrar Quizz</Modal.Title>
                    </Modal.Header>
                    <AddQuizz
                        close={handleClose}
                    />
                </Modal>
                <NumberPages
                    itemPerPage={itemsPerPage}
                    totalItems={quizzList.length}
                    paginate={paginate} />
            </Card.Body>
        </Col>
    )
}

export default ListQuizz