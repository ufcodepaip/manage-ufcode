import React, { useEffect, useState } from "react"
import { Form, Button, Card, Table, Col, Row, Modal } from "react-bootstrap"
import { getListModules } from "../../api/axios"
import NumberPages from "../../common/numberpage"
import AddModules from "./addModules"

const ListModule = () => {
    const [moduleList, setModuleList] = useState([])
    const [moduleName, setModuleName] = useState("")
    const [moduleID, setModuleID] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)

    const [show, setShow] = useState(false);
    function handleClose() { setShow(false) };
    const handleShow = () => setShow(true);
    

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItem = moduleList.slice(indexOfFirstItem, indexOfLastItem)
    console.log(currentItem)
    useEffect(() => {
        getListModules().then(res => {
            setModuleList(res.data)
        }).catch(error => console.log(error))
    }, [show])

    const handleEditModule = (modules) => {
        setModuleName(modules.name)
        setModuleID(modules.id)
        console.log(modules.id)
    }

    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (

        <Col>
            <Card.Header className="fs-1">
                <Row>
                    <Col>
                        Lista de Modulos
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button variant="primary" onClick={handleShow}>
                            Cadastrar Modulos
                        </Button>
                    </Col>
                </Row>

            </Card.Header>
            <Card.Body className="m-5 p-5">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Editar</th>
                            <th>Nome do módulo</th>
                            <th>Ordem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItem.map(modules => {
                            return (
                                <tr>
                                    <td>
                                        <Button disabled variant="primary" type="submit" size="sm"
                                            onClick={() => handleEditModule(modules)}>
                                            Editar
                                        </Button>
                                    </td>
                                    <td key={modules.id}>{modules.name}</td><td>A fazer</td>

                                </tr>)
                        })}
                    </tbody>
                </Table>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastrar Módulos</Modal.Title>
                    </Modal.Header>
                    <AddModules
                        close={handleClose}
                    />
                </Modal>
                <NumberPages
                itemPerPage={itemsPerPage}
                totalItems={moduleList.length}
                paginate={paginate} />
            </Card.Body>
        </Col>
    )
}

export default ListModule