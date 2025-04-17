export {};

declare global {
  interface Window {
    LeatherProvider: any; // You can replace `any` with the actual type if you know it
  }
}

declare global {
  interface Window {
    unisat: any;
  }
}