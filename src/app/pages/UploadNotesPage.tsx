import { useState } from "react";
import { Upload, FileText, ArrowLeft } from "lucide-react";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router";

const SUBJECTS = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Engineering",
  "Economics",
  "History",
  "Literature",
  "Business",
];

export function UploadNotesPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    subject: "Computer Science",
    description: "",
    file: null as File | null,
  });
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, file });
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/notes"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Notes
        </Link>

        <div className="bg-white rounded-xl border border-border p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Upload Study Notes</h1>
              <p className="text-muted-foreground">Share your notes with the community</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter note title..."
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block mb-2">
                Subject
              </label>
              <select
                id="subject"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              >
                {SUBJECTS.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block mb-2">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Describe what topics are covered in these notes..."
                rows={5}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block mb-2">Upload File (PDF)</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                  required
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  {fileName ? (
                    <>
                      <FileText className="w-12 h-12 text-primary mb-3" />
                      <p className="text-foreground font-medium">{fileName}</p>
                      <p className="text-muted-foreground mt-1">Click to change file</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-muted-foreground mb-3" />
                      <p className="text-foreground font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-muted-foreground mt-1">PDF files only (MAX. 10MB)</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" variant="primary" className="flex-1">
                <Upload className="w-5 h-5" />
                Upload Notes
              </Button>
              <Link to="/notes" className="flex-1">
                <Button type="button" variant="secondary" className="w-full">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
