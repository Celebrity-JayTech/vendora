"use client";

// Prisma Model
import { Category } from "@prisma/client";

//Schema
import { CategoryFormSchema } from "@/lib/schema";

//React
import { FC, useEffect } from "react";

//Utils
import { v4 } from "uuid";

//Form Handling Utilities
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AlertDialog } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form, // wrapper from your UI primitives
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import ImageUpload from "../shared/image-upload";

//Toast
import { toast } from "sonner";

//Queries
import { upsertCategory } from "@/queries/category";
import { useRouter } from "next/navigation";

interface CategoryDetailsProps {
  data?: Category;
}

const CategoryDetails: FC<CategoryDetailsProps> = ({ data }) => {
  const router = useRouter();

  // Ensure default values are explicit and match the Zod schema
  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: data?.name ?? "",
      image: data?.image ? [{ url: data.image }] : [],
      url: data?.url ?? "",
      featured: data?.featured ?? false,
    },
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    form.reset({
      name: data?.name ?? "",
      image: data?.image ? [{ url: data.image }] : [],
      url: data?.url ?? "",
      featured: data?.featured ?? false,
    });
  }, [data, form]);

  const handleSubmit = async (values: z.infer<typeof CategoryFormSchema>) => {
    // Debug logging to inspect exactly what arrives from RHF + Zod
    console.log("SUBMIT VALUES:", JSON.stringify(values, null, 2));
    // Also log raw getValues to catch register issues
    console.log("RAW getValues():", JSON.stringify(form.getValues(), null, 2));

    // Basic client validation guard
    if (!values.name || !values.name.trim()) {
      toast("Name is required");
      return;
    }

    const imageUrl = values.image?.[0]?.url ?? "";

    try {
      // Send only required fields — let server handle timestamps
      const response = await upsertCategory({
        id: data?.id ?? v4(),
        name: values.name.trim(),
        image: imageUrl,
        url: (values.url ?? "").replace(/^\/+/, ""),
        featured: Boolean(values.featured),
        createdAt: data?.createdAt ?? new Date(),
        updatedAt: new Date(),
      });

      toast(
        data?.id
          ? "Category updated successfully!"
          : `Congratulations ${response?.name} has been successfully created!`,
      );
      if (data?.id) {
        router.refresh();
      } else {
        router.push("/dashboard/admin/categories");
      }
    } catch (error: any) {
      console.error("UPSERT ERROR:", error);
      toast("Error Saving Category", {
        description: String(error?.message ?? error),
        style: { background: "red", color: "white" },
      });
    }
  };

  return (
    <AlertDialog>
      <Card className="w-full border-b-[1px] border-gray-500/20">
        <CardHeader>
          <CardTitle>Category Information</CardTitle>
          <CardDescription>
            {data?.id
              ? `Update ${data?.name} category information.`
              : " Let's create a category. You can edit category settings later from the category table or category page."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Provide the form context (if Form is a context wrapper) */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              {/* Image field (Controller ensures controlled behavior) */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        type="profile"
                        // defensive: if field.value isn't an array, send empty
                        value={
                          Array.isArray(field.value) ? field.value.map((image) => image.url) : []
                        }
                        disabled={isLoading}
                        onChange={(url) => field.onChange([{ url }])}
                        onRemove={(url) =>
                          field.onChange([
                            ...(Array.isArray(field.value)
                              ? field.value.filter((current) => current.url !== url)
                              : []),
                          ])
                        }
                        dontShowPreview={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* NAME field: keep using FormField but also explicitly register fallback */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold">Category name</FormLabel>
                    <FormControl>
                      {/* Ensure Input receives value, onChange, ref, disabled */}
                      <Input
                        placeholder="Name"
                        {...field}
                        disabled={isLoading}
                        className={cn(
                          "w-full",
                          form.formState.errors.name ? "text-red" : "border-gray-300",
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* URL field */}
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold">Category url</FormLabel>
                    <FormControl>
                      <Input placeholder="/category-url" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Featured checkbox */}
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        id="featured"
                        checked={Boolean(field.value)}
                        onCheckedChange={(val) => field.onChange(Boolean(val))}
                        className="cursor-pointer"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-semibold">Featured</FormLabel>
                      <FormDescription className="font-[10px]">
                        This Category will appear on the home page
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
                disabled={isLoading}
              >
                {isLoading
                  ? "loading..."
                  : data?.id
                    ? "Save Category Information"
                    : "Create Category"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  );
};

export default CategoryDetails;
