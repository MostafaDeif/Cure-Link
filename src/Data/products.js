import medPanadol from "../assets/med3.jpg";
import medBodrex from "../assets/med3.jpg";
import medKonidin from "../assets/med3.jpg";
import medParacetamol from "../assets/med3.jpg";
import medOBH from "../assets/med3.jpg";
import medBetadine from "../assets/med3.jpg";
import medBodrexin from "../assets/med3.jpg";
import medAntangin from "../assets/med3.jpg";

export const productsBase = [
  {
    id: 1,
    name: "Panadol",
    details: "20pcs",
    price: 15.99,
    category: "Painkiller",
    imageUrl: medPanadol,
    isFav: true,
  },
  {
    id: 2,
    name: "Bodrex Herbal",
    details: "100ml",
    price: 7.99,
    category: "Cold & Flu",
    imageUrl: medBodrex,
    isFav: false,
  },
  {
    id: 3,
    name: "Konidin",
    details: "3pcs",
    price: 5.99,
    category: "Cold & Flu",
    imageUrl: medKonidin,
    isFav: true,
  },
  {
    id: 4,
    name: "Paracetamol",
    details: "50pcs",
    price: 12.5,
    category: "Painkiller",
    imageUrl: medParacetamol,
    isFav: false,
  },
  {
    id: 5,
    name: "OBH Combi",
    details: "75ml",
    price: 9.99,
    oldPrice: 10.99,
    category: "Cough",
    imageUrl: medOBH,
    isFav: true,
  },
  {
    id: 6,
    name: "Betadine",
    details: "50ml",
    price: 6.99,
    oldPrice: 8.99,
    category: "First Aid",
    imageUrl: medBetadine,
    isFav: false,
  },
  {
    id: 7,
    name: "Bodrexin",
    details: "75ml",
    price: 7.99,
    oldPrice: 9.99,
    category: "Cold & Flu",
    imageUrl: medBodrexin,
    isFav: true,
  },
  {
    id: 8,
    name: "Antangin JRG",
    details: "12pcs",
    price: 5.5,
    oldPrice: 6.5,
    category: "Herbal",
    imageUrl: medAntangin,
    isFav: false,
  },
];

export default productsBase;
