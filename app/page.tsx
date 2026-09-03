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

  async function loadStudents() {
    const response = await fetch("/api/students");
    const data = await response.json();
    setStudents(data);
  }

  async function addStudent(e: React.FormEvent) {
    e.preventDefault();

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

    setName("");
    setEmail("");
    setAge("");
    setCourse("");

    loadStudents();
  }

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Student Management
          </h1>
          <p className="mt-2 text-gray-600">
            Add and manage student records using react,next.js and neon.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-5">
            Add New Student
          </h2>

          <form onSubmit={addStudent} className="space-y-4">
            <input
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />

            <input
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Add Student
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Students
          </h2>

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
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {student.name}
                      </h3>

                      <p className="mt-1 text-gray-600">
                        {student.email}
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        Age: {student.age} · Course: {student.course}
                      </p>
                    </div>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      Active
                    </span>
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

