import { Feather, Ionicons } from "@expo/vector-icons";
import {
  banhmy,
  cake,
  nemRan,
  noodles,
  ocNoodle,
  rice,
  springRoll,
} from "../assets/img/foods";

export const variousFoods = [
  { img: noodles, title: "Mỳ" },
  { img: rice, title: "Cơm" },
  { img: cake, title: "Bánh" },
];

export const mostlySearch = [
  {
    img: banhmy,
    name: "Bánh mỳ",
    like: 2.4,
    rate: 4.5,
    tag: "Truyền thống",
  },
  {
    img: springRoll,
    name: "Gỏi cuốn",
    like: 3.0,
    rate: 4.4,
    tag: "Truyền thống",
  },
  {
    img: nemRan,
    name: "Nem rán",
    like: 1.5,
    rate: 4.2,
    tag: "Truyền thống",
  },
  {
    img: ocNoodle,
    name: "Bún ốc",
    like: 2.5,
    rate: 4.9,
    tag: "Truyền thống",
  },
];

export const listOptions = [
  { icon: "pencil", title: "Chỉnh sửa tên danh sách" },
  { icon: "share-social", title: "Chia sẻ danh sách" },
  { icon: "trash-outline", title: "Xóa món ăn trong danh sách" },
  { icon: "trash-outline", title: "Xóa danh sách" },
];

export const notifytions = {
  today: [
    { name: "Thùy Linh", blog: "Duy nến", isComment: false, isRead: false },
    { name: "Trâm Anh", blog: "Duy nến", isComment: false, isRead: true },
    { name: "Ngọc", blog: "Duy nến", isComment: true, isRead: true },
    { name: "Thảo cute", blog: "Duy nến", isComment: false, isRead: false },
  ],
  before: [
    { name: "Quỳnh Nga", blog: "Duy nến", isComment: false, isRead: false },
    { name: "Quỳnh", blog: "Duy nến", isComment: true, isRead: false },
    { name: "My sói", blog: "Duy nến", isComment: true, isRead: true },
    { name: "Ngân lonely", blog: "Duy nến", isComment: false, isRead: false },
  ],
};

export const viralSearchs = [
  "Phổ biến",
  "Truyền thống",
  "Mới",
  "Yêu thích",
  "Bánh",
  "Cơm",
];
