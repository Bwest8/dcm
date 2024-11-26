import {
  LayoutDashboard,
  Calendar,
  Database,
  FileText,
  Building2,
  GraduationCap,
  FileCode,
  Camera,
  Layers,
} from "lucide-react";

export const navigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Data Management",
    icon: Database,
    children: [
      {
        label: "Collections",
        href: "/collections",
        icon: Database,
      },
      {
        label: "Collection Windows",
        href: "/collection-windows",
        icon: Calendar,
      },
      {
        label: "Data Sets",
        href: "/data-set-descriptions",
        icon: FileText,
      },
    ],
  },
  {
    label: "Configuration",
    icon: FileCode,
    children: [
      {
        label: "Domains",
        href: "/domains",
        icon: Building2,
      },
      {
        label: "School Years",
        href: "/school-years",
        icon: GraduationCap,
      },
      {
        label: "Templates",
        href: "/templates",
        icon: FileCode,
      },
    ],
  },
  {
    label: "Snapshots",
    icon: Camera,
    children: [
      {
        label: "Snapshots",
        href: "/snapshots",
        icon: Camera,
      },
      {
        label: "Snapshot Types",
        href: "/snapshot-types",
        icon: Layers,
      },
    ],
  },
] as const;