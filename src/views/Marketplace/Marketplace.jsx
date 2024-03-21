import React, { Fragment } from "react";
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import ARC20 from './ARC20'
import ARC20Detail from './ARC20/detail'
import Realm from './Realm'
import Collection from './Collection'
import MarketHeader from './MarketHeader'

const MarketWapper = styled.div`
    

`

const Marketplace = () => {
    return(
        <Fragment>
            <MarketHeader></MarketHeader>
            <Switch>
                <Route path='/market/arc20/:name' component={ARC20Detail}/>
                <Route path='/market/arc20' component={ARC20}/>
                <Route path='/market/realm' component={Realm}/>
                <Route path='/market/collection' component={Collection}/>
                <Redirect from='/market' to='/market/arc20' />
            </Switch>
        </Fragment>
    )
}

export default Marketplace

