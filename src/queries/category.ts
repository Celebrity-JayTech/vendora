"use server";

// Clerk
import { currentUser } from "@clerk/nextjs/server";

// DB
import { db } from "@/lib/db";

// Prisma model
import { Category } from "@prisma/client";
import { error } from "console";

// Function: upsertCategory
// Description: Upserts a category into the database, updating if it exists or creating a new one if not.
// Permission Level: Admin only
// Parameters:
//   - category: Category object containing details of the category to be upserted.
// Returns: Updated or newly created category details.
export const upsertCategory = async (category: Category) => {
  try {
    // Get current user
    const user = await currentUser();

    // Ensure user is authenticated
    if (!user) throw new Error("Unauthenticated.");

    // Verify admin permission
    if (user.privateMetadata.role !== "ADMIN")
      throw new Error("Unauthorized Access: Admin Privileges Required for Entry.");

    // Ensure category data is provided
    if (!category) throw new Error("Please provide category data.");

    // Throw error if category with same name or URL already exists
    const existingCategory = await db.category.findFirst({
      where: {
        AND: [
          {
            OR: [{ name: category.name }, { url: category.url }],
          },
          {
            NOT: {
              id: category.id,
            },
          },
        ],
      },
    });

    // Throw error if category with same name or URL already exists
    if (existingCategory) {
      let errorMessage = "";
      if (existingCategory.name === category.name) {
        errorMessage = "A category with the same name already exists";
      } else if (existingCategory.url === category.url) {
        errorMessage = "A category with the same URL already exists";
      }
      throw new Error(errorMessage);
    }

    // Upsert category into the database
    const categoryDetails = await db.category.upsert({
      where: {
        id: category.id,
      },
      update: category,
      create: category,
    });
    return categoryDetails;
  } catch (error) {
    // Log and re-throw any errors
    console.log(error);
    throw error;
  }
};

//Function: getCategories
//Description: Fetches all categories from the database, ordered by creation date in descending order.
//Returns: Array of category details.
export const geAlltCategories = async () => {
  // Fetch categories from the database
  const categories = await db.category.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });
  return categories;
};

//Funtion: getCategory
//Description: Retrieve a specific category from thr database
//Access level: Public
// - CategoryId: The ID of the category to be retrieved
export const getCategory = async (categoryId: string) => {
  if (!categoryId) throw new Error("Please Specify A Category");
  // Retrieve category
  const category = await db.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  return category;
};

// Function: deleteCategory
// Description: Deletes a category from the database.
// Permission Level: Admin only
// Parameters:
//   - categoryId: The ID of the category to be deleted.
// Returns: Response indicating success or failure of the deletion operation.
export const deleteCategory = async (categoryId: string) => {
  // Get current user
  const user = await currentUser();

  // Check if user is authenticated
  if (!user) throw new Error("Unauthenticated.");

  // Verify admin permission
  if (user.privateMetadata.role !== "ADMIN")
    throw new Error("Unauthorized Access: Admin Privileges Required for Entry.");

  // Ensure category ID is provided
  if (!categoryId) throw new Error("Please provide category ID.");

  // Delete category from the database
  const response = await db.category.delete({
    where: {
      id: categoryId,
    },
  });
  return response;
};
