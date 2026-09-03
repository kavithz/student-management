import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const students = await prisma.student.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json(students);
}

export async function POST(request: Request) {
  const body = await request.json();

  const student = await prisma.student.create({
    data: {
      name: body.name,
      email: body.email,
      age: Number(body.age),
      course: body.course,
    },
  });

  return NextResponse.json(student, { status: 201 });
}