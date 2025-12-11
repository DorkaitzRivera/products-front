import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-device-create',
  standalone: true,
  imports: [],
  templateUrl: './device-create.component.html',
  styleUrl: './device-create.component.css'
})
export class DeviceCreateComponent {
  private router = inject(Router);
  private deviceService = inject(DeviceService)

  private fb = inject(FormBuilder);
  public deviceForm = this.fb.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    operating_system: ['', Validators.required],
    release_date: [''],
    image_url: ['']
  })

  onSubmit() {
    if (this.deviceForm.valid) {
      const newDevice = this.deviceForm.value as {
        name: string,
        brand: string,
        price: number,
        operating_system: string,
        release_date: string,
        image_url: string,
      }

      this.deviceService.addDevice(newDevice).subscribe({
        next: () => {
          console.log('Se ha creado el dispositivo:', newDevice);
          this.router.navigate(['/products'])
        },
        error: (error) => console.log('Se ha producido el error:', error)
      });
    }
  }
  onCancel() {
    this.router.navigate(['/products'])
  }
}
