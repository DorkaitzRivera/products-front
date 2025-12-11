import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { Device } from '../../models/Device';

export interface DeviceState {
    devices: Device[];
    loading: boolean;
    error: string | null;
}

const initialState: DeviceState = {
    devices: [],
    loading: false,
    error: null
};

export const DeviceStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ devices }) => ({
    itemNameCount: computed(() => devices().length),
    sortedItemName: computed(() => [...devices()].sort((a, b) => a.name.localeCompare(b.name)))
})),
  withMethods((store) => ({
    setDevices(devices: Device[]) {
      patchState(store, { devices, loading: false, error: null });
    },
    setLoading(loading: boolean) {
      patchState(store, { loading, error: null });
    },
    setError(error: string) {
      patchState(store, { loading: false, error });
    },
    addDevice(device: Device) {
      const devices = [...store.devices(), device];
      patchState(store, { devices, loading: false, error: null })
    },
    updateDevice(id: number, updates: Partial<Device>) {
        const devices = store.devices().map(d => Number(d.id) === id ? {...d, updates} : d);
        patchState(store, { devices })
    },
    removeDevice(id: number) {
        const devices = store.devices().filter(d => Number(d.id) !== id);
        patchState(store, { devices })
    }
  }))
);