import React,{ useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Header from '@/components/Layout/Header.jsx'
import { DialogProvider } from '@/components/Dialog/hook';
import { ConfigProvider } from 'antd';
import { Layout } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { globalActions } from '@/store/module/global';
import { theme as getTheme } from "../../theme";
const { Sider, Content } = Layout;

const Index = ({ siderChildren, contentChildren }) => {
    const global = useSelector(state => state.global)
    const dispatch = useDispatch()
    const theme = getTheme()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = useCallback(() => {
        if (window.innerWidth < theme.mdw && !global.isHamburger) {
            dispatch(globalActions.setHamburger(true))
        }
        if (window.innerWidth > theme.mdw && global.isHamburger) {
            dispatch(globalActions.setHamburger(false))
        }
    }, [theme.mdw, global.isHamburger])

    useEffect(() => {
        // 监听窗口大小变化事件
        window.addEventListener('resize', handleResize);
    
        // 清除监听器以避免内存泄漏
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        paddingBlock: 2,
                        paddingInline: 6,
                        defaultGhostBorderColor: theme.gray3,
                    },
                },
                token: {
                    colorPrimary: theme.colorPrimary,
                    borderRadius: 8,
                    controlHeight: 30, // 按钮和输入框等基础控件的高度
                    colorBgSpotlight: 'rgba(68, 68, 68, 1)',
                    colorTextDisabled: '#fff',
                    colorTextDescription: '#fff',
                },
            }}
        >
            <DialogProvider>
                <Layout style={layoutStyle}>
                    <Header></Header>
                    <Layout style={innerLayoutStyle}>
                        <ContentWrapper style={contentStyle}>
                            { contentChildren }
                        </ContentWrapper>
                        <SlideWrapper width={global.isHamburger ? theme.slideHamWidth : theme.slideWidth} style={siderStyle}>
                            { siderChildren }
                        </SlideWrapper>
                    </Layout>
                </Layout>
            </DialogProvider>
        </ConfigProvider>
    )
}
const SlideWrapper = styled(Sider)`
    padding-top: ${({ theme }) => theme.height};
`
const ContentWrapper = styled(Content)`
    padding-top: ${({ theme }) => theme.height};
`
const contentStyle = {
    textAlign: 'center',
    minHeight: '90vh',
    color: '#fff',
    backgroundColor: 'black',
    overflowY: 'scroll',
};
const siderStyle = {
    backgroundColor: 'black',
    borderLeft: '1px solid hsla(0,0%,100%,.2)',
    
};
const layoutStyle = {
    borderRadius: 0,
    overflow: 'hidden',
    width: 'calc(100%-2px)',
    maxWidth: 'calc(100%)',
    height: '100vh',
    backgroundColor: 'black',
    boxSizing: 'border-box',
};
const innerLayoutStyle = {
    border: '1px solid hsla(0,0%,100%,.2)',
    backgroundColor: 'black',
    // minHeight: '80vh',
    // width: '90%',
    // borderRadius: '8px',
    // overflow: 'hidden',
    // margin: '100px auto 0',
}

export default Index