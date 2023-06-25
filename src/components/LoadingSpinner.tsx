import React from 'react';
import { Spinner, Text, VStack } from '@chakra-ui/react';

type LoadingSpinnerProps = {
    message?: string;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => (
    <VStack
        left="50%"
        pos="absolute"
        top="50%"
        transform="translate(-50%, -50%)"
    >
        <Spinner
            color="primary"
            emptyColor="gray.200"
            size="xl"
            speed="0.65s"
            thickness="4px"
        />
        {message && (<Text>{message}</Text>)}
    </VStack>

);

export default LoadingSpinner;
