"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function DataSetsPage() {
  const [datasets] = useState([
    {
      id: 1,
      name: "Student Demographics 2024",
      category: "Demographics",
      format: "CSV",
      status: "active",
      lastModified: new Date("2024-03-15"),
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "Staff Directory",
      category: "Personnel",
      format: "JSON",
      status: "active",
      lastModified: new Date("2024-03-14"),
      size: "856 KB",
    },
    {
      id: 3,
      name: "Course Enrollments 2023",
      category: "Academic",
      format: "Excel",
      status: "archived",
      lastModified: new Date("2023-12-20"),
      size: "4.1 MB",
    },
    {
      id: 4,
      name: "Financial Reports Q1",
      category: "Financial",
      format: "PDF",
      status: "active",
      lastModified: new Date("2024-03-16"),
      size: "1.2 MB",
    },
  ] as const);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Data Sets
          </h1>
          <p className="text-muted-foreground">
            Manage and organize your data set descriptions
          </p>
        </div>
        <Button asChild>
          <Link href="/data-set-descriptions/add">
            <Plus className="mr-2 h-4 w-4" />
            New Data Set
          </Link>
        </Button>
      </div>

      <DataTable columns={columns} data={datasets} />
    </div>
  );
}