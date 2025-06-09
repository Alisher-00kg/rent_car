import React from "react";
import { UsersActionCell } from "../helpers/user-cell";

export const usersColumn = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Имя",
    accessor: "firstName",
  },
  {
    Header: "Фамилия",
    accessor: "lastName",
  },
  {
    Header: "Почта",
    accessor: "email",
  },
  {
    Header: "Документы",
    accessor: "documents",
    Cell: ({ row }) => {
      return React.createElement(
        "p",
        {
          style: {
            width: "fit-content",
            height: "fit-content",
          },
        },
        row.original?.documents ? "В ожидании" : "Еще не загружены"
      );
    },
  },
  {
    Header: "Телефон номер",
    accessor: "phoneNumber",
  },
  {
    Header: "Дата регистрации",
    accessor: "localDate",
  },
  {
    Header: "Действие",
    accessor: "action",
    Cell: UsersActionCell,
  },
];
