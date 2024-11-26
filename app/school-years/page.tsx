"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function SchoolYearsPage() {
  const [schoolYears] = useState([
    {
      id: 1,
      schoolYear: new Date("2024-07-01"),
      description: "2024-2025",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-03-15"),
    },
    {
      id: 2,
      schoolYear: new Date("2023-07-01"),
      description: "2023-2024",
      createdAt: new Date("2023-01-15"),
      updatedAt: new Date("2023-03-14"),
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <GraduationCap className="h-8 w-8" />
            School Years
          </h1>
          <p className="text-muted-foreground">
            Manage academic years and their collection windows
          </p>
        </div>
        <Button asChild>
          <Link href="/school-years/new">
            <Plus className="mr-2 h-4 w-4" />
            New School Year
          </Link>
        </Button>
      </div>

      <DataTable columns={columns} data={schoolYears} />
    </div>
  );
}