"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Input } from "./ui/input";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useToast } from "./ui/use-toast";

export function RenameModal() {
  const { toast } = useToast();
  const { user } = useUser();
  const [inputValue, setInputValue] = useState("");
  const [isRenameModalOpen, setIsRenameModalOpen, filename, fileId] =
    useAppStore((state) => [
      state.isRenameModalOpen,
      state.setIsRenameModalOpen,
      state.filename,
      state.fileId,
    ]);

  async function renameFile() {
    if (!user || !fileId) return;
    try {
      if (inputValue) {
        await updateDoc(doc(db, "users", user.id, "files", fileId), {
          filename: inputValue.trim(),
        });
        setInputValue("");
        setIsRenameModalOpen(false);
        toast({
          title: "Success!",
          description: "Filename was successfuly renamed!",
        });
      } else {
        setInputValue("");
        setIsRenameModalOpen(false);
        toast({
          title: "Error",
          description: "Filename cant be empty,please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("File was not renamed, an error has been occured");
    }
  }
  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => {
        setIsRenameModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="pb-2">Rename the File</DialogTitle>
          <Input
            id="link"
            defaultValue={filename}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                renameFile();
              }
            }}
          />
        </DialogHeader>
        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant="ghost"
            onClick={() => {
              setIsRenameModalOpen(false);
            }}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>
          <Button
            size="sm"
            className="px-3 flex-1"
            variant="ghost"
            onClick={() => {
              renameFile();
            }}
          >
            <span className="sr-only">Rename</span>
            <span>Rename</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
