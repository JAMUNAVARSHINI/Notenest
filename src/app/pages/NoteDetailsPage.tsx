import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, Download, Calendar, User, FileText } from "lucide-react";
import { Button } from "../components/Button";

const MOCK_NOTE_DETAILS: Record<string, any> = {
  "1": {
    title: "Introduction to Data Structures",
    subject: "Computer Science",
    description:
      "Comprehensive notes covering arrays, linked lists, stacks, queues, and their implementations with examples. This study guide includes detailed explanations of fundamental data structures, time and space complexity analysis, and practical coding examples in multiple programming languages.",
    uploadDate: "March 15, 2026",
    uploader: "Sarah Johnson",
    fileSize: "2.4 MB",
  },
  "2": {
    title: "Calculus I - Derivatives and Integrals",
    subject: "Mathematics",
    description:
      "Complete study guide for Calculus I including differentiation rules, integration techniques, and solved problems. Covers limits, continuity, derivatives of elementary functions, chain rule, implicit differentiation, and definite and indefinite integrals.",
    uploadDate: "March 10, 2026",
    uploader: "Michael Chen",
    fileSize: "3.1 MB",
  },
};

export function NoteDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = id ? MOCK_NOTE_DETAILS[id] : null;

  if (!note) {
    return (
      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground mb-4">Note not found</p>
          <Button onClick={() => navigate("/notes")} variant="primary">
            Back to Notes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/notes"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Notes
        </Link>

        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="p-8 border-b border-border">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">{note.title}</h1>
                <span className="inline-flex items-center px-3 py-1 rounded-lg bg-accent text-accent-foreground">
                  {note.subject}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Uploaded by {note.uploader}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{note.uploadDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>{note.fileSize}</span>
              </div>
            </div>

            <Button variant="primary" className="w-full sm:w-auto">
              <Download className="w-5 h-5" />
              Download PDF
            </Button>
          </div>

          <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">{note.description}</p>

            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="bg-secondary rounded-lg p-12 text-center border-2 border-dashed border-border">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                PDF preview would be displayed here
              </p>
              <p className="text-muted-foreground mt-2">
                Download the file to view the complete document
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl border border-border p-8">
          <h2 className="text-xl font-semibold mb-4">About the Uploader</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-lg">{note.uploader}</div>
              <div className="text-muted-foreground">Active contributor since 2024</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
