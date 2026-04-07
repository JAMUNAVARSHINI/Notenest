import { FileText, Download, Calendar } from "lucide-react";
import { Link } from "react-router";

interface NoteCardProps {
  id: string;
  title: string;
  subject: string;
  description: string;
  uploadDate: string;
  uploader: string;
}

export function NoteCard({ id, title, subject, description, uploadDate, uploader }: NoteCardProps) {
  return (
    <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <FileText className="w-6 h-6 text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          <Link to={`/notes/${id}`} className="hover:text-primary transition-colors">
            <h3 className="font-semibold mb-1 truncate">{title}</h3>
          </Link>

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-accent text-accent-foreground">
              {subject}
            </span>
            <span className="text-muted-foreground">by {uploader}</span>
          </div>

          <p className="text-muted-foreground mb-3 line-clamp-2">{description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{uploadDate}</span>
            </div>

            <Link
              to={`/notes/${id}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
