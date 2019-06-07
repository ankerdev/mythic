enum Encodings {
  ASCII = 'ascii',
  BASE_64 = 'base64',
}

export const btoa = (text: string): string => Buffer.from(text).toString(Encodings.BASE_64);

export const atob = (text: string): string => Buffer.from(text, Encodings.BASE_64).toString(Encodings.ASCII);
