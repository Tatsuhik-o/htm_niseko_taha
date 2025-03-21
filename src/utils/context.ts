import { createContext } from "react";
import { TContext } from "./types";

export const mobileContext = createContext<TContext | null>(null);
