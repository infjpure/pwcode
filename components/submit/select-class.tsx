"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ClassSelect } from "@/lib/types";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  classes: ClassSelect[];
};

export function SelectClass({ classes }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(
    classes.find((cl) => cl.id === params.get("query"))?.name
  );
  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (currentValue) {
      params.set(
        "query",
        classes.find((cl) => cl.name === currentValue)?.id as string
      );
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-fit"
        >
          {value
            ? classes.find((cl) => cl.name === value)?.name
            : "Chọn lớp học"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-fit">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>Chọn lớp học</CommandEmpty>
            <CommandGroup>
              {classes.map((cl) => (
                <CommandItem
                  key={cl.name}
                  value={cl.name}
                  onSelect={handleSelect}
                >
                  {cl.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === cl.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
