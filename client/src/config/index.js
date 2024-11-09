export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [

      { id: "podvapes", label: "Pod Vapes" },
      { id: "disposablevapes", label: "Disposable Vapes" },
      { id: "vapepens", label: "Vape Pens" },
      { id: "cbd", label: "CBD" },
      { id: "vapemods", label: "Vape Mods" },
      
    ],
  },
  {
    label: "Flavor", 
    name: "flavor",
    componentType: "multiselect",
    options: [
      { id: "vanilla", label: "Vanilla" },
      { id: "chocolate", label: "Chocolate" },
      { id: "strawberry", label: "Strawberry" },
      { id: "mint", label: "Mint" },
      { id: " assortedflavors", label: " Assorted Flavors" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
     
     
      { id: "airscream", label: "Airscream" },
      { id: "elfbar", label: "Elfbar" },
      { id: "nasty", label: "Nasty" },
      { id: "fume", label: "Fume" },
      { id: "airfuze", label: "Airfuze" },
      { id: "ijoy", label: "IJOY" },
       { id: "cbd", label: "CBD" },

    ],
  },

  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
 
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price ",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
 
  
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
 
  disposablevapes: "Disposable Vapes",
  vapepens: "Vape Pens",
  podvapes: "Pod Vapes",
  cBD: "CBD",
};

export const brandOptionsMap = {
  airscream: "Airscream",
  elfbar: "elfbar",
  nasty: "Nasty",
  fume: "Fume",
  airfuze: "Airfuze",
  ijoy: "Ijoy",
  cbd: "CBD",
};

export const filterOptions = {
  category: [
    
    { id: "disposablevapes", label: "Disposable Vapes" },
    { id: "vapepens", label: "Vape Pens" },
    { id: "podvapes", label: "Pod Vapes" },
    { id: "cbd", label: "CBD" },
  ],
  brand: [
    { id: "airscream", label: "Airscream" },
    { id: "elfbar", label: "Elfbar" },
    { id: "nasty", label: "Nasty" },
    { id: "fume", label: "Fume" },
    { id: "airfuze", label: "Airfuze" },
    { id: "ijoy", label: "Ijoy" },
    { id: "cbd", label: "CBD" },
  ],
};


export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "postcode",
    name: "postcode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your postcode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
