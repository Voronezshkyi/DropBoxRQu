"use client";
import { COLOR_MAP } from "@/constant";
import { FileType } from "@/typings";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import prettyBytes from "pretty-bytes";
import { FileIcon, defaultStyles } from "react-file-icon";
import { Button } from "../ui/button";

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      const extension: string = type.split("/")[1];
      return (
        <div className="w-10">
          <FileIcon
            extension={extension}
            labelColor={COLOR_MAP[extension]}
            // @ts-ignore
            {...defaultStyles[extension]}
          />
        </div>
      );
    },
  },

  {
    accessorKey: "filename",
    header: "Filename",
    cell: ({ renderValue, ...props }) => {
      return (
        <div
          onClick={() => {
            console.log(props.row.original);
          }}
          className="flex space-x-10 items-center underline text-blue-500 hover:cursor-pointer"
        >
          {renderValue() as string} <Pencil1Icon />
        </div>
      );
    },
  },

  {
    accessorKey: "timestamp",
    header: "Date Added",
    cell: ({ renderValue, ...props }) => {
      return (
        <div className="flex flex-col">
          <div className="text-sm">
            {(renderValue() as Date).toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-500">
            {(renderValue() as Date).toLocaleTimeString()}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "downloadUrl",
    header: "Link",
    cell: ({ renderValue, ...props }) => (
      <a
        href={renderValue() as string}
        target="_blank"
        className="underline text-blue-500 hover:text-blue-600"
      >
        Download
      </a>
    ),
  },
  {
    header: "Delete File",
    cell: ({ renderValue, ...props }) => (
      <Button
        variant={"outline"}
        onClick={() => console.log(props.row.original.id)}
      >
        <TrashIcon />
      </Button>
    ),
  },
];
