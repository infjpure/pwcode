import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  caption: string;
  tableHeadNames: Array<{ name: string; show: boolean }>;
  children: React.ReactNode;
};

const CustomTable = ({ caption, tableHeadNames, children }: Props) => {
  return (
    <Table className="w-full border-collapse border border-slate-400">
      <TableCaption className="caption-top">{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {tableHeadNames.map((head, index) => {
            if (!head.show) return null;
            return (
              <TableHead key={index} className="border border-slate-300">
                {head.name}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
};

export const CustomTableCell = ({
  children,
}: {
  children: React.ReactNode | string;
}) => {
  return <TableCell className="border border-slate-300">{children}</TableCell>;
};

export default CustomTable;
