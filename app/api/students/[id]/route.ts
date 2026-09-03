import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (Number.isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid student ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const student = await prisma.student.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        email: body.email,
        age: Number(body.age),
        course: body.course,
        active: Boolean(body.active),
      },
    });

    return NextResponse.json(student);
  } catch (error) {
    console.error("PUT student error:", error);

    return NextResponse.json(
      { error: "Failed to update student" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (Number.isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid student ID" },
        { status: 400 }
      );
    }

    await prisma.student.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("DELETE student error:", error);

    return NextResponse.json(
      { error: "Failed to delete student" },
      { status: 500 }
    );
  }
}