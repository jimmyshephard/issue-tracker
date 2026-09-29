import React from 'react'
import { Issue } from '@prisma/client';
import ReactMarkdown from 'react-markdown';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { IssueStatusBadge } from '@/app/components';

const IssueDetails = ({ issue }: { issue: Issue }) => {
    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex gap='4' my='2' align="start">
                <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose max-w-full'>
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </>
    )
}
export default IssueDetails
