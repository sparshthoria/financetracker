// "use client"

// import * as React from "react"
// import { format } from "date-fns"
// import { Calendar as CalendarIcon } from "lucide-react"
// import { SelectSingleEventHandler } from "react-day-picker"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"

// type Props = {
//     value?: Date;
//     onChange?: SelectSingleEventHandler;
//     disabled?: boolean;

// }

// export const DatePicker = ({
//     value,
//     onChange,
//     disabled,
// }: Props) => {
//     return (
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant={"outline"}
//                   className={cn(
//                     "w-full justify-start text-left font-normal",
//                     !value && "text-muted-foreground"
//                   )}
//                 >
//                   <CalendarIcon className="size-4 mr-2" />
//                   {value ? format(value, "PPP") : <span>Pick a date</span>}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0">
//                 <Calendar
//                   mode="single"
//                   selected={value}
//                   onSelect={onChange}
//                   initialFocus
//                 />
//               </PopoverContent>
//             </Popover>
//         )
// }

"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { SelectSingleEventHandler } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  value?: Date;
  onChange?: SelectSingleEventHandler;
  disabled?: boolean;
};

export const DatePicker = ({
  value,
  onChange,
  disabled,
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDateChange: SelectSingleEventHandler = (date, selectedDay, modifiers, event) => {
    if (date) {
      onChange?.(date, selectedDay, modifiers, event);  
      setIsOpen(false); 
    }
  };
  

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
          onClick={() => setIsOpen((prev) => !prev)} 
        >
          <CalendarIcon className="size-4 mr-2" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          className="bg-blue"
          mode="single"
          selected={value}
          onSelect={handleDateChange}  
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
