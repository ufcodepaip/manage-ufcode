import axios from "axios"

export function getListCourses() {
    return (
        axios({
            method: "GET",
            url: process.env.REACT_APP_URL + "/api/course",
            headers: {
                "token": ""
            }
        })
    )
}

export function postCourse(data) {
    return (
        axios({
            method: "POST",
            url: process.env.REACT_APP_URL + "/api/course",
            data: data,
            headers: {
                "token": ""
            }
        })
    )
}


export function getListModules() {
    return (
        axios({
            method: "GET",
            url: process.env.REACT_APP_URL + "/api/module",
            headers: {
                "token": ""
            }
        })
    )
}


export function postModule(data) {
    return (
        axios({
            method: "POST",
            url: process.env.REACT_APP_URL + "/api/module",
            data: data,
            headers: {
                "token": ""
            }
        })
    )
}

export function getListEvents() {
    return (
        axios({
            method: "GET",
            url: process.env.REACT_APP_URL + "/api/house",
            headers: {
                "token": ""
            }
        })
    )
}

export function postEvents(data) {
    return (
        axios({
            method: "POST",
            url: process.env.REACT_APP_URL + "/api/house",
            data: data,
            headers: {
                "token": ""
            }
        })
    )
}

export function getListProblems() {
    return (
        axios({
            method: "GET",
            url: process.env.REACT_APP_URL + "/api/problem",
            headers: {
                "token": ""
            }
        })
    )
}

export function postProblems(data) {
    return (
        axios({
            method: "POST",
            url: process.env.REACT_APP_URL + "/api/problem",
            data: data,
            headers: {
                "token": ""
            }
        })
    )
}

export function getListQuizz() {
    return (
        axios({
            method: "GET",
            url: process.env.REACT_APP_URL + "/api/Quizz",
            headers: {
                "token": ""
            }
        })
    )
}

export function postQuizz(data) {
    return (
        axios({
            method: "POST",
            url: process.env.REACT_APP_URL + "/api/Quizz",
            data: data,
            headers: {
                "token": ""
            }
        })
    )
}

export function putProblems(data, id) {
    return (
        axios({
            method: "PUT",
            url: process.env.REACT_APP_URL + `/api/problem/${id}`,
            data: data,
            headers: {
                "token": ""
            }
        })
    )
}

export function getListDifficulty() {
    return (
        axios({
            method: "GET",
            url: process.env.REACT_APP_URL + "/api/difficulty",
            headers: {
                "token": ""
            }
        })
    )
}