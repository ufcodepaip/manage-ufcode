import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import mockData from "./mockData"
import { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Button, Modal } from "react-bootstrap"
import AddItem from './addItem'
import { onValue, ref, update } from 'firebase/database'
import { db } from '../../api/firebase'
import ViewItem from './viewItem'

const Kanban = () => {
    const [data, setData] = useState(mockData)
    const [sectionId, setSectionId] = useState()
    const [editId, setEditId] = useState()
    const [editIndex, setEditIndex] = useState()

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    function handleClose() { setShow(false) };
    function handleEditClose() { setShowEdit(false) };


    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            setData([])
            const snp = snapshot.val()
            if (snp !== null) {
                const obj = {
                    bugs: {
                        title: snp.bugs.title,
                        tasks: Object.values(snp.bugs.tasks).map((value) => value == null ? [] : value)
                    },
                    todo: {
                        title: snp.todo.title,
                        tasks: Object.values(snp.todo.tasks).map((value) => value == null ? [] : value)
                    },
                    inprogress: {
                        title: snp.inprogress.title,
                        tasks: Object.values(snp.inprogress.tasks).map((value) => value == null ? [] : value)
                    },
                    completed: {
                        title: snp.completed.title,
                        tasks: Object.values(snp.completed.tasks).map((value) => value == null ? [] : value)
                    },
                }

                setData(obj)
            }
        })
    }, [])

    const handleShow = (value) => {
        setSectionId(value)
        setShow(true)
    };

    const handleShowEdit = (value, editValue, index) => {
        setSectionId(value)
        setEditId(editValue)
        setEditIndex(index)
        setShowEdit(true)
        console.log(index)
    };

    const onDragEnd = result => {
        if (!result.destination) return

        const { source, destination } = result

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = data[source.droppableId]
            const destColumn = data[destination.droppableId]

            const sourceTasks = [...sourceColumn.tasks]
            const destTasks = [...destColumn.tasks]

            const [removed] = sourceTasks.splice(source.index, 1)
            destTasks.splice(destination.index, 0, removed)
            const valueChanged = {
                ...data,
                [source.droppableId]: {
                    ...sourceColumn,
                    tasks: sourceTasks
                },
                [destination.droppableId]: {
                    ...destColumn,
                    tasks: destTasks
                }
            }
            setData(valueChanged)

            console.log(valueChanged)
            update(ref(db), {
                bugs: { title: valueChanged.bugs.title, tasks: valueChanged.bugs.tasks.length == 0 ? "" : valueChanged.bugs.tasks },
                todo: { title: valueChanged.todo.title, tasks: valueChanged.todo.tasks.length == 0 ? "" : valueChanged.todo.tasks },
                inprogress: { title: valueChanged.inprogress.title, tasks: valueChanged.inprogress.tasks.length == 0 ? "" : valueChanged.inprogress.tasks },
                completed: { title: valueChanged.completed.title, tasks: valueChanged.completed.tasks.length == 0 ? "" : valueChanged.completed.tasks },
            })
        } else {

            const column = data[source.droppableId]
            const copiedItems = [...column.tasks]

            const [removed] = copiedItems.splice(source.index, 1)
            copiedItems.splice(destination.index, 0, removed)
            const valueChanged = {
                ...data,
                [source.droppableId]: {
                    ...column,
                    tasks: copiedItems
                }
            }
            setData(valueChanged)

            console.log(valueChanged)
            console.log(valueChanged.bugs)
            console.log("LOGIC: ", valueChanged.inprogress.tasks.length == 0 ? "" : valueChanged.inprogress)
            update(ref(db), {
                bugs: { title: valueChanged.bugs.title, tasks: valueChanged.bugs.tasks.length == 0 ? "" : valueChanged.bugs.tasks },
                todo: { title: valueChanged.todo.title, tasks: valueChanged.todo.tasks.length == 0 ? "" : valueChanged.todo.tasks },
                inprogress: { title: valueChanged.inprogress.title, tasks: valueChanged.inprogress.tasks.length == 0 ? "" : valueChanged.inprogress.tasks },
                completed: { title: valueChanged.completed.title, tasks: valueChanged.completed.tasks.length == 0 ? "" : valueChanged.completed.tasks },
            })
        }

    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Container fluid className='p-5'>
                <Row>
                    {Object.entries(data).map(([id, section]) => (
                        <Droppable
                            key={id}
                            droppableId={id} >
                            {(provided, snapshot) => (
                                <Col>
                                    <Card {...provided.droppableProps} ref={provided.innerRef} >
                                        <Card.Header>
                                            <Button onClick={() => handleShow(id)} className='me-3' size="sm" variant="outline-dark">
                                                <i className="bi bi-plus"></i>
                                            </Button>
                                            {section.title}
                                        </Card.Header>
                                        <Card.Body>
                                            {section.tasks.map((task, index) => (
                                                <Draggable
                                                    key={task.id}
                                                    draggableId={task.id}
                                                    index={index} >
                                                    {(provided, snapshot) => (
                                                        <Card className='m-1'
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                ...provided.draggableProps.style,
                                                                opacity: snapshot.isDragging ? '0.5' : '1'
                                                            }}
                                                        >
                                                            <Card.Text className='p-2 fs-6 justify-text hyphens'>
                                                                <Button onClick={() => handleShowEdit(id, task, index)} className='me-3' size="sm" variant="outline-dark">
                                                                    <i className="bi bi-three-dots-vertical"></i>
                                                                </Button>
                                                                {task.title}
                                                            </Card.Text>
                                                        </Card>
                                                    )}
                                                </Draggable>
                                            ))
                                            }
                                            {provided.placeholder}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        </Droppable>


                    ))
                    }
                </Row>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastrar Atividade</Modal.Title>
                    </Modal.Header>
                    <AddItem
                        close={handleClose}
                        taskId={sectionId}
                    />
                </Modal>
                <Modal show={showEdit} onHide={handleEditClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Atividade</Modal.Title>
                    </Modal.Header>
                    <ViewItem
                        close={handleEditClose}
                        task={editId}
                        sectionId={sectionId}
                        idx = {editIndex}
                    />
                </Modal>
            </Container>
        </DragDropContext>
    )
}

export default Kanban