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

/** Desktop crop for Works page grid (non-featured); filenames: Image-{n}-1.webp */
import Image4Desktop from "../assets/Works/Image-4-1.webp";
import Image5Desktop from "../assets/Works/Image-5-1.webp";
import Image11Desktop from "../assets/Works/Image-11-1.webp";
import Image12Desktop from "../assets/Works/Image-12-1.webp";

const worksData = [
  {
    id: "001",
    title: "Glass Graphic Print",
    subtitle: "Client: Mudon",
    image: Image2,
    featured: true,
  },
  {
    id: "002",
    title: "Static Hoarding",
    subtitle: "Client: Sephora",
    image: Image1,
    featured: true,
  },
  {
    id: "003",
    title: "Flex Wrap",
    subtitle: "Client: Fashion Forward",
    image: Image4,
    featured: true,
  },
  {
    id: "004",
    title: "Lampost",
    subtitle: "Client: Primark",
    image: Image3,
    featured: true,
  },
  {
    id: "005",
    title: "Vehicle Wrap",
    subtitle: "Client: BNW",
    image: Image5,
    featured: true,
  },
  {
    id: "006",
    title: "Digital Screen | Unipole",
    subtitle: "Client: Papa Johns",
    image: Image6,
    featured: true,
  },
  {
    id: "007",
    title: "Wall Banners",
    subtitle: "Client: Papa Johns",
    image: WorkImgWallBanners,
    featured: false,
  },
  {
    id: "008",
    title: "Flag Print",
    subtitle: "Client: Emirates NBD",
    image: WorkImgFlagPrint,
    imageDesktop: Image4Desktop,
    featured: false,
  },
  {
    id: "009",
    title: "RTA Taxi Wrap",
    subtitle: "Client: Dominos",
    image: WorkImgRtaTaxiWrap,
    imageDesktop: Image5Desktop,
    featured: false,
  },
  {
    id: "010",
    title: "3D Hoarding",
    subtitle: "Client: Kraft",
    image: WorkImg3DHoarding,
    featured: false,
  },
  {
    id: "011",
    title: "Indoor Printing",
    subtitle: "Client: Nakheel – Dragon Mall 1 & 2",
    image: WorkImgIndoorPrinting,
    featured: false,
  },
  {
    id: "012",
    title: "Flex Printing",
    subtitle: "Client: Mercedes",
    image: WorkImgFlexPrinting,
    imageDesktop: Image11Desktop,
    featured: false,
  },
  {
    id: "013",
    title: "Rooftop Printing",
    subtitle: "Client: CassiaT",
    image: WorkImgRooftopPrinting,
    imageDesktop: Image12Desktop,
    featured: false,
  },
  {
    id: "014",
    title: "Static Hoarding",
    subtitle: "Client: Taraf",
    image: WorkImgStaticHoarding,
    featured: false,
  },
  {
    id: "015",
    title: "Digital Screen",
    subtitle: "Client: Mercedes Benz",
    image: WorkImgDigitalScreen,
    featured: false,
  },
];

export default worksData;
