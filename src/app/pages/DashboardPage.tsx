import { useState } from "react";
import { FileText, Edit, Trash2, Plus } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../components/Button";

const MOCK_USER_NOTES = [
  {
    id: "1",
    title: "Introduction to Data Structures",
    subject: "Computer Science",
    uploadDate: "March 15, 2026",
    downloads: 245,
  },
  {
    id: "2",
    title: "Advanced Algorithms and Analysis",
    subject: "Computer Science",
    uploadDate: "February 28, 2026",
    downloads: 189,
  },
  {
    id: "3",
    title: "Database Management Systems",
    subject: "Computer Science",
    uploadDate: "February 20, 2026",
    downloads: 312,
  },
];

export function DashboardPage() {
  const [notes, setNotes] = useState(MOCK_USER_NOTES);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      setNotes(notes.filter((note) => note.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
            <p className="text-muted-foreground">Manage your uploaded notes</p>
          </div>
          <Link to="/upload">
            <Button variant="primary">
              <Plus className="w-5 h-5" />
              Upload New Note
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="text-muted-foreground mb-1">Total Uploads</div>
            <div className="text-3xl font-bold text-primary">{notes.length}</div>
          </div>
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="text-muted-foreground mb-1">Total Downloads</div>
            <div className="text-3xl font-bold text-primary">
              {notes.reduce((sum, note) => sum + note.downloads, 0)}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="text-muted-foreground mb-1">Average Rating</div>
            <div className="text-3xl font-bold text-primary">4.7</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-xl font-semibold">Your Uploaded Notes</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3 text-left">Subject</th>
                  <th className="px-6 py-3 text-left">Upload Date</th>
                  <th className="px-6 py-3 text-left">Downloads</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {notes.length > 0 ? (
                  notes.map((note) => (
                    <tr key={note.id} className="hover:bg-secondary/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <span className="font-medium">{note.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-accent text-accent-foreground">
                          {note.subject}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{note.uploadDate}</td>
                      <td className="px-6 py-4 text-muted-foreground">{note.downloads}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            className="p-2 hover:bg-secondary rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-5 h-5 text-muted-foreground hover:text-primary" />
                          </button>
                          <button
                            className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                            title="Delete"
                            onClick={() => handleDelete(note.id)}
                          >
                            <Trash2 className="w-5 h-5 text-muted-foreground hover:text-destructive" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                      No notes uploaded yet. Start by uploading your first note!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
