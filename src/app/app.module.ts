import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import {
  ImageUploadWithPreviewComponent /*AppComponent*/
} from "./app.component";

@NgModule({
  declarations: [ImageUploadWithPreviewComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [ImageUploadWithPreviewComponent]
})
export class AppModule {}
