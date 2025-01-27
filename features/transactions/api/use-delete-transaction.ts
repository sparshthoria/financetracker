import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$delete"]>;

export const useDeleteTransaction = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {
            if (!id) throw new Error("transaction ID is required");
            
            const response = await client.api.transactions[":id"]["$delete"]({
                param: { id }
            });
            
            if (!response.ok) {
                throw new Error("Failed to delete transaction");
            }
            
            const data = await response.json();
            return data;
        },
        onSuccess: () => {
            toast.success("Transaction deleted");
            queryClient.invalidateQueries({ queryKey: ["transaction", { id }] });
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["summary"] })
        },
        onError: (error) => {
            toast.error("Failed to delete transaction");
        }
    });

    return mutation;
};
