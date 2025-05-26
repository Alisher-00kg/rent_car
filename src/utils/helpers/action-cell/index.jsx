import { IconButton } from "@mui/material";
import { Icons } from "../../../assets";

export const ActionCell = ({ row }) => {
  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent?.stopImmediatePropagation();
    console.log("Редактировать:", row.original);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent?.stopImmediatePropagation();
    console.log("Удалить:", row.original);
  };

  return (
    <div
      style={{ display: "flex", gap: "8px" }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <IconButton onClick={handleEdit} size="small">
        <Icons.EditIcon />
      </IconButton>
      <IconButton onClick={handleDelete} size="small">
        <Icons.DeleteIcon />
      </IconButton>
    </div>
  );
};
