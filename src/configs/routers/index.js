
import React from 'react';

import Home from '../../pages/Home'
import Metric from '../../pages/Metric'
import FileLog from '../../pages/FileLog'
import Visualize from '../../pages/Visualize'
import TopError from '../../pages/TopError'

export default [
    {
        path: '/',
        exact: true,
        component: () => <Home />,
    },
    {
        path: '/metric',
        exact: true,
        component: () => <Metric />,
    },
    {
        path: '/filelog',
        exact: true,
        component: () => <FileLog />,
    },
    {
        path: '/visualize',
        exact: true,
        component: () => <Visualize />,
    },
    {
        path: '/toperror',
        exact: true,
        component: () => <TopError />,
    }
]