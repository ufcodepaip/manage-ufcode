import React from "react"
import { Card, Row, Col } from "react-bootstrap"
import ListModule from "./listModules"
import AddModule from "./addModules"

const modulePage = () => {

    return (
        <Card>
            <Row>
                <ListModule />
            </Row>
        </Card>
    )

}

export default modulePage