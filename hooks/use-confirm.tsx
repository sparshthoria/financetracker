import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

export const useConfirm = (
    title: string,
    message: string
): [() => JSX.Element, () => Promise<boolean>] => {
    const [promise, setPromise] = useState<{
        resolve: (value: boolean) => void;
        reject: (reason?: any) => void;
    } | null>(null); // To store resolve and reject functions

    const confirm = () => {
        return new Promise<boolean>((resolve, reject) => {
            setPromise({ resolve, reject });
        });
    };

    const handleClose = () => {
        setPromise(null);
    };

    const handleConfirm = () => {
        if (promise) promise.resolve(true);
        handleClose();
    };

    const handleCancel = () => {
        if (promise) promise.resolve(false);
        handleClose();
    };

    const ConfirmDialog = () => (
        <Dialog open={promise !== null}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="pt-2">
                    <Button
                        onClick={handleCancel}
                        variant={"outline"}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return [ConfirmDialog, confirm];
};
