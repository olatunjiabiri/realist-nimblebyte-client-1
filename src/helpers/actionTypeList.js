const type = [
  {
    _id: 8,
    name: "All Types",
    value: "",
    selected: true,
  },
  {
    _id: 0,
    name: "House",
    value: "House",
    selected: false,
  },
  {
    _id: 1,
    name: "Land",
    value: "Land",
    selected: false,
  },
  // {
  //   _id: 2,
  //   name: "Shortlet",
  //   value: "Shortlet",
  //   selected: false,
  // },
  {
    _id: 2,
    name: "Commercial",
    value: "Commercial",
    selected: false,
  },
  {
    _id: 3,
    name: "Industrial",
    value: "Industrial",
    selected: false,
  },
];

const action = [
  {
    _id: 10,
    name: "All Types",
    value: "",
    selected: true,
    disabled: true,
  },
  {
    _id: 0,
    name: "Buy",
    value: "Buy",
    selected: false,
    disabled: false,
  },
  {
    _id: 1,
    name: "Rent",
    value: "Rent",
    selected: false,
    disabled: false,
  },
];

const agentSpecialty = [
  {
    _id: 0,
    name: "Any",
    value: "",
  },
  {
    _id: 1,
    name: "Buyer Agent",
    value: "Buyer Agent",
  },
  {
    _id: 2,
    name: "Listing Agent",
    value: "Listing Agent",
  },
];

export { type, action, agentSpecialty };
