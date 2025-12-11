import { Injectable, inject } from '@angular/core';
import { DeviceStore } from './device-store';
import { map, Observable, of, tap } from 'rxjs';
import { Device } from '../../models/Device';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private store = inject(DeviceStore);
  private http = inject(HttpClient);
  private productsUrl = 'http://localhost:3000/products'

  getDevices(): Observable<Device[]> {
    if (this.store.devices().length > 0) {
      return of(this.store.devices());
    };

    this.store.setLoading(true);

    return this.http.get<Device[]>(this.productsUrl).pipe(
      tap(devices => this.store.setProducts(devices))
    )
  }

  addDevice(device: Omit<Device, 'id'>): Observable<Device> {
    return this.http.post<Device>(this.productsUrl, device).pipe(
      map(device => {
        this.store.addProduct(device);
        return device
      })
    )
  }

  constructor() { }
}
