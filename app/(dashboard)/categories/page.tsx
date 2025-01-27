"use client"

import { Button } from "@/components/ui/button";
import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle
 } from "@/components/ui/card"
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";

const CategoriesPage = () => {
    const newcategory = useNewCategory();
    const categoriesQuery = useGetCategories();
    const categories = categoriesQuery.data || [];
    const deleteCategories = useBulkDeleteCategories();

    const isDisabled = 
        categoriesQuery.isLoading || 
        deleteCategories.isPending;

    if(categoriesQuery.isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader>
                       <Skeleton className="h-8 w-48" />
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full flex items-center justify-center">
                            <Loader2 className="text-slate-300 size-6 animate-spin" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-4 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl ">
                        Categories
                    </CardTitle>
                    <Button size={"sm"} onClick={newcategory.onOpen} >
                        <Plus className="size-4 mr-1" />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={categories} filterKey="by name" 
                    onDelete={(row) => {
                        const ids = row.map((r) => r.original.id)
                        deleteCategories.mutate({ ids });
                    }} 
                    disabled={isDisabled} />
                </CardContent>
            </Card>
        </div>
    )
}

export default CategoriesPage;