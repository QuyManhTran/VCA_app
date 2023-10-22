import { colors } from "../../../constants";

export const banhmy = require("./banhmy.jpg");
export const northern = require("./northern.png");
export const middle = require("./middle.png");
export const southern = require("./southern.png");
export const noodles = require("./noodles.png");
export const rice = require("./rice.png");
export const cake = require("./cake.png");
export const springRoll = require("./spring-roll.png");
export const nemRan = require("./nemran.jpg");
export const ocNoodle = require("./ocnoodle.jpg");
export const list = require("./list.jpg");
export const Tet = require("./Tet.jpg");
export const TayNamBo = require("./TayNamBo.jpg");
export const Hue = require("./Hue.jpg");
export const HaNoi = require("./HaNoi.jpg");
export const PhoBo = require("./PhoBo.jpg");
export const BunBo = require("./BunBo.jpg");
export const Com = require("./Com.jpg");
export const BanhXeo = require("./BanhXeo.jpg");
export const banners = [
  {
    img: Tet,
    keyword: "Tết",
    content: [
      { content: "Hương Vị", color: "#fff" },
      { content: "Ngày Tết", color: "#f37575" },
    ],
  },
  {
    img: Hue,
    keyword: "Huế",
    content: [
      { content: "Ẩm Thực", color: "#fff" },
      { content: "Huế Xưa", color: colors.violet },
    ],
  },
  {
    img: TayNamBo,
    keyword: "Tây Nam Bộ",
    content: [
      { content: "Đậm Đà", color: "#fff" },
      { content: "Miền Tây", color: "#88ec90" },
    ],
  },
  {
    img: HaNoi,
    keyword: "Hà Nội",
    content: [
      { content: "Mùa Thu", color: "#fff" },
      { content: "Hà Nội", color: "#88ec90" },
    ],
  },
];
export const recommendLists = [
  {
    name: "Bánh mỳ",
    img: banhmy,
    like: 3.0,
    rate: 4.4,
    tag: "Truyền thống",
    isLiked: false,
  },
  {
    name: "Phở bò",
    img: PhoBo,
    like: 3.0,
    rate: 4.4,
    tag: "Truyền thống",
    isLiked: true,
  },
  {
    name: "Bún bò",
    img: BunBo,
    like: 3.0,
    rate: 4.4,
    tag: "Truyền thống",
    isLiked: false,
  },
  {
    name: "Bánh cốm",
    img: Com,
    like: 3.0,
    rate: 4.4,
    tag: "Truyền thống",
    isLiked: true,
  },
  {
    name: "Bánh xèo",
    img: BanhXeo,
    like: 3.0,
    rate: 4.4,
    tag: "Truyền thống",
    isLiked: true,
  },
];
const exploreData = [
  {
    name: "Miền Bắc",
    img: northern,
  },
  {
    name: "Miền Trung",
    img: middle,
  },
  {
    name: "Miền Nam",
    img: southern,
  },
];

export default exploreData;
