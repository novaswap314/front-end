import React, { Fragment } from "react";
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import Footer from '@/components/Layout/Footer.jsx'
import Index from '@/components/Layout/Index.jsx';
import Home from '@/views/Home/Home.jsx';
import Slide from '@/components/Layout/Slide/Slide.jsx';
import Marketplace from '@/views/Marketplace/Marketplace.jsx'
import Token from '@/views/Token/index.jsx'
import Mint from '@/views/Mint/index.jsx'
import Explore from '@/views/Explore/index.jsx'
import Balance from '@/views/Balance/index.jsx'
import Roulette from '@/views/Roulette/index.jsx'

function Enter() {
    return (
        // <Web3ModalProvider>
            <BrowserRouter>
                <Fragment>
                    <Index
                        siderChildren={
                            <Slide></Slide>
                        }

                        contentChildren={
                            <Switch>
                                <Route path="/swap" component={Roulette} />
                            </Switch>
                        }
                    />
                </Fragment>
            </BrowserRouter>
        // </Web3ModalProvider>
    )
}

export default Enter
