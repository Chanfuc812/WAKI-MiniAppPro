export type CategoryId =
  | "vphong"
  | "pkhach"
  | "pngu"
  | "pthuy"
  | "sdau"
  | "tphap"
  | "ctranh"
    "khac";

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
}
