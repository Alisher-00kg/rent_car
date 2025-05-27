import Audi from "../../assets/images/Audi2.png";
import Bizness from "../../assets/images/biznez4.png";
import Mers from "../../assets/images/biznez5.png";
import Bently from "../../assets/images/biznez16.png";
import WhiteCar from "../../assets/images/mersedes4.png";
import React from "react";
import { Icons } from "../../assets";
import { ActionCell } from "../helpers/action-cell";
export const CARS = [
  {
    id: 1,
    category: "Стандарт класс",
    image: [Audi, WhiteCar],
    model: "Audi B-klasse",
    year: 2022,
    transmission: "АКПП",
    fuel: "Бензин",
    engine: "1.5л",
    pricePerDay: 6500,
  },
  {
    id: 2,
    category: "Минивены",
    image: [WhiteCar, Bently],
    model: "Audi B-klasse",
    year: 2022,
    transmission: "АКПП",
    fuel: "Бензин",
    engine: "1.5л",
    pricePerDay: 6500,
  },
  {
    id: 3,
    category: "Комфорт класс",
    image: [Bizness, WhiteCar],
    model: "Mercedes-Benz Citan",
    year: 2017,
    transmission: "АКПП",
    fuel: "Бензин",
    engine: "1.6л",
    pricePerDay: 7500,
  },
  {
    id: 4,
    category: "Бизнес класс",
    image: [Mers, WhiteCar],
    model: "Mercedes-Benz Vito",
    year: 2015,
    transmission: "АКПП",
    fuel: "Бензин",
    engine: "1.5л",
    pricePerDay: 5500,
  },
  {
    id: 5,
    category: "Внедорожники",
    image: [Bently, WhiteCar],
    model: "Mercedes-Benz V-klasse",
    year: 2020,
    transmission: "АКПП",
    fuel: "Бензин",
    engine: "1.5л",
    pricePerDay: 8500,
  },
];

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
        src: row.image[0],
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
    accessor: "year",
  },
  {
    Header: "Коробка передач",
    accessor: "transmission",
  },
  {
    Header: "Топливо",
    accessor: "fuel",
  },
  {
    Header: "Двигатель",
    accessor: "engine",
  },
  {
    Header: "Цена за день",
    accessor: "pricePerDay",
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
  },
  NOT_FOUND: "*",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
};
