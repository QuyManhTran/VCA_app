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
  { icon: "trash-outline", title: "Xóa danh sách" },
];
