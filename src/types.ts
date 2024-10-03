export interface Price {
  old_price: number | null;
  current_price: number;
}

export interface Item {
  id: string;
  name: string;
  code: string | null;
  price: Price;
  image: {
    url: string;
  };
  material: number;
}

export interface Material {
  id: number;
  name: string;
}

export interface BreadCrumb {
  text: string;
  link?: string;
}
