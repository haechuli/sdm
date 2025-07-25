import { NgModule } from '@angular/core';

// UI Components
import { ButtonComponent } from './button/button.component';
import { ComboBoxComponent } from './combobox/combobox.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { GridComponent } from './grid/grid.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { InputComponent } from './input/input.component';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { LoadingComponent } from './loading/loading.component';
import { GlobalLoadingComponent } from './loading/global-loading.component';
import { MaskInputComponent } from './mask-input/mask-input.component';
import { NumberInputComponent } from './number-input/number-input.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';

@NgModule({
  imports: [
    ButtonComponent,
    ComboBoxComponent,
    CustomerSearchComponent,
    DatepickerComponent,
    FileUploadComponent,
    GridComponent,
    ImageViewerComponent,
    InputComponent,
    LanguageSelectorComponent,
    LoadingComponent,
    GlobalLoadingComponent,
    MaskInputComponent,
    NumberInputComponent,
    PageTitleComponent,
    ThemeSelectorComponent
  ],
  exports: [
    ButtonComponent,
    ComboBoxComponent,
    CustomerSearchComponent,
    DatepickerComponent,
    FileUploadComponent,
    GridComponent,
    ImageViewerComponent,
    InputComponent,
    LanguageSelectorComponent,
    LoadingComponent,
    GlobalLoadingComponent,
    MaskInputComponent,
    NumberInputComponent,
    PageTitleComponent,
    ThemeSelectorComponent
  ]
})
export class UiComponentsModule { }
