import { Component, computed, inject, OnInit } from '@angular/core';
import { DeviceStore } from '../device-store';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.css'
})
export class DeviceListComponent implements OnInit {

    private store = inject(DeviceStore);
    private deviceService = inject(DeviceService);
    devices = this.store.sortedDevices;

    hasDevices = computed(() => this.store.devices().length > 0);

    ngOnInit(): void {
      this.deviceService.getDevices().subscribe();
    }

}
