import React from "react"
import Pagination from 'react-bootstrap/Pagination';


const numberPages = ({ itemPerPage, totalItems, paginate }) => {
    let items = []

    for (let number = 1; number <= Math.ceil(totalItems / itemPerPage); number++) {
        items.push(
            <li key={number} className="page-item">
                <a onClick={() => paginate(number)}
                    className="page-link">
                    {number}
                </a>
            </li>
        )
    }


    return (
        <Pagination className="justify-content-center pagination-md mt-4">{items}</Pagination>
    )

}

export default numberPages