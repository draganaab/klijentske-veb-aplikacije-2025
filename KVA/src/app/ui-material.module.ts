import { NgModule } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { RatingModule } from 'primeng/rating';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSliderModule} from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
    imports: [
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatCardModule,
        MatCheckboxModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatPaginatorModule,
        MatDialogModule,
        RatingModule,
        MatButtonToggleModule,
        MatExpansionModule,
        MatSliderModule,
        MatTabsModule,
        MatProgressBarModule
    ],
    exports: [
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatCardModule,
        MatCheckboxModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatPaginatorModule,
        MatDialogModule,
        RatingModule,
        MatButtonToggleModule,
        MatExpansionModule,
        MatSliderModule,
        MatTabsModule,
        MatProgressBarModule
    ]
})

export class MaterialModule {}