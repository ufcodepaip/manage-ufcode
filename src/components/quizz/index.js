import React from "react"
import { Card, Row, Col } from "react-bootstrap"
import ListQuizz from "./listQuizz"
import AddQuizz from "./addQuizz"

const QuizzPage = () => {

    return (
        <Card>
            <Row>
                <ListQuizz />
            </Row>
        </Card>
    )

}

export default QuizzPage