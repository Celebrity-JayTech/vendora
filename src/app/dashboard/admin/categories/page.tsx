//Data Table
import CategoryDetails from "@/components/dashboard/forms/categories-detail";
import DataTable from "@/components/ui/data-table";
//Queries
import { geAlltCategories } from "@/queries/category";
import { Plus } from "lucide-react";
import { columns } from "./new/columns";

export default async function AdminCategoriesPage() {
  // Fetch all categories from the database

  const categories = await geAlltCategories();
  //Checking if no categories are found
  if (!categories) return null;
  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15} />
          Create Category
        </>
      }
      heading="Create A New Category"
      modalChildren={<CategoryDetails />}
      newTabLink="/dashboard/admin/categories/new"
      filterValue="name"
      data={categories}
      searchPlaceholder="Search Category Name.."
      columns={columns}
    />
  );
}
