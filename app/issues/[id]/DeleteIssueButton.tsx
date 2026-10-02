'use client';

import axios from 'axios';
import React from 'react'
import { AlertDialog, Button, Flex, Spinner } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const DeleteIssueButton = ({issueId}: { issueId: number; }) => {
    const router = useRouter();
    const [error, setError] = React.useState<boolean>(false);
    const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await axios.delete(`/api/issues/${issueId}`);
            router.push('/issues'); // Redirect to the issues list page after deletion
        } catch (error) {
            console.error('Error deleting issue:', error);
            setError(true);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red" disabled={isDeleting}>
                        Delete Issue
                        {isDeleting && <Spinner size="2" />}
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>Confirm Deletion</AlertDialog.Content>
                <AlertDialog.Content>
                    <AlertDialog.Description>
                        Are you sure you want to delete this issue? This action cannot be
                        undone.
                    </AlertDialog.Description>
                    <Flex mt="4" gap='3'>
                        <AlertDialog.Cancel><Button variant='soft' color="gray" disabled={isDeleting}>Cancel</Button></AlertDialog.Cancel>
                        <AlertDialog.Action><Button variant='solid' color="red" onClick={handleDelete} disabled={isDeleting}>
                            Delete Issue
                        </Button></AlertDialog.Action>
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
