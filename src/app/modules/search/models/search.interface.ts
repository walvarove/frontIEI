import { logging } from "protractor";

export interface City{
  id: number;
  name: string;
  slug: string;
  provinces: Provinces
}

export type Cities = City[];

export interface Province{
  id: number;
  name: string;
  code: string;
  localities: Localities
}

export type Provinces = Province[]

export interface Locality{
  id: number;
  name: string;
  code: string;
}

export type Localities = Locality[];

export interface SearchInput{
  locality: string;
  province: string;

}

export interface Library{
  id: number;
  name: string;
  type: string;
  address: string;
  postal_code: string;
  longitude: string;
  latitude: string;
  email: string;
  phone_number: string;
  description: string;
}

export type Libraries = Library[];

export const LIBRARY_TYPES = ["PR", "PU"];

