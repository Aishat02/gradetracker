import { useQuery, useMutation } from "@tanstack/react-query";
import {
  createDocument,
  getActivity,
  getDocument,
  getDocuments,
  updateDocument,
  deleteDocument,
} from "./FirestoreConfig";
import { queryClient } from "@/App";
import { toast } from "react-toastify";

export const useCreate = <T>(collectionName: any) => {
  return useMutation({
    mutationFn: (data: T) => createDocument(collectionName, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [collectionName] });
      toast.success(`${data?.name || collectionName} added`, {
        toastId: `add-${collectionName}`,
      });
    },
    onError: (error) => {
      toast.error(`Failed: ${error}`, {
        toastId: `add-${collectionName}-error`,
      });
    },
  });
};

export const useRead = (collectionName: string) => {
  return useQuery({
    queryKey: [collectionName],
    queryFn: () => getDocuments(collectionName),
  });
};

export const useActivityFeed = () => {
  return useQuery({
    queryKey: ["activity", "latest5"],
    queryFn: () => getActivity(),
  });
};

export const useReadDoc = (collectionName: string, userId?: string) => {
  return useQuery({
    queryKey: [collectionName, userId],
    queryFn: async () => {
      if (!userId) throw new Error("Please login");
      return await getDocument(collectionName, userId);
    },
    enabled: !!userId,
  });
};

export const useUpdate = <T>(collectionName: string, id: string) => {
  return useMutation({
    mutationFn: (data: T) => updateDocument(collectionName, id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [collectionName] });
      toast.success(`${data?.name || collectionName} updated`, {
        toastId: `Updated-${collectionName}`,
      });
    },
    onError: (error) => {
      toast.error(`Failed to update ${collectionName}: ${error}`, {
        toastId: `Failed-${collectionName}-error`,
      });
    },
  });
};

export const useDelete = <T extends { id: string; name: string }>(
  collectionName: string
) => {
  return useMutation({
    mutationFn: (data: T) => deleteDocument(collectionName, data),
    onSuccess: (course) => {
      queryClient.invalidateQueries({ queryKey: [collectionName] });
      toast.success(`${course.name} deleted`, {
        toastId: `delete-${collectionName}`,
      });
    },
    onError: (error) => {
      toast.error(`Error: ${error}`, {
        toastId: `delete-${collectionName}-error`,
      });
    },
  });
};
