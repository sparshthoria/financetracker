import { z } from "zod";
import { TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { insertAccountSchema } from "@/db/schema";
import { 
    Form,
    FormControl,
    FormItem,
    FormField,
    FormLabel,
    FormMessage
 } from "@/components/ui/form"

 const formSchema = insertAccountSchema.pick({
    name: true,
 })

 type FormValues = z.input<typeof formSchema>;

 type Props = {
    id?: string,
    defaultValues?: FormValues,
    onSubmit: (values: FormValues) => void,
    onDelete?: () => void,
    disabled?: boolean
 }

 export const AccountForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
 }: Props) => {

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    const handleSubmit = (values: FormValues) => {
        onSubmit(values)
    }

    const handleDelete = () => {
       onDelete?.();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 pt-4"
            >
                <FormField
                 name="name"
                 control={form.control}
                 render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Name
                        </FormLabel>
                        <FormControl>
                            <Input 
                            disabled={disabled}
                            placeholder="eg. Cash, Bank, Credit Card etc..."
                            {...field}
                            />
                        </FormControl>
                    </FormItem>
                 )}
                 />
                 <Button className="w-full" disabled={disabled}>
                    {id ? "Save changes": "Create account"}
                 </Button>
                 {!!id && <Button 
                    type="button"
                    disabled={disabled}
                    onClick={handleDelete}
                    className="w-full flex justify-center gap-2"
                    size={"icon"}
                    variant={"outline"}
                 >
                    <TrashIcon className="size-4" />
                    <p>Delete account</p>
                 </Button>}
            </form>
        </Form>
    )
 }