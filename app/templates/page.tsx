"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileCode, Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function TemplatesPage() {
  const [templates] = useState([
    {
      id: 1,
      name: "Student Enrollment Form",
      description: "Template for collecting student enrollment data",
      version: "1.2.0",
      status: "active",
      lastModified: new Date("2024-03-15"),
      createdBy: "John Doe",
    },
    {
      id: 2,
      name: "Staff Information Form",
      description: "Template for collecting staff information",
      version: "2.0.1",
      status: "active",
      lastModified: new Date("2024-03-14"),
      createdBy: "Jane Smith",
    },
    {
      id: 3,
      name: "Budget Request Form",
      description: "Template for budget requests",
      version: "1.0.0",
      status: "draft",
      lastModified: new Date("2024-03-16"),
      createdBy: "Mike Johnson",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileCode className="h-8 w-8" />
            Templates
          </h1>
          <p className="text-muted-foreground">
            Manage data collection templates and forms
          </p>
        </div>
        <Button asChild>
          <Link href="/templates/new">
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Link>
        </Button>
      </div>

      <DataTable columns={columns} data={templates} />
    </div>
  );
}