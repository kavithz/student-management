import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const student = await prisma.student.update({
    where: {
      id: Number(params.id),
    },
    data: {
      name: body.name,
      email: body.email,
      age: Number(body.age),
      course: body.course,
      active: body.active,
    },
  });

  return NextResponse.json(student);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.student.delete({
    where: {
      id: Number(params.id),
    },
  });

  return NextResponse.json({
    message: "Student deleted successfully",
  });
}