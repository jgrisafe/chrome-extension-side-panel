import React, { useEffect, useRef } from 'react';
import { Box, Container, Heading } from "@chakra-ui/react";

import LoadingSpinner from 'src/components/LoadingSpinner';
import { useAppSelector } from "src/state/hooks/useAppDispatch";
import PortNames from 'src/types/PortNames';

const AppTray = () => {
  const port = useRef<chrome.runtime.Port>();
  const [isConnected, setIsConnected] = React.useState(false);
  const cursorpos = useAppSelector(state => state.content.cursorPosition)

  const connect = async () => {
    const sidePanelPort = chrome.runtime.connect({ name: PortNames.SidePanelPort });
    port.current = sidePanelPort;
    sidePanelPort.postMessage({ type: 'init', message: 'init from panel open' });

    sidePanelPort.onMessage.addListener(message => {
      if (message.type === 'handle-init') {
        setIsConnected(true);
      }

      if (message.type === 'tab-updated') {
        sidePanelPort.postMessage({ type: 'init', message: 'init from tab connected' });
      }
    });
  };

  useEffect(() => {
    connect();
  }, []);

  if (!isConnected) {
    return (
      <Box height="100vh">
        <LoadingSpinner />
      </Box>
    );
  }

  return (
      <Container textAlign={'center'}>
        <Heading>Side Panel Tutorial</Heading>
        <Box mt={8}>
          <Heading as={"h2"} size={"md"}>Cursor Position</Heading>
          <Heading>X: {cursorpos.x}</Heading>
          <Heading>Y: {cursorpos.y}</Heading>
        </Box>
      </Container>
  );
};

export default AppTray;
