"use client"

import { Button } from "@/components/ui/button";
import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle
 } from "@/components/ui/card"
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { transactions as transactionSchema } from "@/db/schema";
import { useState } from "react";
import { UploadButton } from "./upload-button";
import { ImportCard } from "./import-card";
import { useSelectAccount } from "@/features/accounts/hooks/use-select-account";
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions";
import { toast } from "sonner";

enum VARIANTS {
    LIST = "LIST",
    IMPORT = "IMPORT",
};

const INITIAL_IMPORT_RESULTS = {
    data: [],
    errors: [],
    meta: {}
}

const TransactionsPage = () => {
    const [AccountDialog, confirm] = useSelectAccount();
    
    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
    const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

    const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
        setImportResults(results);
        setVariant(VARIANTS.IMPORT);
    }

    const onCancelImport = () => {
        setImportResults(INITIAL_IMPORT_RESULTS);
        setVariant(VARIANTS.LIST);
    }

    const newTransaction = useNewTransaction();
    const createTransactions = useBulkCreateTransactions();
    const TransactionsQuery = useGetTransactions();
    const transactions = TransactionsQuery.data || [];
    const deleteTransactions = useBulkDeleteTransactions();

    const isDisabled = 
        TransactionsQuery.isLoading || 
        deleteTransactions.isPending;

    const onSubmitImport = async (
        values: typeof transactionSchema.$inferInsert[],
    ) => {
        const accountId = await confirm();

        if(!accountId) {
            return toast.error("Please select an account")
        }

        const data = values.map((value) => ({
            ...value,
            accountId: accountId as string,
        }))

        createTransactions.mutate(data, {
            onSuccess: () => {
                onCancelImport();
            },
            onError: (error) => {
                toast.error("Failed to import transactions");
                console.error(error);
            }
        })
    }

    if(TransactionsQuery.isLoading) {
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

    if(variant === VARIANTS.IMPORT){
        return (
            <>
                <AccountDialog />
                <ImportCard
                    data={importResults.data}
                    onCancel={onCancelImport}
                    onSubmit={onSubmitImport}
                />
            </>
        )
    }

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-4 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl ">
                        Transactions History
                    </CardTitle>
                    <div className="flex gap-x-2 items-center">
                        <Button size={"sm"} onClick={newTransaction.onOpen} >
                            <Plus className="size-4 mr-1" />
                            Create
                        </Button>
                        <UploadButton
                            onUpload={onUpload}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={transactions} filterKey="by payee" 
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id)
                            deleteTransactions.mutate({ ids });
                        }} 
                        disabled={isDisabled} />
                </CardContent>
            </Card>
        </div>
    )
}

export default TransactionsPage;