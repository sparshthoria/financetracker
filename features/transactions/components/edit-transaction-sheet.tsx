import { 
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
 } from "@/components/ui/sheet"

import { TransactionForm } from "./transaction-form";
import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";
import { useOpenTransaction } from "../hooks/use-open-transaction";
import { useGetTransaction } from "../api/use-get-transaction";
import { useEditTransaction } from "../api/use-edit-transcation";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { Loader2, TrendingUp } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { convertAmountFromMilliUnits } from "@/lib/utils";

const formSchema = insertTransactionSchema.omit({
    id: true
})

 type FormValues = z.input<typeof formSchema>;

 export const EditTransactionSheet = () => {
    const { isOpen, onClose, id } = useOpenTransaction();

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this Transaction"
    )

    const transactionQuery = useGetTransaction(id);
    const editMutation = useEditTransaction(id);
    const deleteMutation = useDeleteTransaction(id);

    const categoryQuery = useGetCategories();
    const categoryMutation = useCreateCategory();

    const onCreateCategory = (name: string) => categoryMutation.mutate({
        name
    })

    const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
        label: category.name,
        value: category.id
    })) 

    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount();

    const onCreateAccount = (name: string) => accountMutation.mutate({
        name
    })

    const accountOptions = (accountQuery.data?? []).map((account) => ({
        label: account.name,
        value: account.id
    }))

    const isPending = editMutation.isPending || deleteMutation.isPending || transactionQuery.isPending ||
    categoryMutation.isPending || accountMutation.isPending;

    const isLoading = transactionQuery.isLoading || categoryQuery.isLoading || accountQuery.isLoading;


    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    }

    const onDelete = async () => {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                }
            });
        }
    }

    const defaultValues = transactionQuery.data ? {
        accountId: transactionQuery.data.accountId,
        categoryId: transactionQuery.data.categoryId,
        date: transactionQuery.data.date ? new Date(transactionQuery.data.date) : new Date(),
        amount: (convertAmountFromMilliUnits(transactionQuery.data.amount)).toString(),
        notes: transactionQuery.data.notes,
        payee: transactionQuery.data.payee,
    } : {
        accountId: "",
        categoryId: "",
        date: new Date(),
        amount: "",
        notes: "",
        payee: "",
    }

    return (
      <>
        <ConfirmDialog />
          <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4 bg-white">
                <SheetHeader>
                    <SheetTitle>Edit Transaction</SheetTitle>
                    <SheetDescription>Edit an existing Transaction</SheetDescription>
                </SheetHeader>
                {
                    isLoading ? (
                        <div className="absolute inst-0 flex items-center justify-center">
                            <Loader2 className="animate-spin size-4 text-muted-foreground" />
                        </div>
                    ) : (
                        <TransactionForm 
                            id={id}
                            defaultValues={defaultValues}
                            onSubmit={onSubmit}
                            onDelete={onDelete}
                            disabled={isPending}
                            categoryOptions={categoryOptions}
                            onCreateCategory={onCreateCategory}
                            accountOptions={accountOptions}
                            onCreateAccount={onCreateAccount}
                        />
                    )
                }
            </SheetContent>
        </Sheet>
      </>
    )
 }