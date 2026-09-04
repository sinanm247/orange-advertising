import Image1 from "../assets/Works/Image-1.webp";
import Image2 from "../assets/Works/Image-15.webp";
import Image3 from "../assets/Works/Image-2.webp";
import Image4 from "../assets/Works/Image-7.webp";
import Image5 from "../assets/Works/Image-6.webp";
import Image6 from "../assets/Works/Image-10.webp";
import WorkImgWallBanners from "../assets/Works/Image-3.webp";
import WorkImgFlagPrint from "../assets/Works/Image-4.webp";
import WorkImgRtaTaxiWrap from "../assets/Works/Image-5.webp";
import WorkImg3DHoarding from "../assets/Works/Image-8.webp";
import WorkImgIndoorPrinting from "../assets/Works/Image-9.webp";
import WorkImgFlexPrinting from "../assets/Works/Image-11.webp";
import WorkImgRooftopPrinting from "../assets/Works/Image-12.webp";
import WorkImgStaticHoarding from "../assets/Works/Image-13.webp";
import WorkImgDigitalScreen from "../assets/Works/Image-14.webp";

import Image16 from "../assets/Works/Image-16-1.webp";
import Image17 from "../assets/Works/Image-17.webp";
import Image18 from "../assets/Works/Image-18-1.webp";

/** Desktop crop for Works page grid (non-featured); filenames: Image-{n}-1.webp */
import Image4Desktop from "../assets/Works/Image-4-1.webp";
import Image5Desktop from "../assets/Works/Image-5-1.webp";
import Image11Desktop from "../assets/Works/Image-11-1.webp";
import Image12Desktop from "../assets/Works/Image-12-1.webp";

const worksData = [
  {
    id: "001",
    title: "Glass Graphic",
    service: "Window Branding",
    client: "Modon",
    image: Image2,
    featured: true,
  },
  {
    id: "011",
    title: "Indoor Printing",
    service: "Displays",
    client: "Nakheel – Dragon Mall 1 & 2",
    image: WorkImgIndoorPrinting,
    featured: true,
  },
  {
    id: "002",
    title: "Static Hoarding",
    service: "Advertisement Boards",
    client: "Sephora",
    image: Image1,
    featured: false,
  },
  {
    id: "003",
    title: "Flex Wrap",
    service: "Flex Banners",
    client: "Fashion Forward",
    image: Image4,
    featured: true,
  },
  {
    id: "016",
    title: "Indoor Vinyl stickers Printing",
    service: "Vinyl Branding",
    client: "La Marquise – Stand at Gulf Food 2017",
    image: Image16,
    featured: true,
  },
  {
    id: "004",
    title: "Lampost",
    service: "Outdoor",
    client: "Primark",
    image: Image3,
    featured: false,
  },
  {
    id: "006",
    title: "Digital Screen",
    service: "LED Installation and Project Management",
    client: "Papa Johns",
    image: Image6,
    featured: true,
  },
  {
    id: "009",
    title: "RTA Taxi Wrap",
    service: "Vinyl Branding",
    client: "Dominos",
    image: WorkImgRtaTaxiWrap,
    imageDesktop: Image5Desktop,
    featured: false,
  },
  {
    id: "007",
    title: "Wall Banners",
    service: "Wall Signs",
    client: "Papa Johns",
    image: WorkImgWallBanners,
    featured: false,
  },
  {
    id: "008",
    title: "Flag Print",
    service: "Flags",
    client: "Emirates NBD",
    image: WorkImgFlagPrint,
    imageDesktop: Image4Desktop,
    featured: false,
  },
  {
    id: "010",
    title: "3D Hoarding",
    service: "3D",
    client: "Kraft",
    image: WorkImg3DHoarding,
    featured: false,
  },
  // {
  //   id: "012",
  //   title: "Flex Printing",
  //   service: "Flex Banners",
  //   client: "Mercedes",
  //   image: WorkImgFlexPrinting,
  //   imageDesktop: Image11Desktop,
  //   featured: false,
  // },
  {
    id: "013",
    title: "Rooftop Printing",
    service: "Outdoor",
    client: "CassiaT",
    image: WorkImgRooftopPrinting,
    imageDesktop: Image12Desktop,
    featured: false,
  },
  // {
  //   id: "014",
  //   title: "Static Hoarding",
  //   service: "Advertisement Boards",
  //   client: "Taraf",
  //   image: WorkImgStaticHoarding,
  //   featured: false,
  // },
  // {
  //   id: "015",
  //   title: "Digital Screen",
  //   service: "LED Installation and Project Management",
  //   client: "Mercedes Benz",
  //   image: WorkImgDigitalScreen,
  //   featured: false,
  // },
  {
    id: "018",
    title: "Chalet Branding",
    service: "Signage",
    client: "Jumeirah Golf Estates",
    image: Image18,
    featured: false,
  },
];

export default worksData;
