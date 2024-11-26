"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Camera, Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function SnapshotsPage() {
  const [snapshots] = useState([
    {
      id: 1,
      name: "October 2024 Enrollment",
      type: "Enrollment",
      status: "completed",
      createdAt: new Date("2024-03-15"),
      createdBy: "John Doe",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "Staff Directory Q1",
      type: "Personnel",
      status: "processing",
      createdAt: new Date("2024-03-14"),
      createdBy: "Jane Smith",
      size: "1.8 MB",
    },
    {
      id: 3,
      name: "Budget Summary 2024",
      type: "Financial",
      status: "failed",
      createdAt: new Date("2024-03-16"),
      createdBy: "Mike Johnson",
      size: "956 KB",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Camera className="h-8 w-8" />
            Snapshots
          </h1>
          <p className="text-muted-foreground">
            View and manage data snapshots
          </p>
        </div>
        <Button asChild>
          <Link href="/snapshots/new">
            <Plus className="mr-2 h-4 w-4" />
            New Snapshot
          </Link>
        </Button>
      </div>

      <DataTable columns={columns} data={snapshots} />
    </div>
  );
}