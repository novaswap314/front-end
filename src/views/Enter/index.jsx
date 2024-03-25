import React, { Fragment } from "react";
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Index from '@/components/Layout/Index.jsx';
import Slide from '@/components/Layout/Slide/Slide.jsx';
import Swap from '@/views/Swap/index.jsx'

function Enter() {
    return (
        <BrowserRouter>
            <Fragment>
                <Index
                    siderChildren={
                        <Slide></Slide>
                    }

                    contentChildren={
                        <Switch>
                            <Route path="/swap" component={Swap} />
                        </Switch>
                    }
                />
            </Fragment>
        </BrowserRouter>
    )
}

export default Enter
