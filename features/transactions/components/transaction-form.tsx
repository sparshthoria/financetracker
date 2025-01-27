import { z } from "zod";
import { TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/select"
import { insertTransactionSchema } from "@/db/schema";
import { 
    Form,
    FormControl,
    FormItem,
    FormField,
    FormLabel,
    FormMessage
 } from "@/components/ui/form"
import { DatePicker } from "@/components/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { AmountInput } from "@/components/amount-input";
import { convertAmountFromMilliUnits, convertAmountToMilliUnits } from "@/lib/utils";
import { toast } from "sonner";

const formSchema = z.object({
   date: z.coerce.date(),
   accountId: z.string(),
   categoryId: z.string().nullable().optional(),
   payee: z.string(),
   amount: z.string(),
   notes: z.string().optional(),    
});

const ApiFormSchema = insertTransactionSchema.omit({
    id: true,
});

type FormValues = z.input<typeof formSchema>;
type ApiFormValues = z.input<typeof ApiFormSchema>;

type Props = {
    id?: string,
    defaultValues?: FormValues,
    onSubmit: (values: FormValues) => void,
    onDelete?: () => void,
    disabled?: boolean,
    accountOptions: { label: string; value: string; }[];
    categoryOptions: { label: string; value: string; }[];
    onCreateAccount: (name: string) => void;
    onCreateCategory: (name: string) => void; 
};

export const TransactionForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
    accountOptions,
    categoryOptions,
    onCreateAccount,
    onCreateCategory,
}: Props) => {

    const form = useForm<FormValues>({
        defaultValues,
    });

    const handleSubmit = (values: FormValues) => {
        const { date, accountId, payee, amount } = values;

        if (!date) {
            toast.error("Date is required");
            return;
        }
        if (!accountId) {
            toast.error("Account is required");
            return;
        }
        if (!payee) {
            toast.error("Payee is required");
            return;
        }
        if (!amount) {
            toast.error("Amount is required");
            return;
        }

        const parsedAmount = parseFloat(amount);
        const amountInMilliUnits = convertAmountToMilliUnits(parsedAmount);
        
        onSubmit({
            ...values,
            amount: amountInMilliUnits.toString(),
        });
    };

    const handleDelete = () => {
       onDelete?.();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit, (errors) => {
                console.log("Form validation errors:", errors); 
            })}
            className="space-y-4 pt-4 custom-scrollbar"
            >  
                <FormField
                 name="date"
                 control={form.control}
                 render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <DatePicker
                                value={field.value}
                                onChange={field.onChange}
                                disabled={disabled}
                            />
                        </FormControl>
                    </FormItem>
                 )}
                />

                <FormField
                 name="accountId"
                 control={form.control}
                 render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Account
                        </FormLabel>
                        <FormControl>
                            <Select 
                              placeholder="Select an account"
                              options={accountOptions}
                              onCreate={onCreateAccount}
                              value={field.value}
                              onChange={field.onChange}
                              disabled={disabled}
                            />
                        </FormControl>
                    </FormItem>
                 )}
                />

                <FormField
                 name="categoryId"
                 control={form.control}
                 render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Category
                        </FormLabel>
                        <FormControl>
                            <Select 
                              placeholder="Select a category"
                              options={categoryOptions}
                              onCreate={onCreateCategory}
                              value={field.value}
                              onChange={field.onChange}
                              disabled={disabled}
                            />
                        </FormControl>
                    </FormItem>
                 )}
                />

                <FormField
                 name="payee"
                 control={form.control}
                 render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Payee
                        </FormLabel>
                        <FormControl>
                            <Input 
                              disabled={disabled}
                              placeholder="Add a payee"
                              {...field}
                            />
                        </FormControl>
                    </FormItem>
                 )}
                />
                
                <FormField
                 name="amount"
                 control={form.control}
                 render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Amount
                        </FormLabel>
                        <FormControl>
                            <AmountInput
                                {...field}
                                disabled={disabled}
                                placeholder="0.00"
                            />
                        </FormControl>
                    </FormItem>
                 )}
                />

                <FormField
                 name="notes"
                 control={form.control}
                 render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Notes
                        </FormLabel>
                        <FormControl>
                            <Textarea
                              {...field}
                              value={field.value ?? ""}
                              disabled={disabled}
                              placeholder="Add a note"
                            />
                        </FormControl>
                    </FormItem>
                 )}
                />

                <Button className="w-full" disabled={disabled} >
                    {id ? "Save changes": "Create Transaction"}
                </Button>

                {!!id && (
                    <Button 
                        type="button"
                        disabled={disabled}
                        onClick={handleDelete}
                        className="w-full flex justify-center gap-2"
                        size={"icon"}
                        variant={"outline"}
                    >
                        <TrashIcon className="size-4" />
                        <p>Delete Transaction</p>
                    </Button>
                )}
            </form>
        </Form>
    );
};
