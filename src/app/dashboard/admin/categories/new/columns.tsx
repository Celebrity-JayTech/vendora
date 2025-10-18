"use client";

// React, Next.js imports
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Custom components
import CategoryDetails from "@/components/dashboard/forms/categories-detail";
import CustomModal from "@/components/dashboard/shared/custom-modal";

// UI components
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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Hooks and utilities
import { toast } from "sonner";
import { useModal } from "@/providers/modal-provider";

// Lucide icons
import { BadgeCheck, BadgeMinus, Edit, MoreHorizontal, Trash } from "lucide-react";

// Queries
import { deleteCategory, getCategory } from "@/queries/category";

// Tanstack React Table
import { ColumnDef } from "@tanstack/react-table";

// Prisma models
import { Category } from "@prisma/client";
import { useTheme } from "next-themes";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="relative h-44 min-w-64 overflow-hidden rounded-xl">
          <Image
            src={row.original.image}
            alt=""
            width={1000}
            height={1000}
            className="h-40 w-40 rounded-full object-cover shadow-2xl"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <span className="text-lg font-extrabold capitalize">{row.original.name}</span>;
    },
  },

  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => {
      return <span>/{row.original.url}</span>;
    },
  },
  {
    accessorKey: "featured",
    header: "Featured",
    cell: ({ row }) => {
      return (
        <span className="text-muted-foreground flex justify-center">
          {row.original.featured ? <BadgeCheck className="stroke-green-300" /> : <BadgeMinus />}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;

      return <CellActions rowData={rowData} />;
    },
  },
];

// Define props interface for CellActions component
interface CellActionsProps {
  rowData: Category;
}

// CellActions component definition
const CellActions: React.FC<CellActionsProps> = ({ rowData }) => {
  // Hooks
  const { setOpen, setClose } = useModal();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  //Next Themes
  const { theme, setTheme } = useTheme();
  const bgColor = theme === "dark" ? "#0a0a0a" : "#ffffff";

  // Return null if rowData or rowData.id don't exist
  if (!rowData || !rowData.id) return null;

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" style={{ backgroundColor: bgColor }}>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="flex cursor-pointer gap-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
            onClick={() => {
              setOpen(
                // Custom modal component
                <CustomModal>
                  {/* Store details component */}
                  <CategoryDetails data={{ ...rowData }} />
                </CustomModal>,
                async () => {
                  return {
                    rowData: await getCategory(rowData?.id),
                  };
                },
              );
            }}
          >
            <Edit size={15} />
            Edit Details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="flex cursor-pointer gap-2 rounded-md font-semibold text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => {}}
              style={{ backgroundColor: "#9e0909ff" }}
            >
              <Trash size={15} /> Delete category
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            This action cannot be undone. This will permanently delete the category and related
            data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            className="bg-destructive hover:bg-destructive mb-2 font-semibold text-white"
            style={{ backgroundColor: "red" }}
            onClick={async () => {
              setLoading(true);
              await deleteCategory(rowData.id);
              toast("Deleted category", {
                description: "The category has been deleted.",
              });
              setLoading(false);
              router.refresh();
              setClose();
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
