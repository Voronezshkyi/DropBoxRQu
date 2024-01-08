"use client";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useToast } from "./ui/use-toast";

const DropzoneArea = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.error("file reading aborted");
      reader.onerror = () => console.error("filer reading has error");
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };
  const uploadPost = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;
    setLoading(true);
    const documentRef = await addDoc(
      collection(db, "users", user.id, "files"),
      {
        userId: user.id,
        filename: selectedFile.name,
        fullName: user.fullName,
        profileImg: user.imageUrl,
        timeStamp: serverTimestamp(),
        type: selectedFile.type,
        size: selectedFile.size,
      }
    );
    const imageRef = ref(storage, `users/${user.id}/files/${documentRef.id}`);

    uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
      const downloadUrl = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "users", user.id, "files", documentRef.id), {
        downloadUrl: downloadUrl,
      });
    });
    setLoading(false);
    toast({
      title: "Success!",
      description: "File was successfuly loaded!",
    });
  };
  const maxSize = 20971520;
  return (
    <>
      <Dropzone minSize={0} maxSize={maxSize} onDrop={onDrop}>
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragReject,
          fileRejections,
        }) => (
          <section className="m-4">
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-52 flex justify-center items-center p-5 border-dashed rounded-lg text-center",
                isDragActive
                  ? "bg-[#035FFE] text-white animate-pulse"
                  : "bg-slate-100/50 dark:bg-slate-800/50 text-slate-400"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop file!"}
              {isDragActive && !isDragReject && "Drop to upload file!"}
              {isDragReject && "File type not supported!"}
              {fileRejections.length > 0 &&
                fileRejections[0].file.size > maxSize && (
                  <div className="text-danger mt-2">Maximum size is 20MB!</div>
                )}
            </div>
          </section>
        )}
      </Dropzone>
    </>
  );
};

export default DropzoneArea;
