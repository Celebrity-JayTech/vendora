//Zod
import { features } from "process";
import { z } from "zod";
import { ur } from "zod/v4/locales";

//Category form Schema
export const CategoryFormSchema = z.object({
  name: z
    .string({ message: "Category name must be a string" })
    .nonempty("Category name is required")
    .min(3, "Name is too short")
    .max(50, "Category Name Cannot Exceed 50 Characters")
    .regex(/^[A-Za-z0-9 ]+$/, {
      message: "Only letters, numbers and spaces are allowed in the category name.",
    }),

  //Image
  image: z
    .object({
      url: z.string().url("Invalid URL format"), // Better to use z.string().url()
    })
    .array()
    .length(1, "Choose only one category Image"),

  url: z
    .string({ message: "Category url must be a string" })
    .nonempty("Category url is required")
    .min(2, "Category url must be at least 2 characters long")
    .max(50, "Category url Cannot Exceed 50 Characters")
    // Corrected regex to allow hyphens and underscores, and disallow consecutive ones
    .regex(/^[a-zA-Z0-9]+(?:[-_][a-zA-Z0-9]+)*$/, {
      message:
        "Only letters, numbers, hyphen and underscores are allowed. Consecutive special characters are not allowed.",
    }),

  featured: z.boolean(),
});
