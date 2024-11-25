import { Router } from '@vaadin/router';

export const setupRouter = (outlet) => {
  const router = new Router(outlet);

  router.setRoutes([
    {
      path: '/',
      component: 'employee-list',
      action: async () => {
        await import('./pages/employees/employee-list/index.js');
      },
    },
    {
      path: '/add-employee',
      component: 'add-employee',
      action: async () => {
        await import('./pages/employees/add-employee/index.js');
      },
    },
    {
      path: '/edit-employee',
      component: 'edit-employee',
      action: async () => {
        await import('./pages/employees/edit-employee/index.js');
      },
    },
    {
      path: '(.*)', // Fallback for unknown routes
      component: 'not-found-view',
      action: async () => {
        await import('./pages/not-found/not-found-view/index.js');
      },
    },
  ]);
};
