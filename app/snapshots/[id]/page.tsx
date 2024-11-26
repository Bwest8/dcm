"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Download, ArrowLeft, Trash } from "lucide-react";
import { toast } from "sonner";

interface Snapshot {
  id: number;
  name: string;
  type: string;
  status: "completed" | "processing" | "failed";
  createdAt: Date;
  createdBy: string;
  size: string;
  description?: string;
}

export default function SnapshotDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSnapshot() {
      try {
        const response = await fetch(`/api/snapshots/${params.id}`);
        if (!response.ok) throw new Error("Failed to load snapshot");
        const data = await response.json();
        setSnapshot(data);
      } catch (error) {
        toast.error("Failed to load snapshot");
      } finally {
        setIsLoading(false);
      }
    }
    loadSnapshot();
  }, [params.id]);

  async function onDelete() {
    try {
      const response = await fetch(`/api/snapshots/${params.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete snapshot");

      toast.success("Snapshot deleted successfully");
      router.push("/snapshots");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete snapshot");
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!snapshot) {
    return <div>Snapshot not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Camera className="h-8 w-8" />
            {snapshot.name}
          </h1>
          <p className="text-muted-foreground">
            Snapshot details and management
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  snapshot and its data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDelete}
                  className="bg-destructive text-destructive-foreground"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status</span>
              <Badge
                variant={
                  snapshot.status === "completed"
                    ? "default"
                    : snapshot.status === "processing"
                    ? "secondary"
                    : "destructive"
                }
              >
                {snapshot.status.charAt(0).toUpperCase() + snapshot.status.slice(1)}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Type</span>
              <Badge variant="outline">{snapshot.type}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Created By</span>
              <span>{snapshot.createdBy}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Created At</span>
              <span>{new Date(snapshot.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Size</span>
              <span>{snapshot.size}</span>
            </div>
          </CardContent>
        </Card>

        {snapshot.description && (
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{snapshot.description}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}