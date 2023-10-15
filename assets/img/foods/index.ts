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
];
const exploreData = [
  {
    name: "Miền Bắc",
    image: northern,
  },
  {
    name: "Miền Trung",
    image: middle,
  },
  {
    name: "Miền Nam",
    image: southern,
  },
];
export default exploreData;
