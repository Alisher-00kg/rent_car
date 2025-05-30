import Progress from "./icons/n2.svg?react";
import Location from "./icons/n3.svg?react";
import Warning from "./icons/n4.svg?react";
import Left from "./icons/icon-left.svg?react";
import Right from "./icons/icon-right.svg?react";
import DefaultDropeZone from "./icons/default-zone.svg?react";
import WhatsApp from "./icons/wts.svg?react";
import DeleteIcon from "./icons/delete-icon.svg?react";
import EditIcon from "./icons/edit-icon.svg?react";
import WhiteHeart from "./icons/white-heart.svg?react";
import styled from "styled-components";
import ChevronLeft from "./icons/chevron-left.svg?react";
import WhatsAppNav from "./icons/whats-app.svg?react";
import Telegram from "./icons/telegram.svg?react";
import Instagram from "./icons/instagram.svg?react";
import TikTok from "./icons/tik-tok.svg?react";
import FaceBook from "./icons/facebook.svg?react";
import DropClick from "./icons/drop-click.svg?react";
import DeleteDropZoneImage from "./icons/delete.svg?react";
import EmptyFavorite from "./icons/undraw_delivery-truck_mjui.svg?react";
import XSymbol from "./icons/x-symbol.svg?react";
import ArrowBack from "./icons/arrow-back.svg?react";
import ArrowForward from "./icons/arrow-forward.svg?react";
import FiveStars from "./icons/stars.svg?react";
import ArrowDown from "./icons/arrow-down.svg?react";
import ArrowToFaqDown from "./icons/faq-down.svg?react";

const Styled24 = (Component) => styled(Component)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
const Styled18 = (Component) => styled(Component)`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;
const Styled60 = (Component) => styled(Component)`
  width: 60px;
  height: 60px;
  cursor: pointer;
`;
const Styled32 = (Component) => styled(Component)`
  width: 32px;
  height: 32px;
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
  DropClick,
  EmptyFavorite,
  FiveStars,
  WhiteHeart: Styled24(WhiteHeart),
  ChevronLeft: Styled18(ChevronLeft),
  WhatsAppNav: Styled60(WhatsAppNav),
  Telegram: Styled60(Telegram),
  Instagram: Styled60(Instagram),
  TikTok: Styled60(TikTok),
  FaceBook: Styled60(FaceBook),
  DeleteDropZoneImage: Styled32(DeleteDropZoneImage),
  XSymbol: Styled18(XSymbol),
  ArrowBack: Styled60(ArrowBack),
  ArrowForward: Styled60(ArrowForward),
  ArrowToFaqDown: Styled24(ArrowToFaqDown),
};
