import React from "react";
import { ActionCell } from "../helpers/action-cell";

export const COLUMNS = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Категория",
    accessor: "category",
  },
  {
    Header: "Картинка",
    accessor: "image",
    Cell: ({ row }) => {
      return React.createElement("img", {
        src: row.original.images[0] || "",
        style: {
          width: "120px",
          height: "30px",
          objectFit: "scale-down",
          borderRadius: "4px",
        },
      });
    },
  },
  {
    Header: "Модель",
    accessor: "model",
  },
  {
    Header: "Год",
    accessor: "yearOfRelease",
  },
  {
    Header: "Коробка передач",
    accessor: "transmission",
  },
  {
    Header: "Топливо",
    accessor: "fuelType",
  },
  {
    Header: "Страна прозводства",
    accessor: "madeInCountry",
  },
  {
    Header: "Цена за день",
    accessor: "rentPrice",
  },
  {
    Header: "Действие",
    accessor: "action",
    Cell: ActionCell,
  },
];

export const PATHS = {
  GUEST: {
    ROOT: "/guest",
    PAGE: "/guest/main-page",
    PAGE_DETAILS: "/guest/main-page/:carId",
    TARIFFS: "/guest/tariffs",
    SALES: "/guest/sales",
    CONTACTS: "/guest/contacts",
    ABOUTUS: "/guest/aboutus",
    PROFILE: "/guest/profile",
    FAVORITE: "/guest/favorite",
  },
  USER: {
    ROOT: "/user",
    PAGE: "/user/user-page",
    PAGE_DETAILS: "/user/user-page/:carId",
    TARIFFS: "/user/tariffs",
    SALES: "/user/sales",
    CONTACTS: "/user/contacts",
    ABOUTUS: "/user/aboutus",
    PROFILE: "/user/profile",
    FAVORITE: "/user/favorite",
  },

  ADMIN: {
    ROOT: "/admin",
    PAGE: "/admin/admin-page",
    PAGE_DETAILS: "/admin/admin-page/:carId",
    ORDERS: "/admin/admin-orders",
    CREATE: "/admin/admin-page/create-card",
    FEEDBACK: "/admin/feedback",
  },
  NOT_FOUND: "*",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
};
