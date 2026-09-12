import menSuit2PieceImage from "../assets/dry-cleaning/men/suit-2-piece.png";
import menSuit3PieceImage from "../assets/dry-cleaning/men/suit-3-piece.png";
import menCoatJacketImage from "../assets/dry-cleaning/men/coat-jacket.jpg";
import menOvercoatImage from "../assets/dry-cleaning/men/over-coat.avif";
import menPantImage from "../assets/dry-cleaning/men/pant.png";
import menPantWhiteWoollenImage from "../assets/dry-cleaning/men/white-woollen-pant.png";
import menShirtImage from "../assets/dry-cleaning/men/shirt.png";
import menShirtSilkWoollenImage from "../assets/dry-cleaning/men/shirt-silk.png";
import menKurtaPyjamaImage from "../assets/dry-cleaning/men/kurta-pyjama.avif";
import menKurtaPyjamaSilkImage from "../assets/dry-cleaning/men/kurta-pyjama-silk.png";
import menNormalJacketImage from "../assets/dry-cleaning/men/normal-jacket.png";
import menFoamJacketImage from "../assets/dry-cleaning/men/foam-jacket.png";
import menLeatherJacketImage from "../assets/dry-cleaning/men/leather-jacket.png";

import menGownImage from "../assets/dry-cleaning/men/gown.png";
import menPulloverImage from "../assets/dry-cleaning/men/pullover.png";
import menHalfSweaterImage from "../assets/dry-cleaning/men/half-sweater.png";
import menTieImage from "../assets/dry-cleaning/men/tie.webp";
import menSherwaniImage from "../assets/dry-cleaning/men/sherwani.png";
import menTshirtImage from "../assets/dry-cleaning/men/tshirt.png";
import menShawlImage from "../assets/dry-cleaning/men/shawl.png";
import menPashminaShawlImage from "../assets/dry-cleaning/men/pashmina-shawl.png";



// WOMEN IMAGES

import womenAnarkaliImage from "../assets/dry-cleaning/women/anarkali.png";
import womenBlouseImage from "../assets/dry-cleaning/women/blouse.jpg";
import womenCardiganImage from "../assets/dry-cleaning/women/cardigan.avif";
import womenDressImage from "../assets/dry-cleaning/women/dress.webp";

import womenLehenga1PieceImage from "../assets/dry-cleaning/women/lehenga-1-piece.avif";
import womenLehenga2PieceImage from "../assets/dry-cleaning/women/lehenga-2-piece.png";
import womenLehenga3PieceImage from "../assets/dry-cleaning/women/lehenga-3-piece.webp";
import womenLehengaZariImage from "../assets/dry-cleaning/women/lehenga-zari.webp";

import womenLongCoatImage from "../assets/dry-cleaning/women/long-coat.avif";

import womenPashminaImage from "../assets/dry-cleaning/women/pashmina.png";

import womenSareeCottonImage from "../assets/dry-cleaning/women/saree-plain-cotton.png";
import womenSareeWoollenImage from "../assets/dry-cleaning/women/saree-woollen.png";
import womenSareeZariImage from "../assets/dry-cleaning/women/saree-zari.png";

import womenShirtWoollenImage from "../assets/dry-cleaning/women/shirt-woollen.png";
import womenShirtImage from "../assets/dry-cleaning/women/shirt.avif";

import womenSkirtImage from "../assets/dry-cleaning/women/skirt.jpg";

import womenSuit2PiecePlainImage from "../assets/dry-cleaning/women/suit-2-piece-plain.png";
import womenSuit2PieceZariImage from "../assets/dry-cleaning/women/suit-2-piece-zari.png";
import womenSuit3PieceZariImage from "../assets/dry-cleaning/women/suit-3-piece-zari.avif";
import womenSuit3PiecePlainImage from "../assets/dry-cleaning/women/suit-3-piece-plain.webp";
import womenTopPalazzoImage from "../assets/dry-cleaning/women/top-palazzo.avif";



// =========================
// HOUSEHOLD IMAGES
// =========================

import householdCurtainWithoutLiningImage from "../assets/dry-cleaning/household/curtain-without-lining.png";

import householdCurtainWithLiningImage from "../assets/dry-cleaning/household/curtain-with-lining.png";

import householdCurtainVelvetImage from "../assets/dry-cleaning/household/curtain-velvet.png";

import householdBlanketImage from "../assets/dry-cleaning/household/blanket.png";

import householdQuiltImage from "../assets/dry-cleaning/household/quilt.png";

import householdBedsheetImage from "../assets/dry-cleaning/household/bedsheet.jpg";

import householdBedCoverImage from "../assets/dry-cleaning/household/bed-cover.jpg";

import householdBabyStrollerImage from "../assets/dry-cleaning/household/baby-stroller.png";

import householdSoftToyImage from "../assets/dry-cleaning/household/teddy-bear.jpg";

import householdCarpetImage from "../assets/dry-cleaning/household/carpet.png";
const dryCleaningProducts = [
  {
    id: "men-suit-2-piece",
    category: "Men",
    name: "Gents Suit – 2 Piece",
    price: 350,
    unit: "per piece",

    shortDescription:
      "Professional cleaning and finishing for two-piece suits.",

    description:
      "Careful garment care helps maintain the fabric, structure, colour and sharp appearance of formal wear.",

    image: menSuit2PieceImage,
  },

  {
    id: "men-suit-3-piece",
    category: "Men",
    name: "Gents Suit – 3 Piece",
    price: 500,
    unit: "per piece",

    shortDescription:
      "Complete care for three-piece suits.",

    description:
      "Each garment is individually cleaned and finished to deliver a crisp, polished and coordinated appearance.",

    image: menSuit3PieceImage,
  },

  {
    id: "men-coat-jacket-velvet",
    category: "Men",
    name: "Coat / Jacket / Velvet / Hand-Embroidered",
    price: 300,
    unit: "per piece",

    shortDescription:
      "Specialised cleaning for premium and delicate outerwear.",

    description:
      "Careful handling is used for premium fabrics, velvet and hand-embroidered details to protect texture and workmanship.",

    image: menCoatJacketImage,
  },

  {
    id: "men-overcoat",
    category: "Men",
    name: "Overcoat",
    price: 400,
    unit: "per piece",

    shortDescription:
      "Thorough professional cleaning for overcoats.",

    description:
      "Attention is given to heavy fabrics, linings, collars and garment structure for a fresh and well-maintained finish.",

    image: menOvercoatImage,
  },

  {
    id: "men-pant",
    category: "Men",
    name: "Pant",
    price: 120,
    unit: "per piece",

    shortDescription:
      "Professional cleaning for trousers and pants.",

    description:
      "Everyday dirt and odour are removed while helping maintain the garment's fit, crease and neat finish.",

    image: menPantImage,
  },

  {
    id: "men-pant-white-woollen",
    category: "Men",
    name: "Pant – White / Woollen",
    price: 140,
    unit: "per piece",

    shortDescription:
      "Specialised care for white and woollen trousers.",

    description:
      "Fabric-appropriate treatment helps protect colour, texture and garment shape while delivering a clean finish.",

    image: menPantWhiteWoollenImage,
  },

  {
    id: "men-shirt",
    category: "Men",
    name: "Shirt",
    price: 120,
    unit: "per piece",

    shortDescription:
      "Reliable professional cleaning for everyday and formal shirts.",

    description:
      "The shirt is cleaned to remove everyday buildup and finished neatly for a fresh, ready-to-wear appearance.",

    image: menShirtImage,
  },

  {
    id: "men-shirt-silk-woollen",
    category: "Men",
    name: "Shirt – Silk / Woollen",
    price: 150,
    unit: "per piece",

    shortDescription:
      "Gentle, fabric-specific care for silk and woollen shirts.",

    description:
      "Special handling helps maintain softness, texture, colour and overall garment quality.",

    image: menShirtSilkWoollenImage,
  },

  {
    id: "men-kurta-pyjama",
    category: "Men",
    name: "Kurta Pyjama",
    price: 250,
    unit: "per set",

    shortDescription:
      "Complete cleaning and finishing for Kurta Pyjama sets.",

    description:
      "Both garments are professionally cleaned and neatly finished for a fresh, well-presented look.",

    image: menKurtaPyjamaImage,
  },

  {
    id: "men-kurta-pyjama-silk-work",
    category: "Men",
    name: "Kurta Pyjama – Silk / Work",
    price: 400,
    unit: "per set",

    shortDescription:
      "Specialised care for silk and embellished Kurta Pyjama sets.",

    description:
      "Delicate cleaning techniques are used to protect premium fabric and intricate work while refreshing the complete set.",

    image: menKurtaPyjamaSilkImage,
  },
    {
    id: "men-normal-jacket",
    category: "Men",
    name: "Normal Jacket",
    price: 200,
    unit: "per piece",

    shortDescription:
      "Professional cleaning for regular jackets.",

    description:
      "Care is taken to clean the garment while helping maintain its shape and overall finish.",

    image: menNormalJacketImage,
  },

  {
    id: "men-foam-jacket",
    category: "Men",
    name: "Jacket – Foam",
    price: 280,
    unit: "per piece",

    shortDescription:
      "Professional cleaning for foam-filled and padded jackets.",

    description:
      "Care is taken to clean the garment while helping maintain its shape, filling and overall finish.",

    image: menFoamJacketImage,
  },

  {
    id: "men-leather-jacket",
    category: "Men",
    name: "Jacket – Leather",
    price: 500,
    unit: "per piece",

    shortDescription:
      "Specialised professional care for leather jackets.",

    description:
      "The jacket is carefully cleaned and refreshed using suitable treatment to help preserve the material's appearance and texture.",

    image: menLeatherJacketImage,
  },

  {
    id: "men-gown",
    category: "Men",
    name: "Gown",
    price: 450,
    unit: "per piece",

    shortDescription:
      "Careful cleaning for formal and occasion gowns.",

    description:
      "Attention is given to fabric, structure, length and delicate details to maintain the garment's appearance.",

    image: menGownImage,
  },

  {
    id: "men-pullover",
    category: "Men",
    name: "Pullover",
    price: 180,
    unit: "per piece",

    shortDescription:
      "Gentle cleaning for pullovers and similar knitwear.",

    description:
      "Dust and odour are removed while helping maintain softness, shape and fabric quality.",

    image: menPulloverImage,
  },

  {
    id: "men-half-sweater",
    category: "Men",
    name: "Sweater – Half",
    price: 150,
    unit: "per piece",

    shortDescription:
      "Fabric-appropriate cleaning for half sweaters.",

    description:
      "Gentle care helps preserve softness, fit and texture while refreshing the garment.",

    image: menHalfSweaterImage,
  },

  {
    id: "men-tie",
    category: "Men",
    name: "Tie",
    price: 100,
    unit: "per piece",

    shortDescription:
      "Careful cleaning for ties and delicate accessories.",

    description:
      "The fabric is refreshed and stains are treated carefully while maintaining the tie's shape and appearance.",

    image:menTieImage,
  },

  {
    id: "men-sherwani",
    category: "Men",
    name: "Sherwani",
    price: 550,
    unit: "per piece",

    shortDescription:
      "Specialised garment care for premium Sherwanis.",

    description:
      "Delicate cleaning is provided for premium fabrics, embroidery, embellishments and structured designs.",

    image: menSherwaniImage,
  },

  {
    id: "men-tshirt",
    category: "Men",
    name: "T-Shirt",
    price: 120,
    unit: "per piece",

    shortDescription:
      "Professional cleaning for everyday T-shirts.",

    description:
      "Dirt and odour are removed while maintaining fabric softness and colour for a fresh finish.",

    image: menTshirtImage,
  },

  {
    id: "men-shawl",
    category: "Men",
    name: "Shawl",
    price: 250,
    unit: "per piece",

    shortDescription:
      "Gentle cleaning for shawls to maintain softness and texture.",

    description:
      "Fabric-appropriate care removes dust and everyday buildup while preserving the garment's appearance.",

    image: menShawlImage,
  },

  {
    id: "men-pashmina-shawl",
    category: "Men",
    name: "Shawl – Pashmina",
    price: 550,
    unit: "per piece",

    shortDescription:
      "Specialised care for delicate Pashmina shawls.",

    description:
      "Gentle cleaning methods are used to preserve natural softness and the luxurious texture of the fabric.",
    image : menPashminaShawlImage,
  },


    /* =========================================
     WOMEN
  ========================================= */

  {
    id: "women-suit-2-piece-plain",
    category: "Women",
    name: "Ladies Suit – 2 Piece (Plain)",
    price: 300,
    unit: "per set",

    shortDescription:
      "Professional cleaning for everyday and formal two-piece suits.",

    description:
      "Each piece is carefully treated to maintain fabric quality, colour, shape and finish, leaving the suit fresh, clean and professionally finished.",

    image: "/src/assets/dry-cleaning/women/suit-2-piece-plain.png",
  },

  {
    id: "women-suit-2-piece-zari",
    category: "Women",
    name: "Ladies Suit – 2 Piece (Zari)",
    price: 400,
    unit: "per set",

    shortDescription:
      "Specialised care for delicate zari-embroidered suits.",

    description:
      "Gentle cleaning techniques are used to help protect delicate threads, embroidery and embellishments while maintaining the fabric's appearance.",

    image: womenSuit2PieceZariImage,
  },

  {
    id: "women-suit-3-piece-plain",
    category: "Women",
    name: "Ladies Suit – 3 Piece (Plain)",
    price: 400,
    unit: "per set",

    shortDescription:
      "Complete cleaning and finishing for plain three-piece suits.",

    description:
      "All three pieces are individually cleaned and professionally finished to ensure a fresh, neat and ready-to-wear result.",

    image: womenSuit3PiecePlainImage,
  },

  {
    id: "women-suit-3-piece-zari",
    category: "Women",
    name: "Ladies Suit – 3 Piece (Zari)",
    price: 700,
    unit: "per set",

    shortDescription:
      "Delicate care for detailed three-piece zari suits.",

    description:
      "Extra attention is given to preserving embroidery, zari work, shine and fabric texture while providing a thorough professional clean.",

    image: womenSuit3PieceZariImage,
  },


  {
    id: "women-dress",
    category: "Women",
    name: "Ladies Dress",
    price: 300,
    unit: "per piece",

    shortDescription:
      "Expert cleaning for dresses of different fabrics.",

    description:
      "Garments are treated according to their fabric and construction, with careful stain treatment and professional finishing for a refreshed appearance.",

    image: womenDressImage,
  },

  {
    id: "women-skirt",
    category: "Women",
    name: "Ladies Skirt",
    price: 150,
    unit: "per piece",

    shortDescription:
      "Professional cleaning for skirts with fabric-appropriate care.",

    description:
      "The garment is cleaned and professionally finished while maintaining its fabric quality, structure and overall appearance.",

    image: womenSkirtImage,
  },

  


  {
    id: "women-saree-cotton",
    category: "Women",
    name: "Ladies Saree – Plain Cotton",
    price: 300,
    unit: "per piece",

    shortDescription:
      "Gentle cleaning designed specifically for everyday cotton sarees.",

    description:
      "The cleaning process helps keep the saree fresh and clean while preserving its natural texture, comfort and overall appearance.",

    image: womenSareeCottonImage,
  },





  {
    id: "women-saree-zari",
    category: "Women",
    name: "Ladies Saree – Zari/silk",
    price: 400,
    unit: "per piece",

    shortDescription:
      "Specialised care for delicate sarees with zari/silk detailing.",

    description:
      "Fabric-specific cleaning helps protect intricate borders, embroidery and zari detailing while maintaining the saree's richness.",

    image: womenSareeZariImage,
  },


  {
    id: "women-saree-woollen",
    category: "Women",
    name: "Ladies Saree – Woollen",
    price: 400,
    unit: "per piece",

    shortDescription:
      "Carefully cleaned to maintain the softness and texture of woollen sarees.",

    description:
      "Fabric-appropriate methods are used to remove dust and odour while helping preserve the saree's shape and natural feel.",

    image: womenSareeWoollenImage,
  },


  {
    id: "women-blouse",
    category: "Women",
    name: "Ladies Blouse",
    price: 100,
    unit: "per piece",

    shortDescription:
      "Professional cleaning and pressing for everyday and designer blouses.",

    description:
      "Special attention is given to delicate fabrics, embroidery, embellishments and structured designs for a clean and polished finish.",

    image: womenBlouseImage,
  },


  {
    id: "women-shirt",
    category: "Women",
    name: "Ladies Shirt",
    price: 120,
    unit: "per piece",

    shortDescription:
      "Thorough cleaning for fresh and neatly finished shirts.",

    description:
      "Everyday dirt and odour are removed while maintaining the shirt's fabric quality and delivering a clean, ready-to-wear finish.",

    image: womenShirtImage,
  },


  {
    id: "women-shirt-woollen",
    category: "Women",
    name: "Ladies Shirt – Woollen",
    price: 150,
    unit: "per piece",

    shortDescription:
      "Gentle fabric-specific cleaning for woollen shirts.",

    description:
      "The garment is handled carefully to help preserve softness, shape and natural texture while removing everyday buildup.",

    image: womenShirtWoollenImage,
  },




  {
    id: "women-pashmina-shawl",
    category: "Women",
    name: "Ladies Shawl – Pashmina",
    price: 550,
    unit: "per piece",

    shortDescription:
      "Specialised care for delicate Pashmina fabrics.",

    description:
      "Gentle cleaning methods are used to maintain softness, warmth and the luxurious feel of delicate fibres.",

    image: womenPashminaImage,
  },


 


  {
    id: "women-long-coat",
    category: "Women",
    name: "Ladies Long Coat/half coat",
    price: 200,
    unit: "per piece",

    shortDescription:
      "Professional cleaning for long coats with careful attention to structure.",

    description:
      "The outer fabric, lining, collars and overall construction are professionally cleaned and finished for a fresh, polished appearance.",

    image: womenLongCoatImage,
  },


  {
    id: "women-cardigan",
    category: "Women",
    name: "Ladies Cardigan",
    price: 200,
    unit: "per piece",

    shortDescription:
      "Gentle cleaning designed to preserve the softness and shape of cardigans.",

    description:
      "Dust, odour and everyday buildup are removed using fabric-appropriate care to help maintain the garment's fit and texture.",

    image: womenCardiganImage,
  },


  {
    id: "women-lehenga-choli-chunni",
    category: "Women",
    name: "Ladies Lehenga / Choli / Chunni – 3 Piece",
    price: 800,
    unit: "per set",

    shortDescription:
      "Complete specialised care for a three-piece lehenga set.",

    description:
      "Each garment is individually handled to protect delicate fabrics, embroidery, embellishments and intricate detailing.",

    image: womenLehenga3PieceImage,
  },


  {
    id: "women-lehenga-plain-1-piece",
    category: "Women",
    name: "Ladies Lehenga – 1 Piece Plain",
    price: 700,
    unit: "per piece",

    shortDescription:
      "Professional cleaning for plain lehengas.",

    description:
      "Careful fabric handling and finishing help maintain the lehenga's colour, fall, shape and overall appearance.",

    image: womenLehenga1PieceImage,
  },


  {
    id: "women-lehenga-plain-2-piece",
    category: "Women",
    name: "Ladies Lehenga – 2 Piece Plain",
    price: 1000,
    unit: "per set",

    shortDescription:
      "Complete cleaning for plain two-piece lehenga sets.",

    description:
      "Both garments receive consistent fabric-appropriate care and professional finishing for a clean, coordinated result.",

    image: womenLehenga2PieceImage,
  },


  {
    id: "women-lehenga-zari",
    category: "Women",
    name: "Ladies Lehenga – Zari",
    price: 1200,
    unit: "per piece",

    shortDescription:
      "Specialised cleaning for zari lehengas.",

    description:
      "Delicate handling helps protect intricate embroidery, metallic threads and fabric quality while refreshing the garment.",

    image: womenLehengaZariImage,
  },


 


  {
    id: "women-top/palazzo",
    category: "Women",
    name: "Ladies Top/Palazzo",
    price: 150,
    unit: "per piece",

    shortDescription:
      "Professional cleaning for everyday, formal and occasion palazzo wear.",

    description:
      "The garment is cleaned and finished to remove everyday dirt and odour while maintaining fabric quality and appearance.",

    image: womenTopPalazzoImage,
  },


  {
    id: "women-anarkali",
    category: "Women",
    name: "Ladies Anarkali/Anarkali-3-piece",
    price: 500,
    unit: "per piece",

    shortDescription:
      "Carefully tailored cleaning for Anarkali suits.",

    description:
      "Extra attention is given to delicate fabrics, embroidery, flare and garment structure for a fresh and professionally finished result.",

    image: womenAnarkaliImage,
  },



  // =========================
// HOUSEHOLD
// =========================

{
  id: "household-curtain-without-lining",
  category: "Household",
  name: "Curtain – Without Lining",
  price: 200,
  unit: "per panel",

  shortDescription:
    "Professional cleaning for unlined curtains.",

  description:
    "Careful cleaning helps remove dust and everyday buildup while refreshing the fabric and maintaining its appearance.",

  image: householdCurtainWithoutLiningImage,
},

{
  id: "household-curtain-synthetic-lining",
  category: "Household",
  name: "Curtain – With Synthetic Lining",
  price: 250,
  unit: "per panel",

  shortDescription:
    "Professional cleaning for curtains with synthetic lining.",

  description:
    "Both the curtain fabric and lining are carefully handled to provide a clean and refreshed finish.",

  image: householdCurtainWithLiningImage,
},

{
  id: "household-curtain-silk-velvet",
  category: "Household",
  name: "Curtain – Silk / Velvet",
  price: 300,
  unit: "per panel",

  shortDescription:
    "Specialised care for silk and velvet curtains.",

  description:
    "Delicate fabrics receive fabric-appropriate cleaning to help preserve their texture, softness and premium appearance.",

  image: householdCurtainVelvetImage,
},


// =========================
// BLANKETS
// =========================

{
  id: "household-blanket-small",
  category: "Household",
  name: "Blanket – Small",
  price: 300,
  unit: "per piece",

  shortDescription:
    "Professional cleaning for small blankets.",

  description:
    "The blanket is carefully cleaned and refreshed to remove dust, odour and everyday buildup while maintaining softness.",

  image: householdBlanketImage,
},

{
  id: "household-blanket-large",
  category: "Household",
  name: "Blanket – Large",
  price: 400,
  unit: "per piece",

  shortDescription:
    "Professional cleaning for large blankets.",

  description:
    "Thorough cleaning helps refresh large blankets while maintaining their softness, comfort and overall appearance.",

  image: householdBlanketImage,
},


// =========================
// QUILTS
// =========================

{
  id: "household-quilt-small",
  category: "Household",
  name: "Quilt – Small",
  price: 300,
  unit: "per piece",

  shortDescription:
    "Professional cleaning for small quilts.",

  description:
    "Careful cleaning helps refresh the quilt while maintaining its filling, comfort and overall condition.",

  image: householdQuiltImage,
},

{
  id: "household-quilt-large",
  category: "Household",
  name: "Quilt – Large",
  price: 400,
  unit: "per piece",

  shortDescription:
    "Professional cleaning for large quilts.",

  description:
    "Thorough fabric care helps refresh large quilts while maintaining their comfort, filling and appearance.",

  image: householdQuiltImage,
},


// =========================
// BEDSHEETS
// =========================

{
  id: "household-bedsheet-single",
  category: "Household",
  name: "Bedsheet – Single",
  price: 200,
  unit: "per piece",

  shortDescription:
    "Professional cleaning for single bedsheets.",

  description:
    "The bedsheet is carefully cleaned and refreshed for a clean, hygienic and fresh finish.",

  image: householdBedsheetImage,
},

{
  id: "household-bedsheet-double",
  category: "Household",
  name: "Bedsheet – Double",
  price: 300,
  unit: "per piece",

  shortDescription:
    "Professional cleaning for double bedsheets.",

  description:
    "Careful cleaning helps remove everyday buildup while providing a fresh and well-maintained finish.",

  image: householdBedsheetImage,
},


// =========================
// BED COVERS
// =========================

{
  id: "household-bed-cover-single",
  category: "Household",
  name: "Bed Cover – Single",
  price: 200,
  unit: "per piece",

  shortDescription:
    "Professional cleaning for single bed covers.",

  description:
    "Fabric-appropriate cleaning refreshes the bed cover while maintaining its texture and overall appearance.",

  image: householdBedCoverImage,
},

{
  id: "household-bed-cover-double",
  category: "Household",
  name: "Bed Cover – Double",
  price: 300,
  unit: "per piece",

  shortDescription:
    "Professional cleaning for double bed covers.",

  description:
    "Thorough cleaning helps maintain the appearance, freshness and quality of larger bed covers.",

  image: householdBedCoverImage,
},


// =========================
// BABY & SOFT TOYS
// =========================

{
  id: "household-baby-trolley",
  category: "Household",
  name: "Baby Trolley",
  price: 1000,
  unit: "per piece",

  shortDescription:
    "Professional deep cleaning for baby trolleys.",

  description:
    "Careful cleaning helps remove accumulated dust and everyday dirt from the trolley while refreshing its overall appearance.",

  image: householdBabyStrollerImage,
},

{
  id: "household-soft-toy-large",
  category: "Household",
  name: "Soft Toy – Large",
  price: 800,
  unit: "per piece",

  shortDescription:
    "Professional cleaning for large soft toys.",

  description:
    "Gentle cleaning helps refresh the soft toy while maintaining its softness, shape and overall appearance.",

  image: householdSoftToyImage,
},


// =========================
// CARPET
// =========================

{
  id: "household-carpet",
  category: "Household",
  name: "Carpet",
  price: 40,
  unit: "per sq. ft.",

  shortDescription:
    "Professional carpet cleaning with deep fabric care.",

  description:
    "Deep cleaning helps remove accumulated dust and everyday dirt while refreshing the carpet's texture and appearance.",

  image: householdCarpetImage,
},
  
];

export default dryCleaningProducts;