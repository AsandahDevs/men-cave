import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
})
export class ProductFiltersComponent {
  @Input() categories: string[] = [];
  @Input() selectedCategory = 'All products';
  @Input() searchTerm = '';
  @Output() searchTermChange = new EventEmitter<string>();
  @Output() selectedCategoryChange = new EventEmitter<string>();

  updateSearch(event: Event): void {
    this.searchTermChange.emit((event.target as HTMLInputElement).value);
  }

  selectCategory(category: string): void {
    this.selectedCategoryChange.emit(category);
  }
}
