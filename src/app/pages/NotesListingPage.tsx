import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { NoteCard } from "../components/NoteCard";

const MOCK_NOTES = [
  {
    id: "1",
    title: "Introduction to Data Structures",
    subject: "Computer Science",
    description: "Comprehensive notes covering arrays, linked lists, stacks, queues, and their implementations with examples.",
    uploadDate: "March 15, 2026",
    uploader: "Sarah Johnson",
  },
  {
    id: "2",
    title: "Calculus I - Derivatives and Integrals",
    subject: "Mathematics",
    description: "Complete study guide for Calculus I including differentiation rules, integration techniques, and solved problems.",
    uploadDate: "March 10, 2026",
    uploader: "Michael Chen",
  },
  {
    id: "3",
    title: "Quantum Mechanics Fundamentals",
    subject: "Physics",
    description: "Detailed notes on wave functions, Schrödinger equation, and quantum states with practical examples.",
    uploadDate: "March 8, 2026",
    uploader: "Emily Parker",
  },
  {
    id: "4",
    title: "Object-Oriented Programming in Java",
    subject: "Computer Science",
    description: "OOP concepts including inheritance, polymorphism, encapsulation, and abstraction with Java code examples.",
    uploadDate: "March 5, 2026",
    uploader: "David Lee",
  },
  {
    id: "5",
    title: "Linear Algebra - Matrices and Vectors",
    subject: "Mathematics",
    description: "Study notes covering matrix operations, vector spaces, eigenvalues, and eigenvectors.",
    uploadDate: "March 1, 2026",
    uploader: "Jessica Williams",
  },
  {
    id: "6",
    title: "Thermodynamics and Statistical Mechanics",
    subject: "Physics",
    description: "Comprehensive notes on laws of thermodynamics, entropy, and statistical distributions.",
    uploadDate: "February 28, 2026",
    uploader: "Robert Brown",
  },
];

const SUBJECTS = [
  "All Subjects",
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Engineering",
  "Economics",
];

export function NotesListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");

  const filteredNotes = MOCK_NOTES.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject =
      selectedSubject === "All Subjects" || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Browse Study Notes</h1>
          <p className="text-muted-foreground">
            Explore thousands of study materials shared by students
          </p>
        </div>

        <div className="bg-white rounded-xl border border-border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search notes by subject or title..."
                className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="relative md:w-64">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <select
                className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {SUBJECTS.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4 text-muted-foreground">
          Showing {filteredNotes.length} {filteredNotes.length === 1 ? "note" : "notes"}
        </div>

        <div className="space-y-4">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => <NoteCard key={note.id} {...note} />)
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-border">
              <p className="text-muted-foreground">No notes found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
