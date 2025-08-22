// import images from './images';

const soupsAndStews = [
  { 
    title: 'Stewed assorted meats', 
    price: "$160 - $320", 
    tag: "soups | stews | traditional" 
  },
  { 
    title: 'Stewed goat/assorted', 
    price: "$160 - $350", 
    tag: "soups | stews | goat | traditional" 
  },
  { 
    title: 'Stewed turkey', 
    price: "$120 - $240", 
    tag: "soups | stews | turkey | traditional" 
  },
  { 
    title: 'Stewed gizzard', 
    price: "$100 - $200", 
    tag: "soups | stews | gizzard | traditional" 
  },
  { 
    title: 'Stewed snails', 
    price: "$150 - $350", 
    tag: "soups | stews | snails | traditional" 
  },
  { 
    title: 'Stewed fish', 
    price: "$130 - $360", 
    tag: "soups | stews | fish | traditional" 
  },
  { 
    title: 'Ayamase', 
    price: "$130 - $260", 
    tag: "soups | stews | spicy | traditional" 
  },
  { 
    title: 'Ohah soup/Achi soup', 
    price: "$130 - $300", 
    tag: "soups | traditional" 
  },
  { 
    title: 'Banga soup', 
    price: "$90 - $260", 
    tag: "soups | traditional | palm nut" 
  },
  { 
    title: 'Ogbono soup', 
    price: "$100 - $280", 
    tag: "soups | traditional" 
  },
  { 
    title: 'Okro soup', 
    price: "$100 - $280", 
    tag: "soups | traditional | okra" 
  },
  { 
    title: 'Afang soup', 
    price: "$130 - $300", 
    tag: "soups | traditional | leafy" 
  },
  { 
    title: 'Cameroon Eru', 
    price: "$150 - $350", 
    tag: "soups | traditional | leafy" 
  },
  { 
    title: 'Mpu-fish', 
    price: "$120 - $250", 
    tag: "soups | fish | traditional" 
  },
  { 
    title: 'Egussi soup', 
    price: "$150 - $300", 
    tag: "soups | traditional | melon seeds" 
  },
  { 
    title: 'Okongobong/egussi', 
    price: "$150 - $300", 
    tag: "soups | traditional | leafy" 
  },
  { 
    title: 'Ndole', 
    price: "$150 - $300", 
    tag: "soups | traditional | leafy" 
  },
  { 
    title: 'Fisher man soup/native soup', 
    price: "$150 - $300", 
    tag: "soups | fish | traditional" 
  },
  { 
    title: 'Mbongo-choppi', 
    price: "$120 - $300", 
    tag: "soups | traditional" 
  },
  { 
    title: 'Eforiro', 
    price: "$130 - $280", 
    tag: "soups | traditional | leafy" 
  },
  { 
    title: 'Spinach sotte', 
    price: "$120 - $280", 
    tag: "soups | traditional | spinach" 
  },
  { 
    title: 'Cabbage-spinach-Egussi', 
    price: "$120 - $280", 
    tag: "soups | traditional | spinach" 
  }
];

const smallChopsSnacksAppetizers = [
  { 
    title: 'Plantain chips', 
    price: "$50", 
    tag: "snacks | appetizers | plantain" 
  },
  { 
    title: 'Meat pie', 
    price: "$3.50", 
    tag: "snacks | appetizers | meat pie" 
  },
  { 
    title: 'Puff puff tray', 
    price: "$65 - $130", 
    tag: "snacks | appetizers | puff puff" 
  },
  { 
    title: 'Full chicken suya', 
    price: "$40", 
    tag: "snacks | appetizers | suya | chicken" 
  },
  { 
    title: 'Beef kebab', 
    price: "$5", 
    tag: "snacks | appetizers | beef kebab" 
  },
  { 
    title: 'Chicken pie', 
    price: "$3.50", 
    tag: "snacks | appetizers | chicken pie" 
  },
  { 
    title: 'Scotch Eggs', 
    price: "$3.75", 
    tag: "snacks | appetizers | scotch eggs" 
  },
  { 
    title: 'Samosa/spring rolls', 
    price: "$2.50", 
    tag: "snacks | appetizers | samosa | spring rolls" 
  },
  { 
    title: 'Fishroll tray', 
    price: "$100 - $200", 
    tag: "snacks | appetizers | fish" 
  },
  { 
    title: 'Chin-chin', 
    price: "$80 - $160", 
    tag: "snacks | appetizers | chin-chin" 
  },
  { 
    title: 'Sandwich', 
    price: "$120 - $300", 
    tag: "snacks | appetizers | sandwich" 
  },
  { 
    title: 'Fried Accra banana', 
    price: "$160 - $350", 
    tag: "snacks | appetizers | banana" 
  },
  { 
    title: 'Fried Accra bean', 
    price: "$120 - $240", 
    tag: "snacks | appetizers | beans" 
  }
];

const protein = [
  { 
    title: 'Grilled fish', 
    price: "$120 - $260", 
    tag: "protein | fish | grilled" 
  },
  { 
    title: 'Grilled pork', 
    price: "$120 - $260", 
    tag: "protein | pork | grilled" 
  },
  { 
    title: 'Grilled crabs/lobsters/shrimps', 
    price: "$150 - $300", 
    tag: "protein | seafood | grilled" 
  },
  { 
    title: 'Grilled goat', 
    price: "$150 - $300", 
    tag: "protein | goat | grilled" 
  },
  { 
    title: 'Suya', 
    price: "$150 - $300", 
    tag: "protein | grilled | beef | spicy" 
  },
  { 
    title: 'Fried fish', 
    price: "$100 - $200", 
    tag: "protein | fish | fried" 
  }
];


const addCategory = (items, categoryName) =>
  items.map((item) => ({ ...item, category: categoryName }));

const allProducts = [
  ...addCategory(soupsAndStews, "soups"),
  ...addCategory(smallChopsSnacksAppetizers, "snacks"),
  ...addCategory(protein, "protein"),
];

module.exports = allProducts;
