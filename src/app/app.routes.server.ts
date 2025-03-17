import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path:'products/edit/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'orders/edit/:id',
    renderMode: RenderMode.Server
  }
];
