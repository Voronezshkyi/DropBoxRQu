"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteModalChangeVisibility } from "@/lib/redux/features/modal/deleteModalVisibility";

import { AppDispatch, RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";

export function DeleteModal() {
  const modalShow = useSelector((state: RootState) => state.deleteModal);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Dialog open={modalShow.show}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure want to delete?</DialogTitle>
          <DialogDescription>
            This file will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant="ghost"
            onClick={() => {
              dispatch(deleteModalChangeVisibility());
            }}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>
          <Button
            size="sm"
            className="px-3 flex-1"
            variant="destructive"
            onClick={() => {
              dispatch(deleteModalChangeVisibility());
            }}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
