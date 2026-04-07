import { Link, useLocation } from "react-router";
import { BookOpen, Upload, Home, LogIn, LayoutDashboard } from "lucide-react";

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-xl text-foreground">NoteNest</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive("/") && location.pathname === "/"
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              Home
            </Link>
            <Link
              to="/notes"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive("/notes")
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              Notes
            </Link>
            <Link
              to="/upload"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive("/upload")
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              Upload
            </Link>
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive("/dashboard")
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              Dashboard
            </Link>
          </div>

          <Link
            to="/login"
            className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Login</span>
          </Link>
        </div>

        <div className="md:hidden flex gap-2 pb-3">
          <Link
            to="/"
            className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 ${
              isActive("/") && location.pathname === "/"
                ? "bg-primary/10 text-primary"
                : "text-foreground hover:bg-secondary"
            }`}
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link
            to="/notes"
            className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 ${
              isActive("/notes")
                ? "bg-primary/10 text-primary"
                : "text-foreground hover:bg-secondary"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Notes
          </Link>
          <Link
            to="/upload"
            className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 ${
              isActive("/upload")
                ? "bg-primary/10 text-primary"
                : "text-foreground hover:bg-secondary"
            }`}
          >
            <Upload className="w-4 h-4" />
            Upload
          </Link>
          <Link
            to="/dashboard"
            className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 ${
              isActive("/dashboard")
                ? "bg-primary/10 text-primary"
                : "text-foreground hover:bg-secondary"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
