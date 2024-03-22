import React,{ useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import { DialogProvider } from '@/components/Dialog/hook';
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
        <DialogProvider>
            <Layout style={layoutStyle}>
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
    backgroundColor: '#222',
    overflowY: 'scroll',
};
const siderStyle = {
    backgroundColor: '#222',
    borderLeft: '1px solid hsla(0,0%,100%,.2)',
    
};
const layoutStyle = {
    borderRadius: 0,
    overflow: 'hidden',
    width: 'calc(100%-2px)',
    maxWidth: 'calc(100%)',
    height: '100vh',
    backgroundColor: '#222',
    boxSizing: 'border-box',
};
const innerLayoutStyle = {
    border: '1px solid hsla(0,0%,100%,.2)',
    backgroundColor: '#222',
    // minHeight: '80vh',
    // width: '90%',
    // borderRadius: '8px',
    // overflow: 'hidden',
    // margin: '100px auto 0',
}

export default Index