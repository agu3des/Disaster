import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatBadgeModule } from "@angular/material/badge";
import { MatInputModule } from "@angular/material/input";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { LayoutModule } from "./layout/layout.module";
import { DesastreModule } from "./desastre/desastre.module";
import { provideHttpClient } from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatBadgeModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        LayoutModule,
        DesastreModule,
    ],
    providers: [
        provideAnimationsAsync(),
        provideHttpClient()
    ],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }