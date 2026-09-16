'use client';
import { TextField, TextArea, Button } from '@radix-ui/themes'

function NewIssuePage() {
    return (
        <div className="max-w-xl space-y-3">
            <h1>New Issue</h1>
            <TextField.Root placeholder="Enter issue title" >
            </TextField.Root>
            <TextArea placeholder="Description" />
            <Button variant="solid">Submit New Issue</Button>
        </div>
    )
}

export default NewIssuePage