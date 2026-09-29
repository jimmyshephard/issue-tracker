import React from 'react'
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import delay from 'delay';
import { Box, Flex, Grid } from '@radix-ui/themes';
import EditIssueButton from '@/app/issues/[id]/EditIssueButton';
import IssueDetails from '@/app/issues/[id]/IssueDetails';
import DeleteIssueButton from '@/app/issues/[id]/DeleteIssueButton';

interface Props {
    params: Promise<{ id: string }>
}

const IssueDetailPage = async ({params}: Props) => {
    const {id} = await params;

    if (!Number.parseInt(id)) {
        notFound();
    }

    await delay(1000); // Simulate a delay of 3 seconds
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(id)
        }
    });

    if (!issue) {
        notFound();
    }

    return (
        <Grid columns={{initial: '1', sm: '5'}} gap='5'>
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue}/>
            </Box>
            <Box>
                <Flex direction="column" gap="4">
                    <EditIssueButton issueId={issue.id}/>
                    <DeleteIssueButton issueId={issue.id}/>
                </Flex>
            </Box>

        </Grid>
    )
}
export default IssueDetailPage
