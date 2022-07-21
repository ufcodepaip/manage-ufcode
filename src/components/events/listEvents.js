import React, { useEffect, useState } from "react"
import { Button, Card, Table, Col, Modal, Row, Spinner } from "react-bootstrap"
import { getListEvents } from "../../api/axios"
import NumberPages from "../../common/numberpage"
import AddEvents from "./addEvents"
const ListEvents = () => {

    const [eventsList, setEventsList] = useState([])
    const [eventsName, setEventsName] = useState("")
    const [eventsID, setEventsID] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItem = eventsList.slice(indexOfFirstItem, indexOfLastItem)

    const [show, setShow] = useState(false);
    function handleClose() { setShow(false) };
    const handleShow = () => setShow(true);


    useEffect(() => {
        getListEvents().then(res => {
            setEventsList(res.data)
        }).catch(error => console.log(error))
    }, [])

    const handleEditEvents = (events) => {
        console.log(events.id)
    }

    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (

        <Col>
            <Card.Header className="fs-1">
                <Row>
                    <Col>
                        Lista de Eventos
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button variant="primary" onClick={handleShow}>
                            Cadastrar Eventos
                        </Button>
                    </Col>
                </Row>

            </Card.Header>
            <Card.Body className="m-5 p-5">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Editar</th>
                            <th>Nome</th>
                            <th>Posição x</th>
                            <th>Posição y</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    {<tbody>
                        {currentItem.map(events => {
                            return (
                                <tr>
                                    <td>
                                        <Button disabled variant="primary" type="submit" size="sm"
                                            onClick={() => handleEditEvents(events)}>
                                            Editar
                                        </Button>
                                    </td>
                                    <td key={events.id}>{events.name}</td>
                                    <td>{events.positionX}</td>
                                    <td>{events.positionY}</td>
                                    <td className="largetext">{events.description}</td>
                                </tr>)
                        })}
                    </tbody>}
                </Table>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastrar Eventos</Modal.Title>
                    </Modal.Header>
                    <AddEvents
                        close={handleClose}
                    />
                </Modal>
                <NumberPages
                    itemPerPage={itemsPerPage}
                    totalItems={eventsList.length}
                    paginate={paginate} />
            </Card.Body>
        </Col>
    )
}

export default ListEvents