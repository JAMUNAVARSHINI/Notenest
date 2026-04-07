import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { NotesListingPage } from "./pages/NotesListingPage";
import { UploadNotesPage } from "./pages/UploadNotesPage";
import { NoteDetailsPage } from "./pages/NoteDetailsPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { DashboardPage } from "./pages/DashboardPage";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: LandingPage },
      { path: "notes", Component: NotesListingPage },
      { path: "notes/:id", Component: NoteDetailsPage },
      { path: "upload", Component: UploadNotesPage },
      { path: "dashboard", Component: DashboardPage },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
]);
