import bedsheetSingleImage from "../assets/steam-press/household-pressing/bedsheet-single-bed.png";
import bedsheetDoubleImage from "../assets/steam-press/household-pressing/bedsheet-double-bed.png";
import pillowCoverImage from "../assets/steam-press/household-pressing/pillow-cover.png";
import curtainsPerPanelImage from "../assets/steam-press/household-pressing/curtains-per-panel.png";

import menShirtImage from "../assets/steam-press/men-pressing/men-shirt.png";
import menTshirtImage from "../assets/steam-press/men-pressing/men-tshirt.png";
import trouserImage from "../assets/steam-press/men-pressing/trouser.png";
import jeansImage from "../assets/steam-press/men-pressing/jeans.png";
import kurtaPyjamaImage from "../assets/steam-press/men-pressing/kurta-pyjama.png";
import suit2PieceImage from "../assets/steam-press/men-pressing/suit-2-piece.png";
import suit3PieceImage from "../assets/steam-press/men-pressing/suit-3-piece.png";
import blazerImage from "../assets/steam-press/men-pressing/blazer.png";
import sherwaniImage from "../assets/steam-press/men-pressing/sherwani.png";

import sareePlainImage from "../assets/steam-press/women-pressing/saree-plain.png";
import sareeZariImage from "../assets/steam-press/women-pressing/saree-zari.png";
import blouseImage from "../assets/steam-press/women-pressing/blouse.png";
import salwarKurtiImage from "../assets/steam-press/women-pressing/salwar-kurti.png";
import dupattaImage from "../assets/steam-press/women-pressing/duppatta.png";
import lehengaGhagraImage from "../assets/steam-press/women-pressing/lehenga-ghaghra.png";
import westernDressImage from "../assets/steam-press/women-pressing/western-dressess.png";

import bootsHighAnkleImage from "../assets/shoe-cleaning/boots-high-ankle.png";
import canvasEverydaySneakersImage from "../assets/shoe-cleaning/canvas-everyday-sneakers.png";
import designerHandbagBackpackImage from "../assets/shoe-cleaning/designer-handbag-backpack.png";
import leatherFormalsImage from "../assets/shoe-cleaning/leather-formals.png";
import luxuryDesignerSneakersImage from "../assets/shoe-cleaning/luxury-designer-sneakers.png";
import sportsMeshShoesImage from "../assets/shoe-cleaning/sports-mesh-shoes.png";
import suedeNubuckImage from "../assets/shoe-cleaning/suede-nubuck.png";

export const steamPressProducts = [
  // MEN
  {
    id: "sp-men-shirt",
    category: "Men",
    name: "Men's Shirt",
    price: 49,
    unit: "per piece",
    shortDescription: "Crisp collar, cuff and placket steam finish.",
    turnaround: "24 Hours",
    image: menShirtImage,
  },
  {
    id: "sp-men-tshirt",
    category: "Men",
    name: "T-Shirt / Polo",
    price: 39,
    unit: "per piece",
    shortDescription: "Gentle wrinkle removal without fabric stretching.",
    turnaround: "24 Hours",
    image: menTshirtImage,
  },
  {
    id: "sp-men-trouser",
    category: "Men",
    name: "Trousers / Chinos",
    price: 49,
    unit: "per piece",
    shortDescription: "Razor-sharp crease alignment and leg shaping.",
    turnaround: "24 Hours",
    image: trouserImage,
  },
  {
    id: "sp-men-jeans",
    category: "Men",
    name: "Jeans / Denim",
    price: 49,
    unit: "per piece",
    shortDescription: "Crease-free steam pressing on heavy denim.",
    turnaround: "24 Hours",
    image: jeansImage,
  },
  {
    id: "sp-men-kurta",
    category: "Men",
    name: "Kurta / Pyjama",
    price: 59,
    unit: "per piece",
    shortDescription: "Even steam flow for ethnic cottons and silks.",
    turnaround: "24 Hours",
    image: kurtaPyjamaImage,
  },
  {
    id: "sp-men-suit-2pc",
    category: "Men",
    name: "Gents Suit – 2 Piece",
    price: 149,
    unit: "per set",
    shortDescription: "Tailored lapel shaping, sleeve roll and trouser press.",
    turnaround: "24 Hours",
    image: suit2PieceImage,
  },
  {
    id: "sp-men-suit-3pc",
    category: "Men",
    name: "Gents Suit – 3 Piece",
    price: 199,
    unit: "per set",
    shortDescription: "Full jacket, waistcoat and trouser steam refinement.",
    turnaround: "24 Hours",
    image: suit3PieceImage,
  },
  {
    id: "sp-men-blazer",
    category: "Men",
    name: "Blazer / Sports Jacket",
    price: 99,
    unit: "per piece",
    shortDescription: "Shoulder contour and chest roll steam press.",
    turnaround: "24 Hours",
    image: blazerImage,
  },
  {
    id: "sp-men-sherwani",
    category: "Men",
    name: "Sherwani / Indo-Western",
    price: 199,
    unit: "per piece",
    shortDescription: "Delicate steam float for embellished festive wear.",
    turnaround: "24-48 Hours",
    image: sherwaniImage,
  },

  // WOMEN
  {
    id: "sp-women-saree-cotton",
    category: "Women",
    name: "Saree (Cotton / Linen)",
    price: 99,
    unit: "per piece",
    shortDescription: "Full-length uniform press with sharp border folds.",
    turnaround: "24 Hours",
    image: sareePlainImage,
  },
  {
    id: "sp-women-saree-silk",
    category: "Women",
    name: "Saree (Silk / Heavy / Zari)",
    price: 149,
    unit: "per piece",
    shortDescription: "Low-heat steam roll protecting delicate zari & silk fibers.",
    turnaround: "24 Hours",
    image: sareeZariImage,
  },
  {
    id: "sp-women-blouse",
    category: "Women",
    name: "Blouse (Plain / Designer)",
    price: 39,
    unit: "per piece",
    shortDescription: "Structured press for padded cups and designer sleeves.",
    turnaround: "24 Hours",
    image: blouseImage,
  },
  {
    id: "sp-women-kurti",
    category: "Women",
    name: "Salwar / Kurti / Tunic",
    price: 59,
    unit: "per piece",
    shortDescription: "Graceful drape finish for everyday and party kurtis.",
    turnaround: "24 Hours",
    image: salwarKurtiImage,
  },
  {
    id: "sp-women-dupatta",
    category: "Women",
    name: "Dupatta / Stole",
    price: 39,
    unit: "per piece",
    shortDescription: "Gentle wrinkle release on fine chiffon, georgette & net.",
    turnaround: "24 Hours",
    image: dupattaImage,
  },
  {
    id: "sp-women-lehenga",
    category: "Women",
    name: "Lehenga / Ghagra Flare",
    price: 199,
    unit: "per piece",
    shortDescription: "Multi-layer flare and can-can delicate steam reshaping.",
    turnaround: "24-48 Hours",
    image: lehengaGhagraImage,
  },
  {
    id: "sp-women-dress",
    category: "Women",
    name: "Western Dress / Gown",
    price: 149,
    unit: "per piece",
    shortDescription: "Crease-free steam finish on flowing silhouettes.",
    turnaround: "24 Hours",
    image: westernDressImage,
  },

  // HOUSEHOLD
  {
    id: "sp-hh-bedsheet-single",
    category: "Household",
    name: "Bedsheet (Single)",
    price: 59,
    unit: "per piece",
    shortDescription: "Flat roller steam pressing for crisp bedding.",
    turnaround: "24 Hours",
    image: bedsheetSingleImage,
  },
  {
    id: "sp-hh-bedsheet-double",
    category: "Household",
    name: "Bedsheet (Double / King)",
    price: 89,
    unit: "per piece",
    shortDescription: "Hotel-grade smooth surface steam finish.",
    turnaround: "24 Hours",
    image: bedsheetDoubleImage,
  },
  {
    id: "sp-hh-pillow-cover",
    category: "Household",
    name: "Pillow Cover (Pair)",
    price: 39,
    unit: "per pair",
    shortDescription: "Even square finish with zero fabric gloss.",
    turnaround: "24 Hours",
    image: pillowCoverImage,
  },
  {
    id: "sp-hh-curtain",
    category: "Household",
    name: "Curtain (per panel)",
    price: 99,
    unit: "per panel",
    shortDescription: "Uniform vertical steam hanging press.",
    turnaround: "24-48 Hours",
    image: curtainsPerPanelImage,
  },
];

export const shoeCareProducts = [
  {
    id: "sc-canvas",
    name: "Canvas & Everyday Sneakers",
    price: 399,
    unit: "per pair",
    shortDescription: "Upper scrubbing, mid-sole brightening, lace wash & odor neutralization.",
    turnaround: "3-4 Days",
    image: canvasEverydaySneakersImage,
  },
  {
    id: "sc-sports",
    name: "Sports & Mesh Running Shoes",
    price: 449,
    unit: "per pair",
    shortDescription: "Deep mesh dirt extraction, antibacterial foam wash and sole de-yellowing.",
    turnaround: "3-4 Days",
    image: sportsMeshShoesImage,
  },
  {
    id: "sc-leather",
    name: "Leather Formals & Loafers",
    price: 499,
    unit: "per pair",
    shortDescription: "Gentle surface cleansing, rich cream nourishment and mirror buff polish.",
    turnaround: "3-5 Days",
    image: leatherFormalsImage,
  },
  {
    id: "sc-suede",
    name: "Suede & Nubuck Footwear",
    price: 599,
    unit: "per pair",
    shortDescription: "Specialised waterless nap cleaning, brass bristle resetting and protective spray.",
    turnaround: "4-5 Days",
    image: suedeNubuckImage,
  },
  {
    id: "sc-designer",
    name: "Luxury & Designer Sneakers",
    price: 799,
    unit: "per pair",
    shortDescription: "Bespoke handcrafted cleaning for luxury brands (Balenciaga, Gucci, Nike Jordans).",
    turnaround: "4-5 Days",
    image: luxuryDesignerSneakersImage,
  },
  {
    id: "sc-boots",
    name: "Boots & High-Ankle Footwear",
    price: 549,
    unit: "per pair",
    shortDescription: "Heavy-duty cleaning, shaft conditioning, welt care and waterproof barrier.",
    turnaround: "4-5 Days",
    image: bootsHighAnkleImage,
  },
  {
    id: "sc-bag",
    name: "Designer Handbag & Backpack Care",
    price: 599,
    unit: "starting from",
    shortDescription: "Interior lining vacuum, exterior leather/canvas treatment and hardware polish.",
    turnaround: "4-6 Days",
    image: designerHandbagBackpackImage,
  },
];
