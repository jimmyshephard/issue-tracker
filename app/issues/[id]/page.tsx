import React from 'react'
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import delay from 'delay';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import ReactMarkdown from 'react-markdown';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

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
                <Heading>{issue.title}</Heading>
                <Flex gap='4' my='2' align="start">
                    <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                    <Text>{issue.createdAt.toDateString()}</Text>
                </Flex>
                <Card className='prose'>
                    <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Card>
            </Box>
            <Box>
                <Button>
                    <Pencil2Icon/>
                    <Link href={`/issues/${issue.id}/edit`}>
                        Edit Issue
                    </Link>
                </Button>
            </Box>

        </Grid>
    )
}
export default IssueDetailPage
