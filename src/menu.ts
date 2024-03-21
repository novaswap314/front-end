import { ReactElement } from 'react';
import Disconnect from './components/Icons/Disconnect.jsx';
import Compass from './components/Icons/Compass.jsx';
import Brush from './components/Icons/Brush.jsx';

type MenuItem = {
    menu?: string;
    children: {
        title: string;
        path: string;
        icon: React.ComponentType<any>;
    }[];
};

export const menus: MenuItem[] = [
    {
        children: [
            {
                title: 'Discovery',
                path: '/market',
                icon: Compass
            }
        ]
    },
    {
        children: [
            {
                title: 'Minting',
                path: '/mint',
                icon: Brush
            }
        ]
    },
    {
        menu: 'Wallet',
        children: [
            {
                title: 'Balance',
                path: '/balance',
                icon: Disconnect
            }
        ]
    },
    {
        menu: 'Explore',
        children: [
            {
                title: 'Explore',
                path: '/explore',
                icon: Disconnect
            }
        ]
    },
]