export const MAXIMUM_CONTAINER_WIDTH = 1400;
export const navButtons = ['Home', 'Machinery', 'About us', 'Contact'];
export enum ELinks {
  heroLink = 'json/hero.json',
}
export const MAP_CENTER_LOC = {
  lat: 53.33207271382929,
  lng: 10.225477076131025,
};

export type logoPosType = { x: number; y: number };

export const logoPos: logoPosType[] = [
  { x: 19, y: 40 },
  { x: 33, y: 70 },
  { x: 40, y: 37 },
  { x: 53, y: 46 },
  { x: 55, y: 8 },
  { x: 78, y: 62 },
  { x: 81, y: 25 },
  { x: 88, y: 47 },
];

export const languageButtons = ['en', 'de'];

export const TIME = 8000;

export enum EColors {
  primary = '#f7d100',
  primaryMono = '#FFDE2B',
  dark = '#26272e',
  darkForm = '#2d2e36',
  darkLight = '#373943',
  skeletonBaseColorDefault = '#ebebeb',
}

export enum ECategories {
  price = 'price',
  displacement = 'displacement',
  weight = 'weight',
  fuelTank = 'fuel tank',
}

export const enum EProductSections {
  specifications = 'specifications',
  accessories = 'accessories',
}

export enum ESizes {
  xs = 479,
  sm = 620,
  md = 789,
  lg = 960,
  xl = 1149,
  xxl = 1400,
}

export const transitionSpeed = .5;
