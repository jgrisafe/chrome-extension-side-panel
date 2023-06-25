import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ChakraProvider } from "@chakra-ui/react";

import { createStoreProxy } from 'src/state/store';
import PortNames from 'src/types/PortNames';

import SidePanelApp from './SidePanelApp';
 
const store = createStoreProxy(PortNames.ContentPort);
const container = document.getElementById('root');

store.ready().then(() => {
    if (container == null) {
        throw new Error('Root container not found');
    }

    const root = createRoot(container);

    root.render(
        <Provider store={store}>
            <ChakraProvider>
                <SidePanelApp />
            </ChakraProvider>
        </Provider>
    );
});

