export const isEmail: (email: string) => boolean = (email) =>
  /^\S+@\S+\.\S+$/.test(email);