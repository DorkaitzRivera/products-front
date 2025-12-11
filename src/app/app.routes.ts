import { Routes } from '@angular/router';
import { DeviceListComponent } from './components/devices/device-list/device-list.component';
import { deviceResolver } from './components/devices/device.resolver';

export const routes: Routes = [
    {
        path: '', component: DeviceListComponent, resolve: {devices: deviceResolver}
    },
    {
        path: 'products/new',
        loadComponent: () => import('./components/devices/device-create/device-create.component').then(c => c.DeviceCreateComponent)
    },
    {
        path: 'products/:id',
        loadComponent: () => import('./components/devices/device-detail/device-detail.component').then(c => c.DeviceDetailComponent)
    },
    {
        path: '', redirectTo: 'products', pathMatch: 'full'
    },
    {
        path: '**', redirectTo: 'products'
    }
];
