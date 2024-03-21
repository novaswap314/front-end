import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PanelItem from "./PanelItem";
import PanelItemPop from "./PanelItemPop";
import Hamburger from "./Hamburger";
import { useHistory, NavLink } from 'react-router-dom'
import { menus } from '@/menu.ts';
import { useDispatch, useSelector } from 'react-redux';

const Slide = () => {
    const global = useSelector(state => state.global);
    const dispatch = useDispatch();
    const history = useHistory();
    const [currentPath, setCurrentPath] = useState(history.location.pathname);

    useEffect(() => {
        const unlisten = history.listen((location) => {
          setCurrentPath(location.pathname);
        });
    
        return () => {
          unlisten(); // 清除监听器，防止内存泄漏
        };
    }, [history]);

    return (
        <SlideWrapper>
            {
                menus.map((v, i)=> {
                    {
                        return <Panel key={i}>
                            {
                                v.menu ? <Menutitle>{v.menu}</Menutitle> : <></>
                            }
                            {
                                v.children.map((c,ci) => {
                                    return global.isHamburger
                                        ? 
                                        <PanelItemPop 
                                            content={c} 
                                            key={ci} 
                                            active={currentPath=== c.path ? 'true' : ''}
                                        />
                                        : 
                                        <PanelItem
                                            content={c} 
                                            key={ci} 
                                            active={currentPath=== c.path ? 'true' : ''}
                                        />
                                    
                                })
                            }
                            
                        </Panel>
                    }
                    return 
                })
            }
            <HamburgerPosition></HamburgerPosition>
        </SlideWrapper>
    )
}

const HamburgerPosition = styled(Hamburger)`
    position: absolute;
    top: 20px;
    right: -12px;
`

const SlideWrapper = styled.div`
    padding: 8px;
    transition: all .3s;
    position: relative;
`
const Panel = styled.div`
    font-size: 12px;
    color: ${({theme}) => theme.text2};
    overflow: hidden;
`
const Menutitle = styled.div`
    padding: 12px 0;
`

export default Slide