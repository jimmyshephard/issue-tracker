'use client';

import axios from 'axios';
import React from 'react'
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const DeleteIssueButton = ({issueId}: { issueId: number; }) => {
    const router = useRouter();
    const [error, setError] = React.useState<boolean>(false);

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/issues/${issueId}`);
            router.push('/issues'); // Redirect to the issues list page after deletion
        } catch (error) {
            console.error('Error deleting issue:', error);
            setError(true);
        }
    };

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red">
                        Delete Issue
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>Confirm Deletion</AlertDialog.Content>
                <AlertDialog.Content>
                    <AlertDialog.Description>
                        Are you sure you want to delete this issue? This action cannot be
                        undone.
                    </AlertDialog.Description>
                    <Flex mt="4" gap='3'>
                        <AlertDialog.Cancel><Button variant='soft' color="gray">Cancel</Button></AlertDialog.Cancel>
                        <AlertDialog.Action><Button variant='solid' color="red" onClick={handleDelete}>Delete
                            Issue</Button></AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>
                        An error occurred while deleting the issue.
                    </AlertDialog.Description>
                    <Button color="gray" mt="2" variant="soft" onClick={() => setError(false)}>
                        OK
                    </Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    );
}
export default DeleteIssueButton
