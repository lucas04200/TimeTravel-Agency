import parisImg from './images/paris.jpg';
import florenceImg from './images/florence.jpg';
import cretaceImg from './images/cretace.jpg';

export const destinations = [
  {
    id: 1,
    title: "Paris - Belle Époque",
    year: "1889",
    description: "Vivez l'inauguration de la Tour Eiffel et l'effervescence de l'Exposition Universelle.",
    image: parisImg,
    price: "2,500€",
    tags: ["Culture", "Histoire", "Romantisme"]
  },
  {
    id: 2,
    title: "Florence - Renaissance",
    year: "1504",
    description: "Rencontrez Michel-Ange et Léonard de Vinci au cœur du berceau de l'art italien.",
    image: florenceImg,
    price: "3,200€",
    tags: ["Art", "Architecture", "Politique"]
  },
  {
    id: 3,
    title: "Crétacé Supérieur",
    year: "-65M",
    description: "Une aventure sauvage au milieu des géants. Observez les Tricératops dans leur habitat naturel.",
    image: cretaceImg,
    price: "4,500€",
    tags: ["Nature", "Aventure", "Dinosaures"]
  }
];