import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from '@/prisma/client';

const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
    description: z.string().min(1, "Description is required"),
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 }); 
    }

    const { title, description } = validation.data;
    const newIssue = await prisma.issue.create({
        data: {
            title,
            description,
        },
    });

    return NextResponse.json(newIssue, { status: 201 });

}