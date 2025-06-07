import { IconButton, Tooltip } from "@mui/material";
import { Icons } from "../../../assets";
import { useDispatch } from "react-redux";
import { deleteCarFromAdmin } from "../../../store/thunks/allCars";
import { useState } from "react";
import { EditCarModal } from "../../../components/UI/modal/EditCarModal";

export const ActionCell = ({ row }) => {
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent?.stopImmediatePropagation();
    console.log("Редактировать:", row.original);
    setOpenEdit(true);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent?.stopImmediatePropagation();
    console.log("Удалить:", row.original.id);
    dispatch(deleteCarFromAdmin(row.original.id));
  };

  return (
    <>
      <div
        style={{ display: "flex", gap: "8px" }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Tooltip title="Редактировать" arrow>
          <IconButton onClick={handleEdit} size="small">
            <Icons.EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Удалить" arrow>
          <IconButton onClick={handleDelete} size="small">
            <Icons.DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
      {openEdit && (
        <EditCarModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          car={row.original}
        />
      )}
    </>
  );
};
