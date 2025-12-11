import { ResolveFn } from '@angular/router';
import { Device } from '../../models/Device';
import { inject } from '@angular/core';
import { DeviceService } from './device.service';

export const deviceResolver: ResolveFn<Device[]> = (route, state) => {

  const deviceService = inject(DeviceService);

  return deviceService.getDevices();
};
