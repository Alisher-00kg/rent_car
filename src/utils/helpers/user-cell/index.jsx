import { IconButton, Tooltip } from "@mui/material";
import { Icons } from "../../../assets";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteUserData } from "../../../store/thunks/usersThunk";
import { EditUserModal } from "../../../components/UI/modal/EditUserModal";
export const UsersActionCell = ({ row }) => {
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent?.stopImmediatePropagation();
    setOpenEdit(true);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent?.stopImmediatePropagation();
    dispatch(deleteUserData(row.original.id));
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
        <EditUserModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          user={row.original}
        />
      )}
    </>
  );
};
