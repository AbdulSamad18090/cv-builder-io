"use client";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Download,
  Edit,
  Trash2,
  FileText,
  File,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DocCard from "./_components/DocCard";

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [coverLetters, setCoverLetters] = useState([
    {
      id: 1,
      title: "Google Application",
      lastModified: "2025-03-16",
      status: "Complete",
    },
    {
      id: 2,
      title: "Microsoft Cover Letter",
      lastModified: "2025-03-12",
      status: "Draft",
    },
    {
      id: 3,
      title: "Amazon Application",
      lastModified: "2025-03-08",
      status: "Complete",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  // Sample data for CVs and cover letters
  const [cvs, setCvs] = useState([
    {
      id: 1,
      title: "Software Engineer CV",
      lastModified: "2025-03-15",
      status: "Complete",
    },
    {
      id: 2,
      title: "Product Manager CV",
      lastModified: "2025-03-10",
      status: "Draft",
    },
    {
      id: 3,
      title: "UX Designer CV",
      lastModified: "2025-03-05",
      status: "Complete",
    },
    {
      id: 4,
      title: "Data Analyst CV",
      lastModified: "2025-02-28",
      status: "Draft",
    },
  ]);

  // Filter documents based on search query
  const filteredCvs = cvs.filter((cv) =>
    cv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCoverLetters = coverLetters.filter((letter) =>
    letter.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
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

  const renderDocumentCard = (doc, type) => (
    <DocCard key={doc.id} doc={doc} type={type} />
  );

  if (loading) {
    return (
      <div className="h-screen w-full">
        <Loader
          size={30}
          speed={700}
          loading={true}
          title="Fetching User Details ..."
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 ">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={session?.user?.image} alt={session?.user?.name} />
            <AvatarFallback>
              {session?.user?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{session?.user?.name}</h2>
            <p className="text-muted-foreground text-sm">
              {session?.user?.email}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="flex mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search documents..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <Tabs defaultValue="cvs" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="cvs">CVs ({filteredCvs.length})</TabsTrigger>
          <TabsTrigger value="cover-letters">
            Cover Letters ({filteredCoverLetters.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cvs" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCvs.length > 0 ? (
              filteredCvs.map((cv) => renderDocumentCard(cv, "cv"))
            ) : (
              <Card className="col-span-full p-6 text-center">
                <p className="text-gray-500">
                  No CVs found. Create your first CV!
                </p>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="cover-letters" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCoverLetters.length > 0 ? (
              filteredCoverLetters.map((letter) =>
                renderDocumentCard(letter, "cover-letter")
              )
            ) : (
              <Card className="col-span-full p-6 text-center">
                <p className="text-gray-500">
                  No cover letters found. Create your first cover letter!
                </p>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
