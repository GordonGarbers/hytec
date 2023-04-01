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

export interface IHero {
  id: number;
  smallTitle: string;
  titleNormalBefore: string;
  titleAccent: string;
  titleNormalAfter: string;
  text: string;
  image: string;
}

export interface IDataDetails {
  hero: IHero[];
  products: [];
  nav: string[];
  sections: {
    contact: string
  };
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
  products = "products",
}
