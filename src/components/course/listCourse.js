import React, { useEffect, useState } from "react"
import { Button, Card, Table, Col, Row, Modal } from "react-bootstrap"
import { getListCourses } from "../../api/axios"
import NumberPages from "../../common/numberpage"
import AddCourse from "./addCourse"

const ListCourse = () => {
    const [courseList, setCourseList] = useState([])
    const [courseName, setCourseName] = useState("")
    const [courseID, setCourseID] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItem = courseList.slice(indexOfFirstItem, indexOfLastItem)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getListCourses().then(res => {
            setCourseList(res.data)
        }).catch(error => console.log(error))
    }, [show])

    const handleEditCourse = (course) => {
        setCourseName(course.name)
        setCourseID(course.id)
        console.log(course.id)
    }

    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (

        <Col>
            <Card.Header className="fs-1">
                <Row>
                    <Col>
                        Lista de Áreas
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button variant="primary" onClick={handleShow}>
                            Cadastrar Áreas
                        </Button>
                    </Col>
                </Row>

            </Card.Header>

            <Card.Body className="m-5 p-5">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Editar</th>
                            <th>Nome da área</th>
                            <th>Ordem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItem.map(course => {
                            return (
                                <tr>
                                    <td>
                                        <Button disabled variant="primary" type="submit" size="sm"
                                            onClick={() => handleEditCourse(course)}>
                                            Editar
                                        </Button>
                                    </td>
                                    <td key={course.id}>{course.name}</td><td>A fazer</td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastrar Área</Modal.Title>
                    </Modal.Header>
                    <AddCourse
                        close={handleClose}
                    />
                </Modal>
                <NumberPages
                    itemPerPage={itemsPerPage}
                    totalItems={courseList.length}
                    paginate={paginate} />
            </Card.Body>
        </Col>
    )
}

export default ListCourse