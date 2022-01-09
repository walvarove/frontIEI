import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './views/search.component';
import { FormGroup, FormControl } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {DropdownModule} from 'primeng/dropdown';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [ SearchComponent ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    DropdownModule,
    MatSelectModule
  ]
})
export class SearchModule { }
