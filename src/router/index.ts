import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { el: "#app", top: 0, behavior: "smooth" };
  },
  routes: [
    {
      path: "/",
      name: "light",
      component: () => import("../views/dashboard/Dashboard.vue"),
      meta: { layout: "layout" },
    },
    {
      path: "/new",
      name: "new",
      component: () => import("../views/dashboard/NewDashboard.vue"),
      meta: { layout: "layout3" },
    },
    {
      path: "/dark",
      name: "dark",
      component: () => import("../views/dashboard/Dashboard.vue"),
      meta: { layout: "layout" },
    },
    {
      path: "/jobs-page",
      name: "Search Jobs",
      component: () => import("../views/dashboard/Jobs.vue"),
      meta: { layout: "layout" },
    },
    {
      path: "/application-page",
      name: "Applications",
      component: () => import("../views/dashboard/ApplicationPage.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/my-profile",
      name: "My Profile",
      component: () => import("../views/dashboard/MyProfile.vue"),
      meta: { layout: "layout" },
    },
    {
      path: "/statistics-page",
      name: "Statistics",
      component: () => import("../views/dashboard/Statistic.vue"),
      meta: { layout: "layout" },
    },
    {
      path: "/compaines",
      name: "Companies",
      component: () => import("../views/dashboard/Compaines.vue"),
      meta: { layout: "layout" },
    },
    // {
    //   path: "/job-view",
    //   name: "Job View",
    //   component: () => import("../views/Users/JobView.vue"),
    //   meta: { layout: "layout" },
    // },
    // {
    //   path: "/apply-job",
    //   name: "Apply Job",
    //   component: () => import("../views/Users/ApplyJob.vue"),
    //   meta: { layout: "layout" },
    // },
    {
      path: "/new-user",
      name: "New User",
      component: () => import("../views/Users/NewUser.vue"),
      meta: { layout: "layout", requiresAdmin: true },
    },
    {
      path: "/user-profile",
      name: "User Profile",
      component: () => import("../views/Users/UserProfile.vue"),
      meta: { layout: "layout", requiresAdmin: true },
    },
    {
      path: "/user-list",
      name: "User List",
      component: () => import("../views/Users/UserList.vue"),
      meta: { layout3: "layout3", requiresAdmin: true },
    },
    {
      path: "/users/:id",
      name: "user_profile_detail",
      component: () => import("../views/Users/UserProfile.vue"),
      meta: { layout3: "layout3", requiresAdmin: true },
    },
    {
      path: "/users/:id/edit",
      name: "user_edit",
      component: () => import("../views/Users/UserEdit.vue"),
      meta: { layout3: "layout3", requiresAdmin: true },
    },
    // {
    //   path: "/job-application",
    //   name: "Job Application",
    //   component: () => import("../views/Users/JobAplication.vue"),
    //   meta: { layout3: "layout3" },
    // },
    {
      path: "/activity-logs",
      name: "Activity Logs",
      component: () => import("../views/ActivityLog/ActivityLogList.vue"),
      meta: { layout3: "layout3", requiresAdmin: true },
    },
    {
      path: "/products",
      name: "Product List",
      component: () => import("../views/Products/ProductList.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/products/new",
      name: "New Product",
      component: () => import("../views/Products/NewProduct.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/products/history",
      name: "Product History",
      component: () => import("../views/Products/ProductHistory.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/products/:id/edit",
      name: "Product Edit",
      component: () => import("../views/Products/ProductEdit.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/categories",
      name: "Category List",
      component: () => import("../views/Categories/CategoryList.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/categories/new",
      name: "New Category",
      component: () => import("../views/Categories/NewCategory.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/categories/history",
      name: "Category History",
      component: () => import("../views/Categories/CategoryHistory.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/categories/:id/edit",
      name: "Category Edit",
      component: () => import("../views/Categories/CategoryEdit.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/fournisseurs",
      name: "Fournisseur List",
      component: () => import("../views/Fournisseurs/FournisseurList.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/fournisseurs/new",
      name: "New Fournisseur",
      component: () => import("../views/Fournisseurs/NewFournisseur.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/fournisseurs/history",
      name: "Fournisseur History",
      component: () => import("../views/Fournisseurs/FournisseurHistory.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/fournisseurs/:id/edit",
      name: "Fournisseur Edit",
      component: () => import("../views/Fournisseurs/FournisseurEdit.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/stock-movements",
      name: "Stock Movements",
      component: () => import("../views/StockMouvement/StockMovementList.vue"), // Vérifie bien le chemin du fichier
      meta: { layout3: "layout3" },
    },
    {
      path: "/stock-movements/new",
      name: "New Movement",
      component: () => import("../views/StockMouvement/AddStockMovement.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/commandes",
      name: "Commande List",
      component: () => import("../views/Commande/CommandeList.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/commandes/new",
      name: "New Commande",
      component: () => import("../views/Commande/NewCommande.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/commandes/:id",
      name: "Commande Details",
      component: () => import("../views/Commande/CommandeDetails.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/commandes/:id/edit",
      name: "Commande Edit",
      component: () => import("../views/Commande/CommandeEdit.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/rapports",
      name: "Rapports",
      component: () => import("../views/Rapport/Rapports.vue"),
      meta: { layout3: "layout3" },
    },
    // {
    //   path: '/index-3',
    //   name: 'index_3',
    //   component: () => import('../views/dashboard/Dashboard3.vue'),
    //   meta: { layout: 'layout' }
    // },
    // {
    //   path: '/index-4',
    //   name: 'index_4',
    //   component: () => import('../views/dashboard/Dashboard4.vue'),
    //   meta: { layout: 'layout' }
    // },
    // {
    //   path: '/crm',
    //   name: 'crm',
    //   component: () => import('../views/dashboard/Crm.vue'),
    //   meta: { layout: 'layout' }
    // },
    // {
    //   path: '/analytics',
    //   name: 'analytics',
    //   component: () => import('../views/dashboard/Analytics.vue'),
    //   meta: { layout: 'layout' }
    // },
    // {
    //   path: '/products',
    //   name: 'products',
    //   component: () => import('../views/dashboard/Product.vue'),
    //   meta: { layout: 'layout' }
    // },
    // {
    //   path: '/sales',
    //   name: 'sales',
    //   component: () => import('../views/dashboard/Sales.vue'),
    //   meta: { layout: 'layout' }
    // },
    // {
    //   path: '/index-2',
    //   name: 'index_2',
    //   component: () => import('../views/dashboard/Dashboard.vue'),
    //   meta: { layout: 'layout' }
    // },
    // {
    //   path: '/employee',
    //   name: 'employee',
    //   component: () => import('../views/Employee.vue'),
    //   meta: { layout3: 'layout3' }
    // },
    // {
    //   path: '/core-hr',
    //   name: 'core_hr',
    //   component: () => import('../views/CoreHr.vue'),
    //   meta: { layout: 'layout' }
    // },
    // {
    //   path: '/finance',
    //   name: 'finance',
    //   component: () => import('../views/Finance.vue'),
    //   meta: { layout: 'layout' }
    // },
    // {
    //   path: '/task',
    //   name: 'task',
    //   component: () => import('../views/tasks/Task.vue'),
    //   meta: { layout: 'layout' }
    // },

    // {
    //   path: '/project',
    //   name: 'project',
    //   component: () => import('../views/Project.vue'),
    //   meta: { layout: 'layout' }
    // },
    // {
    //   path: '/my-project',
    //   name: 'my_project',
    //   component: () => import('../views/MyProject.vue'),
    //   meta: { layout: 'layout' }
    // },
    // {
    //   path: '/notifications',
    //   name: 'notifications',
    //   component: () => import('../views/Notifications.vue'),
    //   meta: { layout3: 'layout3' }
    // },
    // {
    //   path: '/manage-client',
    //   name: 'manage_client',
    //   component: () => import('../views/ManageClient.vue'),
    //   meta: { layout: 'layout' }
    // },
    // {
    //   path: '/blog',
    //   name: 'blog',
    //   component: () => import('../views/Blog.vue'),
    //   meta: { layout: 'layout' }
    // },
    // {
    //   path: '/svg-icon',
    //   name: 'svg_icon',
    //   component: () => import('../views/SvgIcons.vue'),
    //   meta: { layout: 'layout' }
    // },
    // {
    //   path: '/chat',
    //   name: 'chat',
    //   component: () => import('../views/app/Chat.vue'),
    //   meta: { layout2: 'layout2' }
    // },
    // {
    //   path: '/user',
    //   name: 'user',
    //   component: () => import('../views/app/userManeger/User.vue'),
    //   meta: { layout3: 'layout3' }
    // },
    {
      path: "/edit-profile",
      name: "Edit Profile",
      component: () => import("../views/app/userManeger/AddUser.vue"),
      meta: { layout3: "layout3" },
    },
    // {
    //   path: '/user-roles',
    //   name: 'user_roles',
    //   component: () => import('../views/app/userManeger/UserRoles.vue'),
    //   meta: { layout3: 'layout3' }
    // },
    // {
    //   path: '/add-role',
    //   name: 'add_role',
    //   component: () => import('../views/app/userManeger/AddRole.vue'),
    //   meta: { layout3: 'layout3' }
    // },
    // {
    //   path: '/app-profile-1',
    //   name: 'app_profile_1',
    //   component: () => import('../views/app/userManeger/AppProfile1.vue'),
    //   meta: { layout3: 'layout3' }
    // },
    {
      path: "/app-profile",
      name: "Profile",
      component: () => import("../views/app/userManeger/AppProfile1.vue"),
      meta: { layout: "layout" },
    },
    // {
    //   path: '/app-profile-2',
    //   name: 'app_profile_2',
    //   component: () => import('../views/app/userManeger/AppProfile2.vue'),
    //   meta: { layout3: 'layout3' }
    // },
    {
      path: "/post-details",
      name: "Post Details",
      component: () => import("../views/app/userManeger/PostDetail.vue"),
      meta: { layout3: "layout3" },
    },
    // {
    //   path: '/customer',
    //   name: 'customer',
    //   component: () => import('../views/app/customerManeger/Customer.vue'),
    //   meta: { layout3: 'layout3' }
    // },
    // {
    //   path: '/customer-profile',
    //   name: 'customer_profile',
    //   component: () => import('../views/app/customerManeger/CustomerProfile.vue'),
    //   meta: { layout3: 'layout3' }
    // },
    // {
    //   path: '/contacts',
    //   name: 'contacts',
    //   component: () => import('../views/app/Contacts.vue'),
    //   meta: { layout3: 'layout3' }
    // },
    {
      path: "/email-compose",
      name: "Compose",
      component: () => import("../views/app/email/Compose.vue"),
      meta: { layout3: "layout3" },
    },

    {
      path: "/email-inbox",
      name: "Inbox",
      component: () => import("../views/app/email/EmailInbox.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/email-read",
      name: "Read",
      component: () => import("../views/app/email/EmailRead.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/app-calender",
      name: "Calendar",
      component: () => import("../views/app/Calender.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ecom-product-grid",
      name: "Product Grid",
      component: () => import("../views/app/shop/ProductGrid.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ecom-product-list",
      name: " Product List",
      component: () => import("../views/app/shop/ProductList.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ecom-product-detail",
      name: " Product Detail",
      component: () => import("../views/app/shop/ProductDetails.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ecom-product-order",
      name: " Product Order",
      component: () => import("../views/app/shop/ProductOrder.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ecom-checkout",
      name: "Checkout",
      component: () => import("../views/app/shop/Checkout.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ecom-invoice",
      name: "Invoice",
      component: () => import("../views/app/shop/Invoice.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ecom-customes",
      name: "Customers",
      component: () => import("../views/app/shop/Customers.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/content",
      name: "Content",
      component: () => import("../views/cms/Content.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/menu",
      name: "Menu",
      component: () => import("../views/cms/Menu.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/email-template",
      name: "Email Template",
      component: () => import("../views/cms/EmailTemplate.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/cms-blog",
      name: "Blog",
      component: () => import("../views/cms/Blog.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/add-email",
      name: "Add Email",
      component: () => import("../views/cms/AddEmail.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/add-content",
      name: "Add Content",
      component: () => import("../views/cms/AddContent.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/add-blog",
      name: "Add Blog",
      component: () => import("../views/cms/AddBlog.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/blog-category",
      name: "Blog Category",
      component: () => import("../views/cms/BlogCategory.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/chart-flot",
      name: " Chart Flot",
      component: () => import("../views/charts/Flot.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/chart-apex",
      name: "Chart Apex",
      component: () => import("../views/charts/Morris.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/chart-chartjs",
      name: "Chart Chartjs",
      component: () => import("../views/charts/ChartJs.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ui-accordion",
      name: "Accordion",
      component: () => import("../views/bootstrap/Accordian.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ui-alert",
      name: "Alert",
      component: () => import("../views/bootstrap/Alerts.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ui-badge",
      name: "Badge",
      component: () => import("../views/bootstrap/Badge.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ui-button",
      name: "Button",
      component: () => import("../views/bootstrap/Buttons.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ui-modal",
      name: "Modal",
      component: () => import("../views/bootstrap/Modal.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ui-button-group",
      name: "Button Group",
      component: () => import("../views/bootstrap/ButtonGroup.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ui-list-group",
      name: "List Group",
      component: () => import("../views/bootstrap/ListGroup.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ui-card",
      name: "Card",
      component: () => import("../views/bootstrap/Card.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ui-carousel",
      name: "Carousel",
      component: () => import("../views/bootstrap/Carousel.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ui-dropdown",
      name: "Dropdown",
      component: () => import("../views/bootstrap/Dropdown.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ui-popover",
      name: "Popover",
      component: () => import("../views/bootstrap/Popover.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ui-progressbar",
      name: "Progressbar",
      component: () => import("../views/bootstrap/Progressbar.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ui-tab",
      name: "Tab",
      component: () => import("../views/bootstrap/Tab.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ui-typography",
      name: "Typography",
      component: () => import("../views/bootstrap/Typography.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ui-pagination",
      name: "Pagination",
      component: () => import("../views/bootstrap/Pagination.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/ui-grid",
      name: "Grid",
      component: () => import("../views/bootstrap/Grid.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/uc-select2",
      name: "Select2",
      component: () => import("../views/plugins/Select2.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/uc-nestable",
      name: "Nestable",
      component: () => import("../views/plugins/Nestable.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/uc-sweetalert",
      name: "Sweet Alert",
      component: () => import("../views/plugins/Sweetalert.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/uc-toastr",
      name: "Toastr",
      component: () => import("../views/plugins/Toastr.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/map-jqvmap",
      name: "Jqvmap",
      component: () => import("../views/plugins/JqvMap.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/uc-lightgallery",
      name: "Light Gallery",
      component: () => import("../views/plugins/LightGallery.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/widget-basic",
      name: "Widget",
      component: () => import("../views/Widget.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/form-element",
      name: " Form Element",
      component: () => import("../views/Forms/FormElement.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/form-wizard",
      name: " Form Wizard",
      component: () => import("../views/Forms/FormWizard.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/form-ckeditor",
      name: "Ckeditor",
      component: () => import("../views/Forms/Ckeditor.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/form-pickers",
      name: "Pickers",
      // @ts-ignore
      component: () => import("../views/Forms/FormPickers.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/form-validation",
      name: "Validation",
      component: () => import("../views/Forms/FormValidation.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/table-bootstrap-basic",
      name: "Table Basic",
      component: () => import("../views/table/TableBootstrap.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/table-datatable-basic",
      name: "Datatable",
      component: () => import("../views/table/TableDatabase.vue"),
      meta: { layout3: "layout3" },
    },
    {
      path: "/page-login",
      name: "page_login",
      component: () => import("../views/pages/Login.vue"),
      meta: { layout4: "layout4" },
    },
    {
      path: "/page-register",
      name: "page_register",
      component: () => import("../views/pages/Register.vue"),
      meta: { layout4: "layout4" },
    },
    {
      path: "/page-forgot-password",
      name: "page_forgot_password",
      component: () => import("../views/pages/ForgetPassword.vue"),
      meta: { layout4: "layout4" },
    },
    {
      path: "/page-error-400",
      name: "page_error_400",
      component: () => import("../views/pages/error/Error400.vue"),
      meta: { layout4: "layout4" },
    },
    {
      path: "/page-error-403",
      name: "page_error_403",
      component: () => import("../views/pages/error/Error403.vue"),
      meta: { layout4: "layout4" },
    },
    {
      path: "/page-error-404",
      name: "page_error_404",
      component: () => import("../views/pages/error/Error404.vue"),
      meta: { layout4: "layout4" },
    },
    {
      path: "/page-error-500",
      name: "page_error_500",
      component: () => import("../views/pages/error/Error500.vue"),
      meta: { layout4: "layout4" },
    },
    {
      path: "/page-error-503",
      name: "page_error_503",
      component: () => import("../views/pages/error/Error503.vue"),
      meta: { layout4: "layout4" },
    },
    {
      path: "/page-lock-screen",
      name: "page_lock_screen",
      component: () => import("../views/pages/LockScreen.vue"),
      meta: { layout4: "layout4" },
    },
    {
      path: "/empty-page",
      name: "empty_page",
      component: () => import("../views/pages/EmptyPage.vue"),
      meta: { layout3: "layout3" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next({ name: "page_error_403" });
  } else {
    next();
  }
});

export default router;
