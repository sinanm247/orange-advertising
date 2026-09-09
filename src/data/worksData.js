import Image1 from "../assets/Works/Image-1.webp";
import Image2 from "../assets/Works/Image-2.webp";
import Image2Narrow from "../assets/Works/Image-2-1.webp";
import Image3 from "../assets/Works/Image-3.webp";
import Image4 from "../assets/Works/Image-4.webp";
import Image4Narrow from "../assets/Works/Image-4-1.webp";
import Image5 from "../assets/Works/Image-5.webp";
import Image5Narrow from "../assets/Works/Image-5-1.webp";
import Image7 from "../assets/Works/Image-7.webp";
import Image8 from "../assets/Works/Image-8.webp";
import Image9 from "../assets/Works/Image-9.webp";
import Image10 from "../assets/Works/Image-10.webp";
import Image12 from "../assets/Works/Image-12.webp";
import Image12Narrow from "../assets/Works/Image-12-1.webp";
import Image15 from "../assets/Works/Image-15.webp";
import Image15Narrow from "../assets/Works/Image-15-1.webp";
import Image16 from "../assets/Works/Image-16.webp";
import Image16Narrow from "../assets/Works/Image-16-1.webp";
import Image17 from "../assets/Works/Image-17.webp";
import Image17Narrow from "../assets/Works/Image-17-1.webp";
import Image18 from "../assets/Works/Image-18.webp";
import Image18Narrow from "../assets/Works/Image-18-1.webp";
import Image19 from "../assets/Works/Image-19.webp";
import Image19Narrow from "../assets/Works/Image-19-1.webp";
import Image20 from "../assets/Works/Image-20.webp";
import Image20Narrow from "../assets/Works/Image-20-1.webp";
import Image21 from "../assets/Works/Image-21.webp";
import Image21Narrow from "../assets/Works/Image-21-1.webp";
import Image22 from "../assets/Works/Image-22.webp";
import Image22Narrow from "../assets/Works/Image-22-1.webp";
import Image23 from "../assets/Works/Image-23.webp";
import Image23Narrow from "../assets/Works/Image-23-1.webp";
import Image24 from "../assets/Works/Image-24.webp";
import Image24Narrow from "../assets/Works/Image-24-1.webp";

/**
 * image = 1500×1200 (wider slot)
 * imageNarrow = 1220×1200 (narrower slot, Image-{n}-1.webp)
 * Works page grid: left starts narrow/wide alternating by row.
 */
const worksData = [
  {
    id: "001",
    title: "Glass Graphic",
    service: "Window Branding",
    client: "Modon",
    image: Image15,
    imageNarrow: Image15Narrow,
    featured: true,
  },
  {
    id: "011",
    title: "Indoor Printing",
    service: "Displays",
    client: "Nakheel – Dragon Mall 1 & 2",
    image: Image9,
    featured: true,
  },
  {
    id: "019",
    title: "Backdrops",
    service: "Backdrops",
    client: "",
    image: Image19,
    imageNarrow: Image19Narrow,
    featured: false,
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
    image: Image7,
    featured: true,
  },
  {
    id: "020",
    title: "Danglers",
    service: "Danglers",
    client: "",
    image: Image20,
    imageNarrow: Image20Narrow,
    featured: false,
  },
  {
    id: "016",
    title: "Indoor Vinyl stickers Printing",
    service: "Vinyl Branding",
    client: "La Marquise – Stand at Gulf Food 2017",
    image: Image16,
    imageNarrow: Image16Narrow,
    featured: true,
  },
  {
    id: "017",
    title: "Indoor Vinyl stickers Printing",
    service: "Vinyl Branding",
    client: "ChtouraFoods – Stand at Gulf Food 2017",
    image: Image17,
    imageNarrow: Image17Narrow,
    featured: false,
  },
  {
    id: "021",
    title: "Floor Graphics",
    service: "Floor Graphics",
    client: "",
    image: Image21,
    imageNarrow: Image21Narrow,
    featured: false,
  },
  {
    id: "004",
    title: "Lampost",
    service: "Outdoor",
    client: "Primark",
    image: Image2,
    imageNarrow: Image2Narrow,
    featured: false,
  },
  {
    id: "006",
    title: "Digital Screen",
    service: "LED Installation and Project Management",
    client: "Papa Johns",
    image: Image10,
    featured: true,
  },
  {
    id: "022",
    title: "POS Materials",
    service: "POS Materials",
    client: "",
    image: Image22,
    imageNarrow: Image22Narrow,
    featured: false,
  },
  {
    id: "009",
    title: "RTA Taxi Wrap",
    service: "Vinyl Branding",
    client: "Dominos",
    image: Image5,
    imageNarrow: Image5Narrow,
    featured: false,
  },
  {
    id: "007",
    title: "Wall Banners",
    service: "Wall Signs",
    client: "Papa Johns",
    image: Image3,
    featured: false,
  },
  {
    id: "023",
    title: "Signage",
    service: "Signage",
    client: "",
    image: Image23,
    imageNarrow: Image23Narrow,
    featured: false,
  },
  {
    id: "008",
    title: "Flag Print",
    service: "Flags",
    client: "Emirates NBD",
    image: Image4,
    imageNarrow: Image4Narrow,
    featured: false,
  },
  {
    id: "010",
    title: "3D Hoarding",
    service: "3D",
    client: "Kraft",
    image: Image8,
    featured: false,
  },
  {
    id: "024",
    title: "Structural Design",
    service: "Structural Design",
    client: "",
    image: Image24,
    imageNarrow: Image24Narrow,
    featured: false,
  },
  // {
  //   id: "012",
  //   title: "Flex Printing",
  //   service: "Flex Banners",
  //   client: "Mercedes",
  //   image: Image11,
  //   imageNarrow: Image11Narrow,
  //   featured: false,
  // },
  {
    id: "013",
    title: "Rooftop Printing",
    service: "Outdoor",
    client: "CassiaT",
    image: Image12,
    imageNarrow: Image12Narrow,
    featured: false,
  },
  // {
  //   id: "014",
  //   title: "Static Hoarding",
  //   service: "Advertisement Boards",
  //   client: "Taraf",
  //   image: Image13,
  //   featured: false,
  // },
  // {
  //   id: "015",
  //   title: "Digital Screen",
  //   service: "LED Installation and Project Management",
  //   client: "Mercedes Benz",
  //   image: Image14,
  //   featured: false,
  // },
  {
    id: "018",
    title: "Chalet Branding",
    service: "Signage",
    client: "Jumeirah Golf Estates",
    image: Image18,
    imageNarrow: Image18Narrow,
    featured: false,
  },
];

export default worksData;
