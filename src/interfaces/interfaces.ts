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

export interface IDataDetails {
  hero: IHero[];
  products: [];
  nav: string[];
  sections: Partial<ISection>;
  dealer: Partial<IDealer>;
  buttons: Partial<IButtons>;
  numbers: Partial<INumbers>;
  form: Partial<IFrom>;
  footer:Partial<IFooter>;
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
  hero = 'hero',
  products = 'products',
}
