import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, Download, Calendar, User, FileText, Loader2 } from "lucide-react";
import { Button } from "../components/Button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { jsPDF } from "jspdf";

export function NoteDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    const fetchNoteDetails = async () => {
      if (!id) return;
      
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

      if (MOCK_NOTE_DETAILS[id]) {
        setNote(MOCK_NOTE_DETAILS[id]);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/notes/${id}`);
        const data = await response.json();
        if (response.ok) {
          setNote({
            title: data.title,
            subject: data.subject,
            description: data.description || "No description provided.",
            uploadDate: new Date(data.uploadDate).toLocaleDateString(),
            uploader: data.userEmail.split('@')[0],
            fileSize: "PDF File",
          });
        }
      } catch (error) {
        console.error("Error fetching note details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNoteDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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

  const handleDownload = () => {
    if (id && id !== "1" && id !== "2") {
      fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/notes/download/${id}`, {
        method: "PUT",
      }).catch((err) => console.error("Error incrementing downloads:", err));
    }

    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const margin = 20;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const contentWidth = pageWidth - (margin * 2);

      const primaryColor = "#3B82F6";
      const darkColor = "#1E293B";
      const lightColor = "#64748B";

      // Header Banner
      doc.setFillColor(59, 130, 246);
      doc.rect(0, 0, pageWidth, 40, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.text("NoteNest", margin, 20);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text("Premium Academic Study Resource", margin, 28);

      let currentY = 55;

      // Note Title
      doc.setTextColor(darkColor);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      
      const titleLines = doc.splitTextToSize(note.title, contentWidth);
      doc.text(titleLines, margin, currentY);
      currentY += (titleLines.length * 8);

      // Subject Badge
      doc.setFillColor(241, 245, 249);
      doc.rect(margin, currentY, 40, 7, "F");
      doc.setTextColor(59, 130, 246);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(note.subject.toUpperCase(), margin + 2, currentY + 5);

      // Metadata
      doc.setTextColor(lightColor);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`Uploaded by: ${note.uploader}`, margin + 45, currentY + 5);
      doc.text(`Date: ${note.uploadDate}`, margin + 115, currentY + 5);
      currentY += 15;

      // Divider Line
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 10;

      // Section header
      doc.setTextColor(darkColor);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Study Material & Content", margin, currentY);
      currentY += 8;

      // Body text content
      doc.setTextColor(30, 41, 59);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      const contentLines = doc.splitTextToSize(note.description, contentWidth);
      const lineHeight = 6;

      for (let i = 0; i < contentLines.length; i++) {
        if (currentY > pageHeight - margin - 15) {
          doc.addPage();
          
          doc.setFillColor(248, 250, 252);
          doc.rect(0, 0, pageWidth, 15, "F");
          doc.setTextColor(lightColor);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(8);
          doc.text(`NoteNest Study Guide: ${note.title}`, margin, 10);
          
          currentY = 25;
          doc.setFont("helvetica", "normal");
          doc.setFontSize(11);
          doc.setTextColor(30, 41, 59);
        }

        doc.text(contentLines[i], margin, currentY);
        currentY += lineHeight;
      }

      // Footer
      const pageCount = doc.internal.pages.length - 1;
      for (let p = 1; p <= pageCount; p++) {
        doc.setPage(p);
        doc.setTextColor(lightColor);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.text(`Page ${p} of ${pageCount}`, pageWidth - margin - 15, pageHeight - 10);
      }

      doc.save(`${note.title.replace(/\s+/g, "_")}_notes.pdf`);

      toast.success("Download Started", {
        description: `Downloading ${note.title} notes PDF.`,
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Download Error", {
        description: "Failed to generate note PDF. Please try again.",
      });
    }
  };

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

            <Button onClick={() => setShowReviewModal(true)} variant="primary" className="w-full sm:w-auto">
              <Download className="w-5 h-5" />
              Download PDF
            </Button>
          </div>

          <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">{note.description}</p>

            <h2 className="text-xl font-semibold mb-4">Document Preview</h2>
            <div className="bg-slate-100 rounded-xl p-4 sm:p-6 border border-border shadow-inner max-h-[500px] overflow-y-auto mb-4">
              <div className="bg-white rounded shadow-md p-6 sm:p-8 min-h-[500px] text-left relative font-sans text-slate-800">
                {/* Header mimicking the generated PDF */}
                <div className="bg-blue-500 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 p-4 sm:p-6 text-white mb-6 rounded-t">
                  <h4 className="font-bold text-lg">NoteNest</h4>
                  <p className="text-xs opacity-90">Premium Academic Study Resource</p>
                </div>
                
                {/* Note Details */}
                <h3 className="text-xl font-bold mb-2 text-slate-900">{note.title}</h3>
                <div className="flex flex-wrap gap-4 items-center mb-4 text-xs text-slate-500">
                  <span className="bg-slate-100 text-blue-600 px-2 py-0.5 rounded font-bold uppercase">
                    {note.subject}
                  </span>
                  <span>By: {note.uploader}</span>
                  <span>Date: {note.uploadDate}</span>
                </div>
                
                <hr className="border-slate-200 my-4" />
                
                <h4 className="font-bold text-sm text-slate-900 mb-2">Study Material & Content</h4>
                <div className="text-sm leading-relaxed whitespace-pre-wrap font-sans text-slate-700">
                  {note.description}
                </div>
              </div>
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

      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl border border-border max-w-lg w-full p-6 shadow-2xl relative">
            <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Review & Confirm Download
            </h3>
            
            <div className="bg-secondary/50 rounded-xl p-4 border border-border mb-5 text-left">
              <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Document Title</div>
              <div className="font-semibold text-foreground mb-3">{note.title}</div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Subject</div>
                  <div className="font-medium text-foreground">{note.subject}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Estimated Size</div>
                  <div className="font-medium text-foreground">~15 KB (PDF)</div>
                </div>
              </div>

              <div className="mt-3">
                <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Content Snippet</div>
                <div className="text-xs text-muted-foreground line-clamp-3 bg-white p-2 border border-border rounded italic">
                  "{note.description}"
                </div>
              </div>
            </div>

            <label className="flex items-start gap-3 text-left cursor-pointer mb-6">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border-border text-primary focus:ring-primary mt-0.5"
                checked={hasReviewed}
                onChange={(e) => setHasReviewed(e.target.checked)}
              />
              <span className="text-sm text-muted-foreground">
                I have reviewed the note summary and content snippet, and confirm I want to download this document.
              </span>
            </label>

            <div className="flex gap-3 justify-end">
              <Button 
                variant="secondary" 
                onClick={() => {
                  setShowReviewModal(false);
                  setHasReviewed(false);
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                disabled={!hasReviewed}
                onClick={() => {
                  handleDownload();
                  setShowReviewModal(false);
                  setHasReviewed(false);
                }}
              >
                <Download className="w-4 h-4" />
                Proceed to Download
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
