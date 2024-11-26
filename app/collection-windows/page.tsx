"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function CollectionWindowsPage() {
  const [windows] = useState([
    {
      id: 1,
      schoolYearId: 1,
      collectionNumber: "C1",
      monthSeason: "October",
      collectionLabel: "October Collection Window",
      description: "First collection window of the school year",
      schoolYear: {
        schoolYear: new Date("2024-07-01"),
        description: "2024-2025",
      },
    },
    {
      id: 2,
      schoolYearId: 1,
      collectionNumber: "C2",
      monthSeason: "December",
      collectionLabel: "December Collection Window",
      description: "Second collection window of the school year",
      schoolYear: {
        schoolYear: new Date("2024-07-01"),
        description: "2024-2025",
      },
    },
    {
      id: 3,
      schoolYearId: 1,
      collectionNumber: "C3",
      monthSeason: "February",
      collectionLabel: "February Collection Window",
      description: "Third collection window of the school year",
      schoolYear: {
        schoolYear: new Date("2024-07-01"),
        description: "2024-2025",
      },
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Calendar className="h-8 w-8" />
            Collection Windows
          </h1>
          <p className="text-muted-foreground">
            Manage data collection periods throughout the school year
          </p>
        </div>
        <Button asChild>
          <Link href="/collection-windows/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Window
          </Link>
        </Button>
      </div>

      <DataTable columns={columns} data={windows} />
    </div>
  );
}