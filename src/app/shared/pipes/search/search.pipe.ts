import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(products: any[], searchText: string): any[] {
    if (!products || !Array.isArray(products)) {
      return []; // Ensures no error if products is undefined or not an array
    }
    
    if (!searchText) {
      return products.slice(0, 12); // Show only first 12 products when no search
    }

    return products.filter(prod =>
      prod.title.toLowerCase().includes(searchText.toLowerCase())
    ).slice(0, 12);
  }
}

