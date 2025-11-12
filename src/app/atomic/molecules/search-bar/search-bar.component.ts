import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface SearchCriteria {
  city: string;
  checkIn?: Date;
  checkOut?: Date;
  minPrice?: number;
  maxPrice?: number;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: false
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<SearchCriteria>();

  searchForm: FormGroup;
  today = new Date();

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      city: ['', Validators.required],
      checkIn: [''],
      checkOut: [''],
      minPrice: [0],
      maxPrice: [1000000]
    });

    // Validación: checkout debe ser después de checkin
    this.searchForm.get('checkIn')?.valueChanges.subscribe(() => {
      this.validateDates();
    });

    this.searchForm.get('checkOut')?.valueChanges.subscribe(() => {
      this.validateDates();
    });
  }

  private validateDates(): void {
    const checkIn = this.searchForm.get('checkIn')?.value;
    const checkOut = this.searchForm.get('checkOut')?.value;

    if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
      this.searchForm.get('checkOut')?.setErrors({ invalidDate: true });
    }
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      const formValue = this.searchForm.value;
      const criteria: SearchCriteria = {
        city: formValue.city,
        checkIn: formValue.checkIn ? new Date(formValue.checkIn) : undefined,
        checkOut: formValue.checkOut ? new Date(formValue.checkOut) : undefined,
        minPrice: formValue.minPrice || undefined,
        maxPrice: formValue.maxPrice || undefined
      };
      
      this.search.emit(criteria);
    }
  }

  get cityControl() {
    return this.searchForm.get('city');
  }

  get checkOutControl() {
    return this.searchForm.get('checkOut');
  }
}
