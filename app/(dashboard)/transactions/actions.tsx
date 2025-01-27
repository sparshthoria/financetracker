"use client"

import { Button } from "@/components/ui/button";
import { 
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu" 
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";
import { useConfirm } from "@/hooks/use-confirm";

type Props = {
    id: string;
}

export const Actions = ({ id }: Props) => {
    const { onOpen } = useOpenTransaction();

   const deleteMutation = useDeleteTransaction(id);
   const [ConfirmDialog, confirm] = useConfirm(
     "Are you sure?",
     "You are about to delete this transaction"
   )

    const onDelete = async () => {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate();
        }
    }

    return (
       <>
       <ConfirmDialog />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant={"ghost"}
                    className="size-8 p-0"
                >
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem 
                    disabled={deleteMutation.isPending}
                    onClick={() => {onOpen(id)}}
                > 
                    <Edit className="size-4 mr-2" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                    disabled={deleteMutation.isPending}
                    onClick={onDelete}
                > 
                    <Trash className="size-4 mr-2" /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
       </>
    )
}