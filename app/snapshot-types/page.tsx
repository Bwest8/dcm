"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Layers, Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function SnapshotTypesPage() {
  const [types] = useState([
    {
      id: 1,
      name: "Enrollment",
      description: "Student enrollment data snapshots",
      frequency: "Monthly",
      retention: "5 years",
      isActive: true,
      lastUsed: new Date("2024-03-15"),
    },
    {
      id: 2,
      name: "Personnel",
      description: "Staff and personnel data snapshots",
      frequency: "Quarterly",
      retention: "7 years",
      isActive: true,
      lastUsed: new Date("2024-03-14"),
    },
    {
      id: 3,
      name: "Financial",
      description: "Financial and budget data snapshots",
      frequency: "Annual",
      retention: "10 years",
      isActive: true,
      lastUsed: new Date("2024-03-16"),
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Layers className="h-8 w-8" />
            Snapshot Types
          </h1>
          <p className="text-muted-foreground">
            Configure and manage snapshot types
          </p>
        </div>
        <Button asChild>
          <Link href="/snapshot-types/new">
            <Plus className="mr-2 h-4 w-4" />
            New Type
          </Link>
        </Button>
      </div>

      <DataTable columns={columns} data={types} />
    </div>
  );
}