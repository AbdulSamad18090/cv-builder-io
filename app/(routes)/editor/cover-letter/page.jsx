"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, PlusCircle, Trash2 } from "lucide-react";
import Loader from "@/components/loader/Loader";
import { getSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import PrintPdfButton from "../resume/_components/PrintPdfButton";
import Preview from "../resume/_components/Preview";
import ChangeTemplateButton from "../resume/_components/ChangeTemplateButton";

const defaultFormData = {
  fullName: "",
  email: "",
  phone: "",
  recipientName: "",
  companyName: "",
  position: "",
  introduction: "",
  bodyParagraphs: [""],
  closingParagraph: "",
};

const CoverLetterEditor = () => {
  const [formData, setFormData] = useState(() => {
    // Try to load data from sessionStorage on initial render
    try {
      const storedData = sessionStorage.getItem("cover-letter-editor-data");
      return storedData ? JSON.parse(storedData) : defaultFormData;
    } catch (error) {
      console.error("Error loading data from sessionStorage:", error);
      return defaultFormData;
    }
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [printRef, setPrintRef] = useState(null);
  const pathname = usePathname();
  const isLetterEditor = pathname.includes("resume");

  useEffect(() => {
    // This only runs on client
    const savedData = sessionStorage.getItem("cover-letter-editor-data");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "cover-letter-editor-data",
      JSON.stringify(formData)
    );
  }, [formData]);

  // console.log("Form Data =>", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBodyParagraphChange = (index, value) => {
    const updatedParagraphs = [...formData.bodyParagraphs];
    updatedParagraphs[index] = value;
    setFormData({
      ...formData,
      bodyParagraphs: updatedParagraphs,
    });
  };

  const addBodyParagraph = () => {
    setFormData({
      ...formData,
      bodyParagraphs: [...formData.bodyParagraphs, ""],
    });
  };

  const removeBodyParagraph = (index) => {
    if (formData.bodyParagraphs.length > 1) {
      const updatedParagraphs = formData.bodyParagraphs.filter(
        (_, i) => i !== index
      );
      setFormData({
        ...formData,
        bodyParagraphs: updatedParagraphs,
      });
    }
  };

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push("/auth");
      } else {
        setLoading(false);
      }
    };
    checkSession();
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <Loader
          size={30}
          speed={700}
          loading={true}
          title="Preparing Editor & Template..."
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">
            Cover Letter Editor
          </CardTitle>
          <CardDescription>
            Create professional cover letters with ease
          </CardDescription>
        </CardHeader>
        <Alert className="border-x-0 rounded-none">
          <div className="flex items-center gap-4">
            <InfoIcon size={25} className="text-primary" />
            <AlertTitle className="m-0 p-0 text-lg">
              Tips for an Effective Cover Letter
            </AlertTitle>
          </div>
          <AlertDescription>
            <ul className="list-disc space-y-1 mt-2 pl-16">
              <li>Tailor your letter to the specific job and company</li>
              <li>Keep it concise - aim for 3-4 paragraphs total</li>
              <li>Highlight relevant skills and experiences</li>
              <li>Show enthusiasm for the role and company</li>
              <li>Proofread carefully before submitting</li>
            </ul>
          </AlertDescription>
        </Alert>

        <div className="w-full flex justify-end flex-wrap gap-6 px-6 pt-6">
          <ChangeTemplateButton
            type={isLetterEditor ? "resume" : "cover-letter"}
            variant="outline"
          />
          <PrintPdfButton printRef={printRef} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Your Information */}
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-lg">Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                />
              </div>
            </CardContent>
          </Card>

          {/* Recipient Information */}
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-lg">Recipient Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient's Name</Label>
                <Input
                  id="recipientName"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="ABC Company"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Software Engineer"
                />
              </div>
            </CardContent>
          </Card>

          {/* Cover Letter Content */}
          <Card className="md:col-span-2 bg-background">
            <CardHeader>
              <CardTitle className="text-lg">Cover Letter Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="introduction">Introduction Paragraph</Label>
                <Textarea
                  id="introduction"
                  name="introduction"
                  value={formData.introduction}
                  onChange={handleChange}
                  placeholder="I am writing to apply for the [position] role at [company]..."
                  rows={3}
                  className="resize-none"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Body Paragraphs</Label>
                  <Button
                    onClick={addBodyParagraph}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Paragraph
                  </Button>
                </div>

                {formData.bodyParagraphs.map((paragraph, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`bodyParagraph-${index}`}>
                        Paragraph {index + 1}
                      </Label>
                      {formData.bodyParagraphs.length > 1 && (
                        <Button
                          onClick={() => removeBodyParagraph(index)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <Textarea
                      id={`bodyParagraph-${index}`}
                      value={paragraph}
                      onChange={(e) =>
                        handleBodyParagraphChange(index, e.target.value)
                      }
                      placeholder={`Body paragraph ${index + 1}...`}
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="closingParagraph">Closing Paragraph</Label>
                <Textarea
                  id="closingParagraph"
                  name="closingParagraph"
                  value={formData.closingParagraph}
                  onChange={handleChange}
                  placeholder="I am excited about the opportunity to join your team and would welcome the chance to discuss my application further..."
                  rows={3}
                  className="resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </Card>

      {/* Preview */}
      <div className="hidden">
        <Preview
          data={formData}
          sendDataToParent={(data) => setPrintRef(data)}
        />
      </div>
    </div>
  );
};

export default CoverLetterEditor;
