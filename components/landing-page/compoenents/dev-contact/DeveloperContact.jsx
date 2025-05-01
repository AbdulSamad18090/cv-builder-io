import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Github,
  Mail,
  Linkedin,
  MapPin,
  Phone,
  Globe,
  Calendar,
} from "lucide-react";

const DeveloperContact = () => {
  return (
    <div className="container mx-auto px-6 py-10 text-center">
      <h1 className="text-5xl font-semibold mb-6">
        <span className="text-3xl">Meet the</span>{" "}
        <span className="text-primary uppercase">Mind</span>{" "}
        <span className="text-3xl">Behind the</span>{" "}
        <span className="text-primary uppercase">Code</span>
      </h1>
      <Card className="mb-10 text-left">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-3 gap-0">
            {/* Profile Section */}
            <div className="bg-muted rounded-l-sm p-6 flex flex-col items-center justify-center text-center border-r border-muted">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-background mb-4">
                <img
                  src="/me3.jpg"
                  alt="Developer Image"
                  className="object-cover w-full h-full brightness-75"
                />
              </div>

              <h3 className="text-xl font-semibold">Abdul Samad</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Software Engineer
              </p>

              <Badge variant="outline" className="mb-4">
                Available for hire
              </Badge>

              <div className="flex justify-center space-x-3 w-full">
                <a
                  target="_blank"
                  href="https://github.com/AbdulSamad18090"
                  aria-label="GitHub profile"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/abdul-samad-7b0069267"
                  aria-label="LinkedIn profile"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  target="_blank"
                  href="https://abdulsamad-portfolio.vercel.app/"
                  aria-label="Personal website"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Globe className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Contact Information */}
            <div className="p-6 md:col-span-2">
              <h2 className="text-lg font-semibold mb-4">
                Contact Information
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>abdulsamad18090@gmail.com</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+92 (334) 5455964</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Islamabad, Pakistan</span>
                </div>
              </div>

              <Separator className="my-4" />

              <h2 className="text-lg font-semibold mb-3">
                Professional Summary
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Experienced software engineer with 8+ years specializing in
                full-stack development. Proficient in React, Node.js, and cloud
                architecture. Passionate about creating scalable solutions and
                mentoring junior developers.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>2+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>Remote / On-site</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeveloperContact;
