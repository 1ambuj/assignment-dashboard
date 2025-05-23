import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
export const columns = [
    {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Article Title",
  },
  {
    accessorKey: "keyword",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Keyword [Traffic]
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: (rowA, rowB, columnId) => {
      const extractTraffic = (value) => {
        const match = value.match(/\[(\d+)\]/);
        return match ? parseInt(match[1], 10) : 0;
      };
      const a = extractTraffic(rowA.getValue(columnId));
      const b = extractTraffic(rowB.getValue(columnId));
      return a - b;
    },
  },
  {
    accessorKey: "words",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Words
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
  accessorKey: "createdOn",
  header: ({ column }) => (
    <Button
      variant="ghost"
      onClick={() =>
        column.toggleSorting(column.getIsSorted() === "asc")
      }
    >
      Created On
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
  cell: ({ row }) => {
    const rawDate = row.original.createdOn;

    if (!rawDate) {
      return <span className="text-muted-foreground">---</span>;
    }

    const createdDate = new Date(rawDate);
    const isValidDate = !isNaN(createdDate);

    return (
      <span>
        {isValidDate
          ? formatDistanceToNow(createdDate, { addSuffix: true })
          : "---"}
      </span>
    );
  },
},

  
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item.id)}>
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "publish",
    header: "Publish",
  },
];
