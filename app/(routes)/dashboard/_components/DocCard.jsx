import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
const DocCard = ({ doc, type }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          {type === "cv" ? (
            <FileText className="mr-2 h-4 w-4 text-blue-500" />
          ) : (
            <File className="mr-2 h-4 w-4 text-green-500" />
          )}
          <CardTitle className="text-lg">{doc.title}</CardTitle>
        </div>
        <Badge variant={doc.status === "Complete" ? "default" : "outline"}>
          {doc.status}
        </Badge>
      </CardHeader>
      <CardContent className="pb-2">
        <CardDescription>Last modified: {doc.lastModified}</CardDescription>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="flex-1">
            <Edit className=" h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Download className=" h-4 w-4" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 hover:text-red-700 flex-1"
          >
            <Trash2 className=" h-4 w-4" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DocCard;
