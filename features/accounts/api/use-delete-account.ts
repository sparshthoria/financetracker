import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$delete"]>;

export const useDeleteAccount = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {
            if (!id) throw new Error("Account ID is required");
            
            const response = await client.api.accounts[":id"]["$delete"]({
                param: { id }
            });
            
            if (!response.ok) {
                throw new Error("Failed to delete account");
            }
            
            const data = await response.json();
            return data;
        },
        onSuccess: () => {
            toast.success("Account deleted");
            queryClient.invalidateQueries({ queryKey: ["account", { id }] });
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["summary"] })

        },
        onError: (error) => {
            toast.error("Failed to delete account");
        }
    });

    return mutation;
};
