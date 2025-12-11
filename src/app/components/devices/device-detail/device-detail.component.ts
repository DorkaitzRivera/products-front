import { Component, inject, signal } from '@angular/core';
import { Device } from '../../../models/Device';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceStore } from '../device-store';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-device-detail',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    DatePipe,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './device-detail.component.html',
  styleUrl: './device-detail.component.css'
})
export class DeviceDetailComponent {
  device = signal<Device | undefined>(undefined);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(DeviceStore);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const deviceFound = this.store.devices().find((d: { id: string | null; })  => d.id === id);
    this.device.set(deviceFound);
  }

  onEdit(): void {
    if (this.device()) {
      console.log('Editando dispositivo:', this.device()!.id);
      // Navega a la ruta de edición o abre un diálogo
      // this.router.navigate(['/devices/edit', this.device()!.id]);
    }
  }

  onDelete(): void {
    if (this.device()) {
      const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar ${this.device()!.name}?`);
      if (confirmDelete) {
        console.log('Eliminando dispositivo:', this.device()!.id);
        // Implementa la lógica de eliminación aquí
        // this.store.deleteDevice(this.device()!.id);
        // this.router.navigate(['/devices']);
      }
    }
  }
}
