import { Feather, Ionicons } from "@expo/vector-icons";
import {
  banhmy,
  breadHistory,
  cake,
  nemRan,
  noodles,
  ocNoodle,
  rice,
  springRoll,
} from "../assets/img/foods";
import { avatar } from "../assets/img/avatars";

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
    tags: ["Truyền thống"],
    isLiked: false,
    isRate: false,
    isFavorite: false,
  },
  {
    img: springRoll,
    name: "Gỏi cuốn",
    like: 3.0,
    rate: 4.4,
    tags: ["Truyền thống"],
    isLiked: true,
    isRate: false,
    isFavorite: false,
  },
  {
    img: nemRan,
    name: "Nem rán",
    like: 1.5,
    rate: 4.2,
    tags: ["Truyền thống"],
    isLiked: true,
    isRate: false,
    isFavorite: false,
  },
  {
    img: ocNoodle,
    name: "Bún ốc",
    like: 2.5,
    rate: 4.9,
    tags: ["Truyền thống"],
    isLiked: false,
    isRate: false,
    isFavorite: false,
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
  "Truyền thống",
  "Phổ biến",
  "Mới",
  "Yêu thích",
  "Bánh",
  "Cơm",
];

export const navItems = [
  {
    title: "Mô tả",
    content:
      "Bánh mì là một món ăn Việt Nam, với lớp vỏ ngoài là một ổ bánh mì nướng có da giòn, ruột mềm, còn bên trong là phần nhân. Tùy theo văn hóa vùng miền hoặc sở thích cá nhân, người ta có thể chọn nhiều nhân bánh mì khác nhau.",
  },
  {
    title: "Lịch sử",
    histories: breadHistory,
  },
  { title: "Công thức" },
];

export const comments = [
  {
    img: avatar,
    content: "Nhìn ngon quá! Cho một miếng đi mà:v",
    likeAmount: 6,
    name: "Andrew",
    time: "1 giờ",
  },
  {
    img: avatar,
    content: "Good job em",
    likeAmount: 6,
    name: "Andrew",
    time: "1 giờ",
  },
  {
    img: avatar,
    content: "Tuyệt vời",
    likeAmount: 6,
    name: "Andrew",
    time: "1 giờ",
  },
  {
    img: avatar,
    content: "hay quá! <3",
    likeAmount: 6,
    name: "Andrew",
    time: "1 giờ",
  },
  {
    img: avatar,
    content: "mlem mlem :))",
    likeAmount: 6,
    name: "Andrew",
    time: "1 giờ",
  },
];
