import { Component, inject, signal } from '@angular/core';
import { Device } from '../../../models/Device';
import { ActivatedRoute } from '@angular/router';
import { DeviceStore } from '../device-store';

@Component({
  selector: 'app-device-detail',
  standalone: true,
  imports: [],
  templateUrl: './device-detail.component.html',
  styleUrl: './device-detail.component.css'
})
export class DeviceDetailComponent {
  device = signal<Device | undefined>(undefined);
  
  private route = inject(ActivatedRoute);
  private store = inject(DeviceStore);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const deviceFound = this.store.devices().find((d: { id: number | null; })  => d.id === id);
    this.device.set(deviceFound);
  }
}
