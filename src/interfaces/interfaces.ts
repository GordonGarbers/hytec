export interface ElementBoundingBox {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

export interface INavigationButton {
  activeBtnValue: number;
  activeBtnName?: string;
}

export interface ILogoVariants {
  initial: {
    pathLength: number;
  };
  animate: {
    pathLength: number;
    transition: {
      duration: number;
      ease: string;
      repeatDelay: number;
    };
  };
}

interface ITextCommon {
  smallTitle: string;
  titleNormalBefore: string;
  titleAccent: string;
  titleNormalAfter: string;
  text: string;
}

export interface IHero extends ITextCommon {
  id: number;
  image: string;
}

export interface IDealer extends ITextCommon {}

export interface ISection {
  machinery: string;
  aboutus: string;
  contact: string;
}

export interface IButtons {
  contact: string;
  apply: string;
  send: string;
}

export interface INumbers {
  founded: string;
  sold: string;
  dealers: string;
}

export interface IFrom {
  name: string;
  email: string;
  subject: string;
  text: string;
}

export interface IText {
  aboutus: string;
}

export interface IFooter {
  imprint: string;
  privacyPolicy: string;
  termsAndConditions: string;
}


export interface IFilterCategories {
  vehicleType: string;
  categories: string;
  price: string;
  displacement: string;
  weight: string;
  [key: string]: string;
}

export interface IResponseGenerator {
  config?: string;
  data: IDataDetails;
  headers?: string;
  request?: string;
  status?: string;
  statusText?: string;
}

export enum ESection {
  hero = "hero",
  // products = "products",
}

export interface IFilter {
  categorie: string;
  fuelType: string;
  kw: number;
  ps: number;
  displacement: number;
  fuelTankCapacity: number;
  speed: number;
  weight: number;
  liftingCapacity: number;
  liftingHeight: number;
  totalLength: number;
  totalWidth: number;
  totalHeight: number;
  wheelbase: number;
  price: number;
  vehicleType: string;
}

export enum EUseRangeSections {
  categorie = "categorie",
  fuelType = "fuelType",
  kw = "kw",
  ps = "ps",
  displacement = "displacement",
  fuelTankCapacity = "fuelTankCapacity",
  speed = "speed",
  weight = "weight",
  liftingCapacity = "liftingCapacity",
  liftingHeight = "liftingHeight",
  totalLength = "totalLength",
  totalWidth = "totalWidth",
  totalHeight = "totalHeight",
  wheelbase = "wheelbase",
  price = "price",
  vehicleType = "vehicleType",
}
export interface IProducts {
  id: number;
  categorie: string;
  name: string;
  price: string;
  vehicleType: string;
  extras: string[];
  description: string;
  accessories: string[];
  specifications: string[];
  filter: IFilter;
  basePath: string;
  productNamePath: string;
  heroImage: string;
  carouselImages: string[];
  video: string;
}

export interface INav {
  id: number;
  displayName: string;
  idName: string;
}

export interface IRest {
  details: string;
  viewMore: string;
  followUsOn: string;
  showMore: string;
  showLess: string;
  vat: string;
  freeExtras: string;
  accessories: string;
  specifications: string;
  relatedProducts: string;
  warningNoProducts: string;
  resultsFound: string;
  home: string;
  sparePartsTitle: string;
  transportTitle: string;
  spareParts: string;
  transport: string;
}

export interface IDataDetails {
  hero: IHero[];
  products: IProducts[];
  nav: INav[];
  sections: Partial<ISection>;
  dealer: Partial<IDealer>;
  buttons: Partial<IButtons>;
  numbers: Partial<INumbers>;
  form: Partial<IFrom>;
  footer: Partial<IFooter>;
  imprint: string[],
  termsAndConditions: string[],
  filterCategories: Partial<IFilterCategories>;
  rest: Partial<IRest>;
  text: Partial<IText>;
}

export interface ICategory {
  category: string;
  categoryLabel: string;
  count: number;
}

export interface IRange {
  min: number;
  max: number;
}
