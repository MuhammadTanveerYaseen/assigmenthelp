declare module 'next' {
  export * from 'next/types';
}

declare module 'next/font/google' {
  export interface FontOptions {
    subsets?: string[];
    variable?: string;
    weight?: string | string[];
    style?: string | string[];
    display?: string;
  }

  export function Geist(options?: FontOptions): {
    className: string;
    variable: string;
    style: { fontFamily: string };
  };

  export function Geist_Mono(options?: FontOptions): {
    className: string;
    variable: string;
    style: { fontFamily: string };
  };
} 