'use client';
import React from 'react';
import { TextField, Button, Callout } from '@radix-ui/themes'
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export interface IssueForm {
    title: string;
    description: string;
}

// Force Next.js to grab the specific named component instead of the module default
const SimpleMDE = dynamic(
    () => import('react-simplemde-editor').then((mod) => mod.SimpleMdeReact),
    {
        ssr: false,
        loading: () => <p>Loading editor...</p>
    }
);


function NewIssuePage() {
    const { register, handleSubmit, control } = useForm<IssueForm>();
    const [error, setError] = React.useState<string | null>(null);

    const router = useRouter();
    return (
        <div className="max-w-xl">
            {error && <Callout.Root className="mb-5" color="red" variant="soft">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className="space-y-3" onSubmit={handleSubmit(async (data) => {
                try {
                    await axios.post('/api/issues', data);
                    router.push('/issues');
                } catch (error) {
                    console.error('Error creating issue:', error);
                    setError('Failed to create issue. Please try again.');
                }
            })}>
                <h1>New Issue</h1>
                <TextField.Root placeholder="Enter issue title" {...register('title')} >
                </TextField.Root>
                <TextField.Root placeholder="Enter issue title" {...register('title')} >
                </TextField.Root>
                <Controller name="description" control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
                <Button variant="solid" type="submit">
                    Submit New Issue
                </Button>
            </form >
        </div>



    )
}

export default NewIssuePage