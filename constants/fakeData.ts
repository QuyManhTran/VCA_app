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
    isLiked: false,
    isRate: false,
    isFavorite: false,
  },
  {
    img: springRoll,
    name: "Gỏi cuốn",
    like: 3.0,
    rate: 4.4,
    tag: "Truyền thống",
    isLiked: true,
    isRate: false,
    isFavorite: false,
  },
  {
    img: nemRan,
    name: "Nem rán",
    like: 1.5,
    rate: 4.2,
    tag: "Truyền thống",
    isLiked: true,
    isRate: false,
    isFavorite: false,
  },
  {
    img: ocNoodle,
    name: "Bún ốc",
    like: 2.5,
    rate: 4.9,
    tag: "Truyền thống",
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
  "Phổ biến",
  "Truyền thống",
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
    title: "Ý nghĩa",
    content:
      "Đầu thế kỷ 19, người Pháp trong cuộc viễn chinh chiếm thành Gia Định (Sài Gòn) đã mang theo baguette để thỏa thú ẩm thực phong lưu của mình. Ban đầu, loại thức ăn này được dân ta nhìn nhận như một món ăn chơi dành cho giới thượng lưu, không được coi là món ăn chính. Chiếc bánh mì “baguette” theo chân lính Pháp vào nước ta vẫn còn chuẩn phong cách Pháp: dài khoảng 80 cm, mềm hơn và đặc ruột. Bột mì ít đi, giá cũng mềm hơn, bánh mì đã không chỉ còn dành cho giới thượng lưu. Thời ấy, một chủ tiệm bánh mì ở Sài Gòn cảm thấy việc ăn bánh mì cùng bơ, thịt nguội, pate trên đĩa quá “cồng kềnh” và mất thời gian, bèn nghĩ ra cách kẹp vào bánh để có thể thuận tiện mang theo. Cứ như thế, những chiếc bánh mì kẹp có mặt khắp các ngõ ngách Sài Gòn, trở thành món ăn chính, là “cơm cầm tay” xuất hiện tại hầu khắp các đô thị cho tới vùng thôn quê VN.",
  },
  { title: "Công thức" },
];
