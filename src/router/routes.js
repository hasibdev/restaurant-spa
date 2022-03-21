import checkout from '../middlewares/checkout'

const routes = [
   {
      path: '/',
      component: () => import('layouts/MainLayout.vue'),
      children: [
         { path: '', component: () => import('pages/Index.vue') },
         { path: 'products/:id', component: () => import('pages/products/details.vue') },
         {
            path: 'shop',
            name: 'shop',
            component: () => import('pages/shop.vue'),
         },
         {
            path: 'contact',
            name: 'contact',
            component: () => import('pages/contact.vue'),
         },
         {
            path: 'checkout',
            name: 'checkout',
            component: () => import('pages/checkout.vue'),
            meta: {
               middleware: [checkout]
            },
         },
         {
            path: 'profile',
            name: 'profileroot',
            component: () => import('pages/profile.vue'),
            children: [
               {
                  path: '',
                  name: 'profile',
                  component: () => import('pages/profile/index.vue'),
               },
               {
                  path: 'orders',
                  name: 'orders',
                  component: () => import('pages/profile/orders.vue'),
               },
               {
                  path: 'change-password',
                  name: 'change-password',
                  component: () => import('pages/profile/changePassword.vue'),
               }
            ]
         },
      ]
   },

   // Always leave this as last one,
   // but you can also remove it
   {
      path: '/:catchAll(.*)*',
      component: () => import('pages/Error404.vue')
   }
]

export default routes
