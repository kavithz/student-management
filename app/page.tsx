"use client";

import { useEffect, useState } from "react";

type Student = {
  id: number;
  name: string;
  email: string;
  age: number;
  course: string;
  active: boolean;
  createdAt: string;
};

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  async function loadStudents() {
    const response = await fetch("/api/students");
    const data = await response.json();

    setStudents(data);
  }

  async function saveStudent(e: React.FormEvent) {
    e.preventDefault();

    if (editingId === null) {
      await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          age,
          course,
        }),
      });
    } else {
      const currentStudent = students.find(
        (student) => student.id === editingId
      );

      await fetch(`/api/students/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          age,
          course,
          active: currentStudent?.active ?? true,
        }),
      });
    }

    clearForm();
    loadStudents();
  }

  function editStudent(student: Student) {
    setEditingId(student.id);
    setName(student.name);
    setEmail(student.email);
    setAge(String(student.age));
    setCourse(student.course);
  }

  async function toggleActive(student: Student) {
    await fetch(`/api/students/${student.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: student.name,
        email: student.email,
        age: student.age,
        course: student.course,
        active: !student.active,
      }),
    });

    loadStudents();
  }

  async function deleteStudent(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) {
      return;
    }

    await fetch(`/api/students/${id}`, {
      method: "DELETE",
    });

    loadStudents();
  }

  function clearForm() {
    setName("");
    setEmail("");
    setAge("");
    setCourse("");
    setEditingId(null);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Student Management</h1>

          <p className="mt-2 text-gray-600">
            Add and manage student records.
          </p>
        </div>

        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">
            {editingId === null ? "Add New Student" : "Edit Student"}
          </h2>

          <form onSubmit={saveStudent} className="space-y-4">
            <input
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />

            <input
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
              >
                {editingId === null ? "Add Student" : "Update Student"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  onClick={clearForm}
                  className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Students</h2>

          {students.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500">
              No students found.
            </div>
          ) : (
            <div className="space-y-4">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {student.name}
                      </h3>

                      <p className="mt-1 text-gray-600">
                        {student.email}
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        Age: {student.age} · Course: {student.course}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        student.active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {student.active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="mt-5 flex gap-3 border-t border-gray-100 pt-4">
                    <button
                      onClick={() => editStudent(student)}
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => toggleActive(student)}
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      {student.active ? "Deactivate" : "Activate"}
                    </button>

                    <button
                      onClick={() => deleteStudent(student.id)}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}