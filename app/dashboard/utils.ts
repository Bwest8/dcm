import { Collection } from "./types";

export const getCollectionStatus = (collection: Collection): "upcoming" | "active" | "final-period" | "closed" => {
  const now = new Date();
  const openDate = new Date(collection.collection_opens);
  const closeDate = new Date(collection.collection_closes);
  const finalCloseDate = new Date(collection.final_collection_closes);

  if (now < openDate) return "upcoming";
  if (now >= openDate && now <= closeDate) return "active";
  if (now > closeDate && now <= finalCloseDate) return "final-period";
  return "closed";
};

export const getCollectionColor = (collectionWindow: string): string => {
  const colors: { [key: string]: string } = {
    "Collection 1 - October": "from-orange-500 to-orange-400",
    "Collection 2 - December": "from-yellow-500 to-yellow-400",
    "Collection 3 - February": "from-blue-500 to-blue-400",
    "Collection 4 - June": "from-green-500 to-green-400",
    "Collection 5 - Summer": "from-red-500 to-red-400",
    "Safe Schools": "from-purple-500 to-purple-400",
    "Course/Instructor": "from-indigo-500 to-indigo-400"
  };
  return colors[collectionWindow] || "from-gray-500 to-gray-400";
};