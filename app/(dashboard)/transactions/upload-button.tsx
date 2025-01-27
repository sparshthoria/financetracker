import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse"

import { Button } from "@/components/ui/button";

type Props = {
    onUpload: (results: any) => void;
};

export const UploadButton = ({ onUpload }: Props) => {
    const { CSVReader } = useCSVReader();


    return (
        <CSVReader onUploadAccepted={onUpload}>
            {({ getRootProps }: any) => (
                <Button
                    size={"sm"}
                    className="w-full lg:w-auto border-[1px] max-w-24 border-black"
                    variant={"outline"}
                    {...getRootProps()}
                >
                    <Upload className="size-4 mr-2" />
                    Import
                </Button>
            )}
        </CSVReader>
    )
}