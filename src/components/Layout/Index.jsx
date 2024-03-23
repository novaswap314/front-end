import React,{ useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";

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

    // const handleResize = useCallback(() => {
    //     if (window.innerWidth < theme.mdw && !global.isHamburger) {
    //         dispatch(globalActions.setHamburger(true))
    //     }
    //     if (window.innerWidth > theme.mdw && global.isHamburger) {
    //         dispatch(globalActions.setHamburger(false))
    //     }
    // }, [theme.mdw, global.isHamburger])

    // useEffect(() => {
    //     // 监听窗口大小变化事件
    //     window.addEventListener('resize', handleResize);
    
    //     // 清除监听器以避免内存泄漏
    //     return () => {
    //       window.removeEventListener('resize', handleResize);
    //     };
    // }, [handleResize]);

    return (
        <DialogProvider>
            <LayoutOne style={layoutStyle}>
                <Layouter style={innerLayoutStyle}>
                    <ContentWrapper style={contentStyle}>
                        { contentChildren }
                    </ContentWrapper>
                    <SlideWrapper style={siderStyle}>
                        { siderChildren }
                    </SlideWrapper>
                </Layouter>
            </LayoutOne>
        </DialogProvider>
    )
}
const SlideWrapper = styled(Sider)`
    padding-top: ${({ theme }) => theme.height};
    border-left: 1px solid hsla(0,0%,100%,.2);
    width: ${({theme}) => theme.slideWidth} !important;
    max-width: 100% !important;
    flex: 0 0 ${({theme}) => theme.slideWidth} !important;
    ${({theme}) => theme.md`
        margin: 0 auto;
        border-left: 0;
        width: 100% !important;
    `}
`
const ContentWrapper = styled(Content)`
    padding-top: ${({ theme }) => theme.height};
`
const LayoutOne = styled(Layout)`
    height: '100vh';
    ${({theme}) => theme.md`
        height: auto;
    `}
`
const contentStyle = {
    textAlign: 'center',
    minHeight: '90vh',
    color: '#fff',
    backgroundColor: '#222',
    overflowY: 'scroll',
    flex: 1,
};
const siderStyle = {
    backgroundColor: '#222',    
};
const layoutStyle = {
    borderRadius: 0,
    overflow: 'hidden',
    width: 'calc(100%-2px)',
    maxWidth: 'calc(100%)',
    backgroundColor: '#222',
    boxSizing: 'border-box',
};
const Layouter = styled.div`
    display: flex;
    width: 100%;
    ${({theme}) => theme.md`
        flex-direction: column-reverse;
    `}
`
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