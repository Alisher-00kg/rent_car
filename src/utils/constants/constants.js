import Audi from "../../assets/images/Audi2.png";
import Bizness from "../../assets/images/biznez4.png";
import Mers from "../../assets/images/biznez5.png";
import Bently from "../../assets/images/biznez16.png";
import WhiteCar from "../../assets/images/mersedes4.png";
export const CARS = [
  {
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
    category: "Винивены",
    image: [WhiteCar, Bently],
    model: "Audi B-klasse",
    year: 2022,
    transmission: "АКПП",
    fuel: "Бензин",
    engine: "1.5л",
    pricePerDay: 6500,
  },
  {
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

export const PATHS = {
  GUEST: {
    ROOT: "/guest",
    PAGE: "/guest/main-page",
    TARIFFS: "/guest/tariffs",
    SALES: "/guest/sales",
    CONTACTS: "/guest/contacts",
    ADDRESS: "/guest/address",
    PROFILE: "/guest/profile",
  },
  USER: {
    ROOT: "/user",
    PAGE: "/user/user-page",
    TARIFFS: "/user/tariffs",
    SALES: "/user/sales",
    CONTACTS: "/user/contacts",
    ADDRESS: "/user/address",
    PROFILE: "/user/profile",
  },

  ADMIN: {
    ROOT: "/admin",
    PAGE: "/admin/admin-page",
  },
  NOT_FOUND: "*",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
};
