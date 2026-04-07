import { Link } from "react-router";
import { ArrowRight, BookOpen, Upload, Users } from "lucide-react";
import { Button } from "../components/Button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Share and Access Study Notes Easily
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground">
                  A platform for students to upload, explore, and download study materials.
                  Join thousands of students collaborating to succeed together.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/notes">
                  <Button variant="primary" className="w-full sm:w-auto">
                    <BookOpen className="w-5 h-5" />
                    Explore Notes
                  </Button>
                </Link>
                <Link to="/upload">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    <Upload className="w-5 h-5" />
                    Upload Notes
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="font-bold">10,000+</div>
                  <div className="text-muted-foreground">Study Notes</div>
                </div>
                <div>
                  <div className="font-bold">5,000+</div>
                  <div className="text-muted-foreground">Students</div>
                </div>
                <div>
                  <div className="font-bold">50+</div>
                  <div className="text-muted-foreground">Subjects</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=600&fit=crop"
                  alt="Students studying together"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-border hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">5,000+ Active Students</div>
                    <div className="text-muted-foreground">Join our community</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl">Browse Notes</h3>
              <p className="text-muted-foreground">
                Search through thousands of study materials across various subjects and topics.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl">Upload & Share</h3>
              <p className="text-muted-foreground">
                Contribute your notes and help fellow students succeed in their studies.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl">Collaborate</h3>
              <p className="text-muted-foreground">
                Connect with other students and build a supportive learning community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our community of students sharing knowledge and helping each other succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button variant="primary" className="w-full sm:w-auto">
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/notes">
                <Button variant="secondary" className="w-full sm:w-auto">
                  Browse Notes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
