"use client";

import { useState, useEffect } from "react";
import { Database, Clock, CalendarClock } from "lucide-react";
import sampleData from "@/data/sampledata.json";
import { Collection } from "./types";
import { StatsCards } from "./components/stats-cards";
import { CollectionFilters } from "./components/collection-filters";
import { CollectionCard } from "./components/collection-card";
import { getCollectionStatus } from "./utils";

export default function DashboardPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedWindow, setSelectedWindow] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [uniqueYears, setUniqueYears] = useState<string[]>([]);
  const [uniqueWindows, setUniqueWindows] = useState<string[]>([]);
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);
  const [stats, setStats] = useState<Array<{
    title: string;
    value: string;
    icon: any;
    description: string;
  }>>([]);

  useEffect(() => {
    setCollections(sampleData);
  }, []);

  useEffect(() => {
    if (collections.length > 0) {
      const years = Array.from(new Set(collections.map(c => c.school_year))).sort().reverse();
      const windows = Array.from(new Set(collections.map(c => c.collection_window))).sort();
      const types = Array.from(new Set(collections.map(c => c.collection_type))).sort();
      
      setUniqueYears(years);
      setUniqueWindows(windows);
      setUniqueTypes(types);

      // Calculate collection counts by status
      const activeCollections = collections.filter(c => getCollectionStatus(c) === "active");
      const upcomingCollections = collections.filter(c => getCollectionStatus(c) === "upcoming");
      
      // Calculate collections closing soon (active collections with close date within 7 days)
      const now = new Date();
      const sevenDaysFromNow = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));
      const closingSoon = activeCollections.filter(c => {
        const closeDate = new Date(c.collection_closes);
        return closeDate <= sevenDaysFromNow;
      });

      setStats([
        {
          title: "Open Collections",
          value: activeCollections.length.toString(),
          icon: Database,
          description: "Currently active collections",
        },
        {
          title: "Closing Soon",
          value: closingSoon.length.toString(),
          icon: Clock,
          description: "Collections closing within 7 days",
        },
        {
          title: "Upcoming",
          value: upcomingCollections.length.toString(),
          icon: CalendarClock,
          description: "Collections opening soon",
        },
      ]);
    }
  }, [collections]);

  const filteredCollections = collections.filter(collection => {
    if (selectedYear !== "all" && collection.school_year !== selectedYear) return false;
    if (selectedWindow !== "all" && collection.collection_window !== selectedWindow) return false;
    if (selectedStatus !== "all" && getCollectionStatus(collection) !== selectedStatus) return false;
    if (selectedType !== "all" && collection.collection_type !== selectedType) return false;
    if (searchQuery) {
      const search = searchQuery.toLowerCase();
      return (
        collection.name.toLowerCase().includes(search) ||
        collection.description.toLowerCase().includes(search) ||
        collection.collection_type.toLowerCase().includes(search) ||
        collection.templates.some(t => 
          t.template.full_name.toLowerCase().includes(search)
        )
      );
    }
    return true;
  });

  const activeFilterCount = [
    selectedYear !== "all",
    selectedWindow !== "all",
    selectedStatus !== "all",
    selectedType !== "all",
    searchQuery !== "",
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedYear("all");
    setSelectedWindow("all");
    setSelectedStatus("all");
    setSelectedType("all");
    setSearchQuery("");
  };

  return (
    <div className="space-y-6 animate-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">PIMS Calendar</h1>
      </div>
      
      <StatsCards stats={stats} />

      <CollectionFilters
        selectedYear={selectedYear}
        selectedWindow={selectedWindow}
        selectedStatus={selectedStatus}
        selectedType={selectedType}
        searchQuery={searchQuery}
        uniqueYears={uniqueYears}
        uniqueWindows={uniqueWindows}
        uniqueTypes={uniqueTypes}
        onYearChange={setSelectedYear}
        onWindowChange={setSelectedWindow}
        onStatusChange={setSelectedStatus}
        onTypeChange={setSelectedType}
        onSearchChange={setSearchQuery}
        onClearFilters={clearFilters}
        activeFilterCount={activeFilterCount}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {filteredCollections.map((collection) => (
          <CollectionCard key={collection.name} collection={collection} />
        ))}
      </div>

      {filteredCollections.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No collections found matching your filters.</p>
        </div>
      )}
    </div>
  );
}