import { NgModule } from '@angular/core';

// ORDENAR ALFABETICAMENTE
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  exports: [
    ButtonModule,
    CalendarModule,
    ChartModule,
    CheckboxModule,
    ConfirmDialogModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    FieldsetModule,
    InputNumberModule,
    InputTextModule,
    MenuModule,
    MultiSelectModule,
    PasswordModule,
    ProgressBarModule,
    RadioButtonModule,
    SidebarModule,
    SliderModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    ToastModule,
    ToolbarModule,
  ]
})
export class PrimeModule { }