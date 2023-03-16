import { NgModule } from '@angular/core';

import { MAT_DATE_LOCALE, MatNativeDateModule } from "@angular/material/core";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatPaginatorIntl, MatPaginatorModule } from "@angular/material/paginator";
import { MAT_SNACK_BAR_DATA, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from "@angular/material/snack-bar";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatPaginatorIntlPtBr } from "./components/paginator/mat-paginator-intl-pt-br";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTabsModule } from "@angular/material/tabs";
import { MatStepperModule } from "@angular/material/stepper";
import { MatListModule } from "@angular/material/list";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatRippleModule } from "@angular/material/core";
import { MatChipsModule } from "@angular/material/chips"
import { MatMenuModule } from "@angular/material/menu";

@NgModule({
  declarations: [],
  exports: [
    MatNativeDateModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSortModule,
    MatTableModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
    MatExpansionModule,
    MatTabsModule,
    MatStepperModule,
    MatListModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatRippleModule,
    MatChipsModule,
    MatMenuModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } },
    { provide: MAT_SNACK_BAR_DATA, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlPtBr },
    // { provide: MAT_CHIPS_DEFAULT_OPTIONS, useValue: { separatorKeyCodes: [COMMA, SPACE] }}
  ]
})
export class MaterialModule {
  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.setDefaultFontSetClass("material-symbols-outlined");
  }
}
