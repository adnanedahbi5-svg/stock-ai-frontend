import { reactive } from "vue";

interface sumMenuDownType {
  child?: string;
  to?: string;
}
interface subMenuType {
  menu?: string;
  to?: string;
  className?: string;
  subMenuDownItems?: sumMenuDownType[];
}

interface menuType {
  icons?: string;
  title?: string;
  className?: string;
  to?: string;
  subMenuItems?: subMenuType[];
  adminOnly?: boolean;
}

const MenuItems = reactive<menuType[]>([
  {
    icons: "flaticon-025-dashboard",
    title: "Dashboard",
    className: "sub-menu",
    subMenuItems: [
      { menu: "Dashboard Light", to: "/" },
      { menu: "Dashboard Dark", to: "/dark" },
      { menu: "New Dashboard", to: "/new" },
      { menu: "Jobs", to: "/jobs-page" },
      { menu: "Application", to: "/application-page" },
      { menu: "Profile", to: "/my-profile" },
      { menu: "Statistics", to: "/statistics-page" },
      { menu: "Companies", to: "/compaines" },
    ],
  },
  {
    icons: "flaticon-093-waving",
    title: "Users",
    className: "sub-menu",
    subMenuItems: [
      { menu: "User Lists", to: "/user-list" },
      { menu: "New User", to: "/new-user" },
      { menu: "User Profile", to: "/user-profile" },
      { menu: "User Edit", to: "/users/1/edit" },
    ],
    adminOnly: true,
  },
  {
    icons: "fa-solid fa-box",
    title: "Products",
    className: "sub-menu",
    subMenuItems: [
      { menu: "Product Lists", to: "/products" },
      { menu: "New Product", to: "/products/new" },
      { menu: "Product History", to: "/products/history" },
    ],
  },
  {
    icons: "fa-solid fa-list",
    title: "Categories",
    className: "sub-menu",
    subMenuItems: [
      { menu: "Category Lists", to: "/categories" },
      { menu: "New Category", to: "/categories/new" },
      { menu: "Category History", to: "/categories/history" },
    ],
  },
  {
    icons: "fa-solid fa-boxes-stacked", // Icône adaptée au stockage
    title: "Mouvements Stock",
    className: "sub-menu",
    subMenuItems: [
      {
        menu: "Liste des Mouvements",
        to: "/stock-movements"
      }, // Pour consulterHistorique()
      {
        menu: "Nouveau Mouvement",
        to: "/stock-movements/new"
      }, // Pour creerMouvement()
    ],
  },
  {
    icons: "fa-solid fa-truck",
    title: "Fournisseurs",
    className: "sub-menu",
    subMenuItems: [
      { menu: "Fournisseur Lists", to: "/fournisseurs" },
      { menu: "New Fournisseur", to: "/fournisseurs/new" },
      { menu: "Fournisseur History", to: "/fournisseurs/history" },
    ],
  },
  {
    icons: "fa-solid fa-cart-shopping",
    title: "Commandes",
    className: "sub-menu",
    subMenuItems: [
      { menu: "Commande Lists", to: "/commandes" },
      { menu: "New Commande", to: "/commandes/new" },
    ],
  },
  {
    icons: "fa-solid fa-clock-rotate-left",
    title: "Activity Logs",
    to: "/activity-logs",
    adminOnly: true,
  },
  {
    icons: "fa-solid fa-gear",
    title: "CMS",
    className: "sub-menu",
    subMenuItems: [
      { menu: "Content", to: "/content" },
      { menu: "Add Content", to: "/add-content" },
      { menu: "Menus", to: "/menu" },
      { menu: "Email Template", to: "/email-template" },
      { menu: "Add Email", to: "/add-email" },
      { menu: "Blog", to: "/cms-blog" },
      { menu: "Add Blog", to: "/add-blog" },
      { menu: "Add Category", to: "/blog-category" },
    ],
  },
  {
    icons: "fa-solid fa-file-pdf",
    title: "Rapports",
    className: "sub-menu",
    subMenuItems: [
      { menu: "Liste Rapports", to: "/rapports" },
    ],
  },
  // {
  //   icons: `flaticon-093-waving`,
  //   title: "Tasks",
  //   to: "/task",
  // },
  // { icons: SVGImage.iconSvg3, title: "Projects", to: "/project" },
  // { title: "OUR FEATURES", className: "menu-title" },
  {
    icons: "flaticon-050-info",
    title: "Apps",
    className: "sub-menu",
    subMenuItems: [
      { menu: "Profile", to: "/app-profile" },
      { menu: "Edit Profile", to: "/edit-profile" },
      { menu: "Post Details", to: "/post-details" },
      // {
      //   menu: "Users Manager",
      //   className: "sub-menu-down",
      //   subMenuDownItems: [
      //     { child: "User", to: "/user" },
      //     { child: "Add User", to: "/edit-profile" },
      //     // { child: 'Roles Listing', to: '/user-roles' },
      //     // { child: 'Add Roles', to: '/add-role' },
      //     { child: "Profile 1", to: "/app-profile-1" },
      //     { child: "Profile 2", to: "/app-profile-2" },
      //     { child: "Edit Profile", to: "/edit-profile" },
      //     { child: "Post Details", to: "/post-details" },
      //   ],
      // },
      // {
      //   menu: 'Customer Manager',
      //   className: 'sub-menu-down',
      //   subMenuDownItems: [
      //     { child: 'Customer', to: '/customer' },
      //     { child: 'Customer Profile', to: '/customer-profile' }
      //   ]
      // },
      // { menu: 'Contacts', to: '/contacts' },
      {
        menu: "Email",
        className: "sub-menu-down",
        subMenuDownItems: [
          { child: "Compose", to: "/email-compose" },
          { child: "Inbox", to: "/email-inbox" },
          { child: "Read", to: "/email-read" },
        ],
      },
      { menu: "Calendar", to: "/app-calender" },
      {
        menu: "Shop",
        className: "sub-menu-down",
        subMenuDownItems: [
          { child: "Product Grid", to: "/ecom-product-grid" },
          { child: "Product List", to: "/ecom-product-list" },
          { child: "Product Details", to: "/ecom-product-detail" },
          { child: "Order", to: "/ecom-product-order" },
          { child: "Checkout", to: "/ecom-checkout" },
          { child: "Invoice", to: "/ecom-invoice" },
          { child: "Customers", to: "/ecom-customes" },
        ],
      },
    ],
  },

  {
    icons: "flaticon-041-graph",
    title: "Charts",
    className: "sub-menu",
    subMenuItems: [
      { menu: "Flot", to: "/chart-flot" },
      { menu: "Apex", to: "/chart-apex" },
      { menu: "Chartjs", to: "/chart-chartjs" },
    ],
  },
  {
    icons: "flaticon-086-star",
    title: "Bootstrap",
    className: "sub-menu",
    subMenuItems: [
      { menu: "Accordion", to: "/ui-accordion" },
      { menu: "Alert", to: "/ui-alert" },
      { menu: "Badge", to: "/ui-badge" },
      { menu: "Button", to: "/ui-button" },
      { menu: "Modal", to: "/ui-modal" },
      { menu: "Button Group", to: "/ui-button-group" },
      { menu: "List Group", to: "/ui-list-group" },
      { menu: "Cards", to: "/ui-card" },
      { menu: "Carousel", to: "/ui-carousel" },
      { menu: "Dropdown", to: "/ui-dropdown" },
      { menu: "Popover", to: "/ui-popover" },
      { menu: "Progressbar", to: "/ui-progressbar" },
      { menu: "Tab", to: "/ui-tab" },
      { menu: "Typography", to: "/ui-typography" },
      { menu: "Pagination", to: "/ui-pagination" },
      { menu: "Grid", to: "/ui-grid" },
    ],
  },
  {
    icons: "flaticon-045-heart",
    title: "Plugins",
    className: "sub-menu",
    subMenuItems: [
      { menu: "Select 2", to: "/uc-select2" },
      { menu: "Nestable", to: "/uc-nestable" },
      { menu: "Sweet Alert", to: "/uc-sweetalert" },
      { menu: "Toastr", to: "/uc-toastr" },
      { menu: "Jqv Map", to: "/map-jqvmap" },
      { menu: "Light Gallery", to: "/uc-lightgallery" },
    ],
  },
  { icons: "flaticon-013-checkmark", title: "Widget", to: "/widget-basic" },
  {
    icons: "flaticon-072-printer",
    title: "Forms",
    className: "sub-menu",
    subMenuItems: [
      { menu: "Form Elements", to: "/form-element" },
      { menu: "Wizard", to: "/form-wizard" },
      { menu: "CkEditor", to: "/form-ckeditor" },
      { menu: "Pickers", to: "/form-pickers" },
      { menu: "Form Validate", to: "/form-validation" },
    ],
  },
  {
    icons: "flaticon-043-menu",
    title: "Table",
    className: "sub-menu",
    subMenuItems: [
      { menu: "Bootstrap", to: "/table-bootstrap-basic" },
      { menu: "Datatable", to: "/table-datatable-basic" },
    ],
  },
  {
    icons: "flaticon-022-copy",
    title: "Pages",
    className: "sub-menu",
    subMenuItems: [
      { menu: "Login", to: "/page-login" },
      { menu: "Register", to: "/page-register" },
      {
        menu: "Error",
        className: "sub-menu-down",
        subMenuDownItems: [
          { child: "Error 400", to: "/page-error-400" },
          { child: "Error 403", to: "/page-error-403" },
          { child: "Error 404", to: "/page-error-404" },
          { child: "Error 500", to: "/page-error-500" },
          { child: "Error 503", to: "/page-error-503" },
        ],
      },
      { menu: "Lock Screen", to: "/page-lock-screen" },
      { menu: "Empty Page", to: "/empty-page" },
    ],
  },
]);
export default MenuItems;
