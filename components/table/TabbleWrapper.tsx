"use client";
import { FileType } from "@/typings";
import { Button } from "../ui/button";
import { DataTable } from "./Table";
import { columns } from "./columns";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { Skeleton } from "../ui/skeleton";

const TabbleWrapper = ({ skeletonFiles }: { skeletonFiles: FileType[] }) => {
  const { user } = useUser();
  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [docs, loading, error] = useCollection(
    user &&
      query(collection(db, "users", user.id, "files"), orderBy("size", sort))
  );

  useEffect(() => {
    if (!docs) return;
    const files: FileType[] = docs.docs.map((doc) => ({
      id: doc.id,
      filename: doc.data().filename || doc.id,
      timestamp: new Date(doc.data().timeStamp?.seconds * 1000) || undefined,
      fullname: doc.data().fullname,
      downloadUrl: doc.data().downloadUrl,
      type: doc.data().type,
      size: doc.data().size,
    }));
    setInitialFiles(files);
  }, [docs]);

  if (docs?.docs.length === undefined) {
    return (
      <div className="flex flex-col">
        <Button variant={"outline"} className="ml-auto w-36 h-10 mb-5">
          <Skeleton className="h-5 w-full" />
        </Button>

        <div className="border rounded-lg">
          {skeletonFiles.map((file) => (
            <div
              className="flex space-x-4 items-center p-5 w-full"
              key={file.id}
            >
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-5 pb-10">
      <Button
        className="ml-auto w-fit"
        onClick={() => {
          setSort(sort === "desc" ? "asc" : "desc");
        }}
      >
        Sort By {sort === "desc" ? "Newest" : "Oldest"}
      </Button>
      <DataTable columns={columns} data={initialFiles} />
    </div>
  );
};

export default TabbleWrapper;
