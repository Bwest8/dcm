"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CollectionFiltersProps {
  selectedYear: string;
  selectedWindow: string;
  selectedStatus: string;
  selectedType: string;
  searchQuery: string;
  uniqueYears: string[];
  uniqueWindows: string[];
  uniqueTypes: string[];
  onYearChange: (value: string) => void;
  onWindowChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onClearFilters: () => void;
  activeFilterCount: number;
}

export function CollectionFilters({
  selectedYear,
  selectedWindow,
  selectedStatus,
  selectedType,
  searchQuery,
  uniqueYears,
  uniqueWindows,
  uniqueTypes,
  onYearChange,
  onWindowChange,
  onStatusChange,
  onTypeChange,
  onSearchChange,
  onClearFilters,
  activeFilterCount,
}: CollectionFiltersProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Filter Collections</CardTitle>
          </div>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-8"
            >
              <X className="mr-2 h-4 w-4" />
              Clear Filters
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount}
              </Badge>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative w-full">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search collections..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 w-full"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <Select value={selectedYear} onValueChange={onYearChange}>
            <SelectTrigger>
              <SelectValue placeholder="School Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {uniqueYears.map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedWindow} onValueChange={onWindowChange}>
            <SelectTrigger>
              <SelectValue placeholder="Collection Window" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Windows</SelectItem>
              {uniqueWindows.map(window => (
                <SelectItem key={window} value={window}>{window}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={onTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Collection Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {uniqueTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}