"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collection } from "../types";
import { getCollectionStatus, getCollectionColor } from "../utils";

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const status = getCollectionStatus(collection);
  const stripColor = getCollectionColor(collection.collection_window);

  return (
    <Card className="relative overflow-hidden transition-colors hover:bg-muted/50">
      <div 
        className={`absolute inset-x-0 top-0 h-2.5 bg-gradient-to-r ${stripColor}`} 
        style={{
          borderTopLeftRadius: 'calc(var(--radius) - 1px)',
          borderTopRightRadius: 'calc(var(--radius) - 1px)',
        }}
      />
      <CardHeader className="pt-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{collection.name}</CardTitle>
          <Badge 
            variant={
              status === "active" ? "default" :
              status === "upcoming" ? "secondary" :
              status === "final-period" ? "warning" :
              "destructive"
            }
            className="capitalize"
          >
            {status === "active" ? "Active" :
             status === "upcoming" ? "Upcoming" :
             status === "final-period" ? "Final Period" :
             "Closed"}
          </Badge>
        </div>
        <div className="flex gap-2 text-sm text-muted-foreground">
          <span>{collection.collection_window}</span>
          <span>•</span>
          <span>{collection.school_year}</span>
          <span>•</span>
          <span>{collection.collection_type}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="templates" className="flex-1">Templates</TabsTrigger>
            <TabsTrigger value="dates" className="flex-1">Important Dates</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {collection.description}
            </p>
            {collection.comments && (
              <p className="text-sm text-muted-foreground italic">
                Note: {collection.comments}
              </p>
            )}
            {collection.how_to_doc_path && (
              <Button variant="outline" size="sm">
                View Documentation
              </Button>
            )}
          </TabsContent>
          <TabsContent value="templates">
            <div className="space-y-2">
              {collection.templates.map((template, tidx) => (
                <div key={tidx} className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted/50">
                  <span>{template.template.full_name}</span>
                  <Badge variant={template.status === "Required" ? "default" : "secondary"}>
                    {template.status}
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="dates">
            <div className="space-y-2">
              <div className="flex justify-between text-sm p-2 rounded-lg bg-muted/50">
                <span className="text-muted-foreground">Opens:</span>
                <span>{new Date(collection.collection_opens).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm p-2 rounded-lg bg-muted/50">
                <span className="text-muted-foreground">Closes:</span>
                <span>{new Date(collection.collection_closes).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm p-2 rounded-lg bg-muted/50">
                <span className="text-muted-foreground">Final Close:</span>
                <span>{new Date(collection.final_collection_closes).toLocaleDateString()}</span>
              </div>
              {collection.correction_window !== "N/A" && (
                <div className="flex justify-between text-sm p-2 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">Correction Window:</span>
                  <span>{collection.correction_window}</span>
                </div>
              )}
              {collection.acs_information !== "N/A" && (
                <div className="flex justify-between text-sm p-2 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">ACS Info:</span>
                  <span>{collection.acs_information}</span>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}