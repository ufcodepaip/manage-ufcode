import React from "react"
import { Card, Row } from "react-bootstrap"
import ListCourse from "./listCourse"
import AddCourse from "./addCourse"

const coursePage = () => {

    return (
        <Card>
            <Row>
                <ListCourse />
            </Row>
        </Card>
    )

}

export default coursePage