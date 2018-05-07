import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChartModule} from 'angular2-highcharts';
import {RouterModule, Routes} from '@angular/router';

import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material';
import {MatSelectModule} from '@angular/material';
import {MatOptionModule} from '@angular/material';
import {MatStepperModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';


import {AppComponent} from './app.component';
import {DialogImportComponent} from './dialog-import/dialog-import.component';
import {BookComponent} from './book/book.component';
import {ChartComponent} from './chart/chart.component';
import {BookDetailComponent} from './book-detail/book-detail.component';
import {BookCreateComponent} from './book-create/book-create.component';
import {BookEditComponent} from './book-edit/book-edit.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { ImportComponent } from './import/import.component';
import { GraphicComponent } from './graphic/graphic.component';
import {HttpService} from './service/http.service';
import { TableComponent } from './table/table.component';



const appRoutes: Routes = [
  {
    path: 'books',
    component: BookComponent,
    data: {title: 'Book List'}
  },
  {
    path: 'charts',
    component: ChartComponent,
    data: {title: 'Chart List'}
  },
  {
    path: 'book-details/:id',
    component: BookDetailComponent,
    data: {title: 'Book Details'}
  },
  {
    path: 'book-create',
    component: BookCreateComponent,
    data: {title: 'Create Book'}
  },
  {
    path: 'book-edit/:id',
    component: BookEditComponent,
    data: {title: 'Edit Book'}
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DialogImportComponent,
    BookComponent,
    ChartComponent,
    BookDetailComponent,
    BookCreateComponent,
    BookEditComponent,
    MainComponent,
    HeaderComponent,
    ImportComponent,
    GraphicComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    AngularFontAwesomeModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatStepperModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule.forRoot(require('highcharts/highstock')),
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    )],
  entryComponents: [DialogImportComponent],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
