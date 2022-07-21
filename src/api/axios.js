import axios from "axios"

export function getListCourses() {
    return (
        axios({
            method: "GET",
            url: "https://ufc-code.herokuapp.com/api/course",
            headers: {
                "token": ""
            }
        })
    )
}

export function postCourse(data){
    return (
        axios({
            method: "POST",
            url: "https://ufc-code.herokuapp.com/api/course",
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
            url: "https://ufc-code.herokuapp.com/api/module",
            headers: {
                "token": ""
            }
        })
    )
}


export function postModule(data){
    return (
        axios({
            method: "POST",
            url: "https://ufc-code.herokuapp.com/api/module",
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
            url: "https://ufc-code.herokuapp.com/api/house",
            headers: {
                "token": ""
            }
        })
    )
}

export function postEvents(data){
    return (
        axios({
            method: "POST",
            url: "https://ufc-code.herokuapp.com/api/house",
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
            url: `https://ufc-code.herokuapp.com/api/problem`,
            headers: {
                "token": ""
            }
        })
    )
}

export function postProblems(data){
    return (
        axios({
            method: "POST",
            url: "https://ufc-code.herokuapp.com/api/problem",
            data: data,
            headers: {
                "token": ""
            }
        })
    )
}
export function putProblems(data, id){
    return (
        axios({
            method: "PUT",
            url: `https://ufc-code.herokuapp.com/api/problem/${id}`,
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
            url: "https://ufc-code.herokuapp.com/api/difficulty",
            headers: {
                "token": ""
            }
        })
    )
}