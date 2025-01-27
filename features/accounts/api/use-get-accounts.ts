import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono"

export const useGetAccounts = () => {
    const query = useQuery({
        queryKey: ['accounts'],
        queryFn: async () => {
            const response = await client.api.accounts.$get('/accounts')

            if (!response.ok) {
                throw new Error(`Failed to fetch accounts: ${response.status}`)
            }

            const { data } = await response.json();
            return data;
        },
    })
    return query;
}
