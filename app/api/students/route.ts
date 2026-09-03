import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(students);
  } catch (error) {
    console.error("GET students error:", error);

    return NextResponse.json(
      { error: "Failed to load students" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
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
  } catch (error) {
    console.error("POST student error:", error);

    return NextResponse.json(
      { error: "Failed to create student" },
      { status: 500 }
    );
  }
}