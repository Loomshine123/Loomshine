import washFoldImage from "../assets/wash-fold.avif";
import washIronImage from "../assets/wash-iron.jpg";
import steamPressImage from "../assets/steam-press.avif";
import shoeCleaningImage from "../assets/shoe-cleaning.webp";
import dryCleaningImage from "../assets/dry-cleaning.webp";

const services = [
  {
    id: "01",
    slug: "wash-fold",
    name: "WASH & FOLD",
    price: "₹79",
    unit: "PER KG",

    shortDescription:
      "Fresh, hygienically cleaned clothes, carefully folded and ready to wear—making everyday laundry completely effortless.",

    details:
      "Take laundry off your to-do list with LOOMSHINE's professional Wash & Fold service. From everyday wear and home clothing to regular garments, each item is carefully sorted, washed using high-quality detergents, and cleaned according to its fabric requirements. Once cleaned and dried, every garment is neatly folded and prepared for easy storage and use.",

    features: [
      "COLOUR-SORTED WASHING",
      "FABRIC-SAFE DETERGENTS",
      "NEATLY FOLDED & PACKED",
    ],

    image: washFoldImage,
  },

  {
    id: "02",
    slug: "wash-iron",
    name: "WASH & IRON",
    price: "₹109",
    unit: "PER KG",

    shortDescription:
      "Expert washing and crisp ironing for perfectly clean, fresh, and wrinkle-free clothes delivered right to your doorstep.",

    details:
      "LOOMSHINE's Wash & Iron service gives your everyday garments complete professional care. Each item is carefully cleaned to remove dirt, sweat, and everyday odours before being professionally ironed for a smooth, crisp, and polished finish. Garments are handled according to their fabric type to ensure appropriate washing and ironing care.",

    features: [
      "FABRIC-SPECIFIC CARE",
      "PROFESSIONAL IRONING",
      "READY TO WEAR",
    ],

    image: washIronImage,
  },

  {
    id: "03",
    slug: "steam-press",
    name: "STEAM PRESS",
    price: "₹49",
    unit: "PER GARMENT",

    shortDescription:
      "Professional steam pressing that gives your garments a crisp, polished, and refined finish.",

    details:
      "Our Steam Press service is designed to give garments a smooth and professionally finished appearance. Each item is carefully pressed according to its fabric and structure, making it suitable for shirts, trousers, suits, sarees, blazers, lehengas and other delicate garments.",

    features: [
      "PROFESSIONAL STEAM FINISH",
      "DELICATE FABRIC CARE",
      "CRISP & POLISHED LOOK",
    ],

    image: steamPressImage,
  },

  {
    id: "04",
    slug: "shoe-cleaning",
    name: "SHOE CLEANING",
    price: "₹399",
    unit: "PER PAIR",

    shortDescription:
      "Deep cleaning and professional care for everyday sneakers, premium footwear and more.",

    details:
      "From everyday shoes to premium footwear, LOOMSHINE provides specialised cleaning based on the material and condition of each pair. Our process helps remove accumulated dirt, dust, surface stains and everyday odours while refreshing the overall appearance of your footwear.",

    features: [
      "MATERIAL-SPECIFIC PROCESS",
      "DEEP CLEANING",
      "REFRESHED FINISH",
    ],

    image: shoeCleaningImage,
  },

  {
    id: "05",
    slug: "dry-cleaning",
    name: "DRY CLEANING",
    price: "₹—",
    unit: "AS PER GARMENT",

    shortDescription:
      "Premium care for delicate fabrics, formal wear, couture and garments that require specialised cleaning.",

    details:
      "LOOMSHINE's Dry Cleaning service provides specialised care for delicate fabrics, structured clothing, premium garments and outfits with intricate detailing. Suitable for suits, silk sarees, lehengas, gowns, designer wear and other garments that require professional handling.",

    features: [
      "SPECIALISED FABRIC CARE",
      "DELICATE GARMENT HANDLING",
      "PROFESSIONAL FINISHING",
    ],

    image: dryCleaningImage,
  },
];

export default services;