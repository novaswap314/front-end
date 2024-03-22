import React, { Fragment } from "react";
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import { Web3ModalProvider } from '@/libs/wagmi.js'
import { ConfigProvider } from 'antd';
import { theme as getTheme } from "./theme";
import Home from '@/views/Home/Home.jsx';
import Header from '@/components/Layout/Header.jsx'
import Enter from '@/views/Enter/index.jsx'

function App() {
    const theme = getTheme()
    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        paddingBlock: 2,
                        paddingInline: 6,
                        defaultGhostBorderColor: theme.gray3,
                        primaryColor: '#333',
                    },
                },
                token: {
                    colorPrimary: theme.colorPrimary,
                    borderRadius: 8,
                    controlHeight: 30, // 按钮和输入框等基础控件的高度
                    colorBgSpotlight: 'rgba(68, 68, 68, 1)',
                    colorTextDisabled: '#fff',
                    colorTextDescription: '#fff',
                    colorTextLightSolid: '#444',
                },
            }}
        >
            <Web3ModalProvider>
                <BrowserRouter>
                    <Fragment>
                        <Header></Header>
                        <Switch>
                            <Route path="/homepage" component={Home} />
                            <Route path="/" component={Enter} />
                            <Redirect from='/*' to='/' />
                        </Switch>
                    </Fragment>
                </BrowserRouter>
            </Web3ModalProvider>
        </ConfigProvider>
    )
}

export default App
