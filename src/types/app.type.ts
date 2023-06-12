import { ReactNode } from "react";

export interface ISelectOption<T = any> {
  value: T;
  label: string;
  icon?: ReactNode | string;
}

export type ISelectedOptionValue = ISelectOption<string>["value"];
