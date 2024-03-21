import React, { Fragment } from "react";
import { Route, Switch, Redirect } from 'react-router-dom'
import All from './All'
import Hot from './Hot'
import TokenHeader from './TokenHeader'

const Marketplace = () => {
    return(
        <Fragment>
            <TokenHeader></TokenHeader>
            <Switch>
                <Route path='/token/all' component={All}/>
                <Route path='/token/hot' component={Hot}/>
                <Redirect from='/token' to='/token/all' />
            </Switch>
        </Fragment>
    )
}

export default Marketplace

