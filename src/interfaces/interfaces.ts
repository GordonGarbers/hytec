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

export interface IFooter {
  imprint: string;
  privacyPolicy: string;
  termsAndConditions: string;
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
}
export interface IProducts {
  id: number;
  categorie: string;
  name: string;
  price: string;
  extras: string[];
  description: string;
  accessories: string[];
  specifications: string[];
  filter: Partial<IFilter>;
  basePath: string;
  productNamePath: string;
  heroImage: string;
  carouselImages: string[];
  video: string;
}

export interface IDataDetails {
  hero: IHero[];
  products: IProducts[];
  nav: string[];
  sections: Partial<ISection>;
  dealer: Partial<IDealer>;
  buttons: Partial<IButtons>;
  numbers: Partial<INumbers>;
  form: Partial<IFrom>;
  footer: Partial<IFooter>;
}

export interface ICategory {
  category: string;
  categoryLabel: string;
  count: number;
}

export interface IPriceRange {
  min: number,
  max: number
}

