import Progress from "./icons/n2.svg?react";
import Location from "./icons/n3.svg?react";
import Warning from "./icons/n4.svg?react";
import ArrowDown from "./icons/arrow-down.svg?react";
import Left from "./icons/icon-left.svg?react";
import Right from "./icons/icon-right.svg?react";
import DefaultDropeZone from "./icons/default-zone.svg?react";
import WhatsApp from "./icons/wts.svg?react";
import DeleteIcon from "./icons/delete-icon.svg?react";
import EditIcon from "./icons/edit-icon.svg?react";
import WhiteHeart from "./icons/white-heart.svg?react";
import styled from "styled-components";

const Styled24 = (Component) => styled(Component)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const Icons = {
  Progress,
  Location,
  Warning,
  ArrowDown,
  Left,
  Right,
  DefaultDropeZone,
  WhatsApp,
  DeleteIcon,
  EditIcon,
  WhiteHeart: Styled24(WhiteHeart),
};
