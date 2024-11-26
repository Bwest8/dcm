"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Database, Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function CollectionsPage() {
  const [collections] = useState([
    {
      id: 1,
      name: "Student Enrollment Data",
      status: "active",
      type: "Enrollment",
      domain: "Academic",
      lastUpdated: new Date("2024-03-15"),
      submissionCount: 1250,
    },
    {
      id: 2,
      name: "Staff Demographics",
      status: "active",
      type: "Demographics",
      domain: "HR",
      lastUpdated: new Date("2024-03-14"),
      submissionCount: 85,
    },
    {
      id: 3,
      name: "Course Catalog 2023",
      status: "archived",
      type: "Curriculum",
      domain: "Academic",
      lastUpdated: new Date("2023-12-20"),
      submissionCount: 312,
    },
    {
      id: 4,
      name: "Budget Submissions",
      status: "active",
      type: "Financial",
      domain: "Finance",
      lastUpdated: new Date("2024-03-16"),
      submissionCount: 45,
    },
  ] as const);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Database className="h-8 w-8" />
            Collections
          </h1>
          <p className="text-muted-foreground">
            Manage your data collection processes and submissions
          </p>
        </div>
        <Button asChild>
          <Link href="/collections/add">
            <Plus className="mr-2 h-4 w-4" />
            New Collection
          </Link>
        </Button>
      </div>

      <DataTable columns={columns} data={collections} />
    </div>
  );
}