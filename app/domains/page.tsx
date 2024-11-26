"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function DomainsPage() {
  const [domains] = useState([
    {
      id: 1,
      name: "Academic",
      description: "Academic and curriculum related data",
      isActive: true,
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-03-15"),
    },
    {
      id: 2,
      name: "HR",
      description: "Human resources and staffing data",
      isActive: true,
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-03-14"),
    },
    {
      id: 3,
      name: "Finance",
      description: "Financial and budgeting data",
      isActive: true,
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-03-16"),
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Building2 className="h-8 w-8" />
            Domains
          </h1>
          <p className="text-muted-foreground">
            Manage data collection domains and categories
          </p>
        </div>
        <Button asChild>
          <Link href="/domains/new">
            <Plus className="mr-2 h-4 w-4" />
            New Domain
          </Link>
        </Button>
      </div>

      <DataTable columns={columns} data={domains} />
    </div>
  );
}