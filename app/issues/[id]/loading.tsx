import React from 'react'
import { Card, Flex, Box } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';

const Loading = () => {
    return (
        <Box className='max-w-xl'>
            <Skeleton/>
            <Flex gap='4' my='2' align="start">
                <Skeleton width="5rem"/>
                <Skeleton width="8rem"/>
            </Flex>
            <Card className='prose'>
                <Skeleton count={3}/>
            </Card>
        </Box>
    )
}
export default Loading
