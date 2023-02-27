type UserType = {
  name: string;
  email: string;
  password: string;
  citizenshipNumber: string;
  admin: boolean;
  verified: boolean;
};

const users: UserType[] = [
  {
    name: "G Kibria Jani",
    citizenshipNumber: "9860777906",
    email: "gkibriajani@gmail.com",
    password: "$2b$10$US6eV7PdlWfPrUbFceAPZeUvRBMYIea/SfbMhMaULSKUTIQrsn0Hy",
    admin: true,
    verified: true,
  },
];

export default users;
