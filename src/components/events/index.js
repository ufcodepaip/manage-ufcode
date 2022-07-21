import React from "react"
import { Card, Row, Col } from "react-bootstrap"
import ListEvents from "./listEvents"
import AddEvents from "./addEvents"

const eventsPage = () => {

    return (
        <Card>
            <Row>
                <ListEvents />
            </Row>
        </Card>
    )

}

export default eventsPage