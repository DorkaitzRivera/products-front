import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(0)]],
  })

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct = this.productForm.value as {
        name: string,
        description: string,
        price: number,
        stock: number,
      }

      this.productService.addProduct(newProduct).subscribe({
        next: () => {
          console.log('Se ha creado el producto:', newProduct);
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
