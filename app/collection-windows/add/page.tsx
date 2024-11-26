"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  collectionNumber: z.enum(["C1", "C2", "C3", "C4", "C5", "C6"]),
  monthSeason: z.enum([
    "October",
    "December",
    "February",
    "June",
    "Summer",
    "AllYear",
    "January",
    "April",
  ]),
  collectionLabel: z.string().min(2).max(255),
  description: z.string().optional(),
  schoolYearId: z.number(),
});

export default function NewCollectionWindowPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collectionLabel: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/collection-windows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to create collection window");

      toast.success("Collection window created successfully");
      router.push("/collection-windows");
      router.refresh();
    } catch (error) {
      toast.error("Failed to create collection window");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Calendar className="h-8 w-8" />
          New Collection Window
        </h1>
        <p className="text-muted-foreground">
          Create a new data collection window
        </p>
      </div>

      <div className="max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="schoolYearId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Year</FormLabel>
                  <Select onValueChange={(value) => field.onChange(parseInt(value))}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a school year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">2024-2025</SelectItem>
                      <SelectItem value="2">2023-2024</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The academic year for this collection window
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="collectionNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collection Number</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a collection number" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="C1">C1</SelectItem>
                      <SelectItem value="C2">C2</SelectItem>
                      <SelectItem value="C3">C3</SelectItem>
                      <SelectItem value="C4">C4</SelectItem>
                      <SelectItem value="C5">C5</SelectItem>
                      <SelectItem value="C6">C6</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The sequential number of this collection window
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monthSeason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Month/Season</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a month or season" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="October">October</SelectItem>
                      <SelectItem value="December">December</SelectItem>
                      <SelectItem value="February">February</SelectItem>
                      <SelectItem value="June">June</SelectItem>
                      <SelectItem value="Summer">Summer</SelectItem>
                      <SelectItem value="AllYear">All Year</SelectItem>
                      <SelectItem value="January">January</SelectItem>
                      <SelectItem value="April">April</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The time period for this collection window
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="collectionLabel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter collection window label" {...field} />
                  </FormControl>
                  <FormDescription>
                    A descriptive label for this collection window
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter collection window description"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Additional details about this collection window
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit">Create Collection Window</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}