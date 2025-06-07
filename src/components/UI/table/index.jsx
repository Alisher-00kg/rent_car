import { useState } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  styled,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export const Table = ({
  columns,
  data,
  disableRowClick = false,
  selectedIds,
  setSelectedIds,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (id) => {
    if (location.pathname === "/admin/admin-page") {
      navigate(`/admin/admin-page/${id}`);
    }
  };

  const handleCheckboxClick = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const isSelected = (id) => (selectedIds || []).includes(id);

  const renderCellContent = (column, row) => {
    if (column.type === "checkbox") {
      return (
        <Checkbox
          checked={isSelected(row.id)}
          onChange={() => handleCheckboxClick(row.id)}
          onClick={(e) => e.stopPropagation()}
        />
      );
    }
    const getValue = () => {
      if (typeof column.accessor === "function") {
        return column.accessor(row);
      } else if (typeof column.accessor === "string") {
        return row[column.accessor];
      }
      return null;
    };

    const value = getValue();

    if (column.type === "checkbox") {
      return <Checkbox checked={isSelected(row.id)} />;
    } else if (column.type === "image") {
      return <ImageCell src={value} alt={`Product ${row.id}`} />;
    } else if (column.type === "price") {
      return value;
    } else if (column.Cell) {
      // return column.Cell({ row, value });
      // return column.Cell({ row: { original: row }, value });
      const CellComponent = column.Cell;
      return <CellComponent row={{ original: row }} value={value} />;
    } else {
      return value;
    }
  };

  return (
    <StyledTable aria-label="product table">
      <StyledTableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell
              key={column.id || column.accessor}
              align={column.align || "left"}
            >
              {column.Header}
            </TableCell>
          ))}
        </TableRow>
      </StyledTableHead>
      <StyledTableBody>
        {data.map((row) => {
          const isItemSelected = isSelected(row.id);

          return (
            <StyledTableRow
              key={row.id}
              selected={isItemSelected}
              onClick={
                !disableRowClick
                  ? (e) => {
                      const tagName = e.target.tagName.toLowerCase();
                      const className = e.target.className?.toString?.() || "";

                      if (
                        ["button", "svg", "path"].includes(tagName) ||
                        className.includes("MuiIconButton") ||
                        className.includes("MuiSvgIcon")
                      ) {
                        return;
                      }

                      if (e.defaultPrevented) return;

                      handleClick(row.id);
                    }
                  : undefined
              }
            >
              {columns.map((column) => {
                const cellKey =
                  column.id ||
                  (typeof column.accessor === "string"
                    ? column.accessor
                    : column.Header);

                if (column.type === "price") {
                  return (
                    <PriceCell key={cellKey} align={column.align || "right"}>
                      {renderCellContent(column, row)}
                    </PriceCell>
                  );
                } else {
                  return (
                    <TableCell key={cellKey} align={column.align || "left"}>
                      {renderCellContent(column, row)}
                    </TableCell>
                  );
                }
              })}
            </StyledTableRow>
          );
        })}
      </StyledTableBody>
    </StyledTable>
  );
};

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  width: "100%",
  "& .MuiTableCell-head": {
    backgroundColor: "#47536B",
    color: theme.palette.common.white,
    padding: "16px",
    fontWeight: 600,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "& .MuiTableCell-root": {
    border: "1px solid #CDCDCD",
    padding: "15px 10px",
  },

  "& .MuiTableCell-root:first-of-type": {
    borderRight: "none",
    borderTopLeftRadius: "16px",
    borderBottomLeftRadius: "16px",
  },

  "& .MuiTableCell-root:last-of-type": {
    borderLeft: "none",
    borderTopRightRadius: "16px",
    borderBottomRightRadius: "16px",
  },

  "& .MuiTableCell-root:not(:first-of-type):not(:last-of-type)": {
    borderLeft: "none",
    borderRight: "none",
  },

  "&:hover": {
    backgroundColor: theme.palette.action.selected,
    cursor: "pointer",
  },
}));

const StyledTableBody = styled(TableBody)({
  "&.MuiTableBody-root": {
    width: "100%",
  },
});

const ImageCell = styled("img")({
  width: "64px",
  height: "64px",
  objectFit: "cover",
});

const PriceCell = styled(TableCell)({
  color: "#2C68F5",
  fontWeight: 500,
});

const StyledTable = styled(MuiTable)({
  minWidth: 650,
  borderCollapse: "separate",
  borderSpacing: "0 10px",
});
