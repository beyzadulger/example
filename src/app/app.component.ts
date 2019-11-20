import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";

@Component({
  selector: "app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class ImageUploadWithPreviewComponent implements OnInit {
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  constructor(private http: HttpClient) {}

  urls = new Array<string>();

  ngOnInit() {}

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = _event => {
      this.previewUrl = reader.result;
    };
  }

  onSubmit() {
    const formData = new FormData();
    formData.append("files", this.fileData);

    this.fileUploadProgress = "0%";

    this.http
      .post(
        "https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload",
        formData,
        {
          reportProgress: true,
          observe: "events"
        }
      )
      .subscribe(events => {
        if (events.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress =
            Math.round((events.loaded / events.total) * 100) + "%";
          console.log(this.fileUploadProgress);
        } else if (events.type === HttpEventType.Response) {
          this.fileUploadProgress = "";
          console.log(events.body);
          alert("SUCCESS !!");
        }
      });
  }
}

/*import { Component } from "@angular/core";
//import { HttpClient } from "selenium-webdriver/http";
import { HttpClient, HttpEventType } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
 
  }*/
/*selectedFile: File = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  onUpload() {
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.http
      .post("", fd, {
        reportProgress: true,
        observe: "events"
      })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log(
            "Upload Progress:" +
              Math.round((event.loaded / event.total) * 100) +
              "%"
          );
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
        }
      });
  }*/
