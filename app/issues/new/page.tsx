'use client';
import React from 'react';
import { TextField, Button, Callout, Text } from '@radix-ui/themes'
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>;

// Force Next.js to grab the specific named component instead of the module default
const SimpleMDE = dynamic(
    () => import('react-simplemde-editor').then((mod) => mod.SimpleMdeReact),
    {
        ssr: false,
        loading: () => <p>Loading editor...</p>
    }
);


function NewIssuePage() {
    const {
        register,
        handleSubmit,
        control,
        formState: {errors}
    } = useForm<IssueForm>({resolver: zodResolver(createIssueSchema)});
    const [error, setError] = React.useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const router = useRouter();
    return (
        <div className="max-w-xl">
            {error && <Callout.Root className="mb-5" color="red" variant="soft">
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className="space-y-3" onSubmit={handleSubmit(async (data) => {
                try {
                    setIsSubmitting(true);
                    await axios.post('/api/issues', data);
                    router.push('/issues');
                } catch (error) {
                    console.error('Error creating issue:', error);
                    setError('Failed to create issue. Please try again.');
                } finally {
                    setIsSubmitting(false);
                }
            })}>
                <h1>New Issue</h1>
                <TextField.Root placeholder="Enter issue title" {...register('title')} >

                </TextField.Root>
                <ErrorMessage>
                    {errors?.title?.message}
                </ErrorMessage>

                <Controller name="description" control={control}
                            render={({field}) => <SimpleMDE placeholder="Description" {...field} />}/>
                <ErrorMessage>
                    {errors?.description?.message}
                </ErrorMessage>

                <Button variant="solid" type="submit" disabled={isSubmitting}>
                    Submit New Issue {isSubmitting && <Spinner/>}
                </Button>
            </form>
        </div>
    )
}

export default NewIssuePage
