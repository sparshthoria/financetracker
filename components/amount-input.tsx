import { useState, useMemo } from "react";
import CurrencyInput from "react-currency-input-field";
import { Select } from "@/components/select";

type Props = {
    value: string;
    onChange: (value: string | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
};

export const AmountInput = ({ value, onChange, placeholder, disabled }: Props) => {
    const [transactionType, setTransactionType] = useState(parseFloat(value) < 0 ? "Expense" : "Income");

    const handleTransactionTypeChange = (type?: string) => {
        setTransactionType(type || "Income");
        if (value) {
            onChange(type === "Expense" ? `${Math.abs(parseFloat(value)) * -1}` : `${Math.abs(parseFloat(value))}`);
        }
    };

    const transactionOptions = useMemo(
        () => [
            { label: "Income", value: "Income" },
            { label: "Expense", value: "Expense" },
        ],
        []
    );

    return (
        <div className="relative flex items-center gap-2">
            <CurrencyInput
                prefix="₹"
                className="flex h-10 w-[45%] sm:w-[65%] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={placeholder}
                value={parseFloat(value) < 0 ? (parseFloat(value) * -1).toString() : value}
                decimalsLimit={2}
                decimalScale={2}
                onValueChange={onChange}
                disabled={disabled}
            />

            <Select
                placeholder="Select type"
                options={transactionOptions}
                onChange={handleTransactionTypeChange}
                value={transactionType}
                disabled={disabled}
            />
        </div>
    );
};
