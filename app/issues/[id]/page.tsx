import React from 'react'
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import delay from 'delay';
import { Box, Grid } from '@radix-ui/themes';
import EditIssueButton from '@/app/issues/[id]/EditIssueButton';
import IssueDetails from '@/app/issues/[id]/IssueDetails';

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
        <Grid columns={{initial: '1', md: '2'}} gap='5'>
            <Box>
                <IssueDetails issue={issue}/>
            </Box>
            <Box>
                <EditIssueButton issueId={issue.id}/>
            </Box>

        </Grid>
    )
}
export default IssueDetailPage
