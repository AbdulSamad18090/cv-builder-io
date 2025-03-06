import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background/50 py-12 border-t">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold text-primary">Builder.io</h2>
          <p className="mt-2 text-sm ">
            Create professional resumes effortlessly and land your dream job.
          </p>
          <Button className="mt-4">Get Started</Button>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-lg font-medium text-primary">Features</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li>Resume Editor</li>
            <li>AI Resume Assistant</li>
            <li>ATS-Friendly Check</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-medium text-primary">Resources</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <Link href="/blog" className="">
                Resume Tips
              </Link>
            </li>
            <li>
              <Link href="/career-guide" className="">
                Career Guide
              </Link>
            </li>
            <li>
              <Link href="/faq" className="">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Support & Socials */}
        <div>
          <h3 className="text-lg font-medium text-primary">Support</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <Link href="/contact" className="">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="">
                Terms & Conditions
              </Link>
            </li>
          </ul>
          {/* <div className="flex space-x-4 mt-4">
            <a href="#" className=" ">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className=" ">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className=" ">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className=" ">
              <Instagram className="w-5 h-5" />
            </a>
          </div> */}
        </div>
      </div>

      {/* Bottom Section */}
      <Separator className="my-6" />
      <div className="text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} CV Builder. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
