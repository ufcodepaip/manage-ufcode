import React from "react"
import { Route, Switch } from "react-router-dom"
import Menu from "../components/Menu"
import CoursePage from "../components/course/index"
import EventsPage from "../components/events/index"
import ModulePage from "../components/modules/index"
import ProblemPage from "../components/problems/index"
import ListSubmissions from "../components/submissions/listSubmissions"

const Routes = () => {

    return (
        <Switch>
            <Route path='/' exact component={Menu} />
            <Route path='/course' component={CoursePage} />
            <Route path='/module' component={ModulePage} />
            <Route path='/events' component={EventsPage} />
            <Route path='/problems' component={ProblemPage} />
            <Route path='/submissions' component={ListSubmissions} />
        </Switch>
        
    )

}

export default Routes
