import React from "react"
import { Card, Row } from "react-bootstrap"
import ListProblems from "./listProblems"
import AddProblems from "./addProblems"

const problemsPage = () => {

    return (
        <Card>
            <Row>
                <ListProblems />
            </Row>
        </Card>
    )

}

export default problemsPage