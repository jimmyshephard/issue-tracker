'use client';
import { TextField, Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

function NewIssuePage() {
    return (
        <div className="max-w-xl space-y-3">
            <h1>New Issue</h1>
            <TextField.Root placeholder="Enter issue title" >
            </TextField.Root>
            <SimpleMDE placeholder="Description" />
            <Button variant="solid">Submit New Issue</Button>
        </div>
    )
}

export default NewIssuePage