"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";

export type CollectionWindow = {
  id: number;
  schoolYearId: number;
  collectionNumber: 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6';
  monthSeason: 'October' | 'December' | 'February' | 'June' | 'Summer' | 'AllYear' | 'January' | 'April';
  collectionLabel: string;
  description: string;
  schoolYear: {
    schoolYear: Date;
    description: string;
  };
};

export const columns: ColumnDef<CollectionWindow>[] = [
  {
    accessorKey: "collectionLabel",
    header: "Label",
  },
  {
    accessorKey: "collectionNumber",
    header: "Collection #",
  },
  {
    accessorKey: "monthSeason",
    header: "Season",
    cell: ({ row }) => {
      const season = row.getValue("monthSeason") as string;
      return (
        <Badge variant="secondary">
          {season}
        </Badge>
      );
    },
  },
  {
    accessorKey: "schoolYear.schoolYear",
    header: "School Year",
    cell: ({ row }) => {
      const date = row.original.schoolYear.schoolYear;
      return new Date(date).getFullYear().toString();
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const window = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/collection-windows/${window.id}`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];