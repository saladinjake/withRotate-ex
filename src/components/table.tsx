"use client";
import {
  getCoreRowModel,
  ColumnDef,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

interface ITableProps<C, D> {
  data: D;
  columns: C;
}

interface IconProps {
  name: string;
  className?: string;
  style?: any;
}

const Icon = (props:  IconProps) => {
  const { name, className, style = "" } = props;
  return (
    <svg viewBox="0 0 24 24" className={className} style={style}>
      <use xlinkHref={`/icons/sprite.svg#${name}`} />
    </svg>
  );
};



const Table = <C extends ColumnDef<unknown, any>[], D extends unknown[]>(
  props: ITablePropss<C, D>
) => {
  const { data, columns } = props;
  const tableData = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Box as="table" width="full">
      <thead>
        {tableData.getHeaderGroups().map((group) => (
          <Box as="tr" key={group.id} borderBottom="1px solid #eee">
            {group.headers.map((header) => {
              const colHeader = header?.column?.columnDef?.header?.toString();
              return (
                <Box
                 textAlign="left"
                  color="#5C5E6E"
                  fontWeight="400"
                  fontSize="12px"
                  padding="6px 0"
                  key={header.id}
                  as="th"  
                >
                  <Flex alignItems="center" columnGap="18px">
                    {colHeader === "NAME" && (
                      <Icon
                        name="users"
                        style={{ fill: "none", width: "26px" }}
                      />
                    )}
                    {!header.isPlaceholder &&
                      flexRender(colHeader, header.getContext())}
                  </Flex>
                </Box>
              );
            })}
          </Box>
        ))}
      </thead>

      <tbody>
        {tableData.getRowModel().rows.map((row, index) => (
          <Box
           borderTop="1px solid rgba(202, 206, 225, 0.4)"
            as="tr"
            key={row.id}
           
          >
            {row.getVisibleCells().map((cell) => {
              return (
                <Box
                  padding="15px 0"
                  color="#292B34"
                  fontSize="14px"
                  as="td"
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Box>
              );
            })}
          </Box>
        ))}
      </tbody>
    </Box>
  );
};

export default Table;
