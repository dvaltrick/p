import { inject } from "aurelia-framework";
import {DialogController} from 'aurelia-dialog';
import { CloudService } from "services/cloudservice";

@inject(DialogController, CloudService)
export class EmailDialog {
  email: string;

  constructor(private dialogController:DialogController, private service:CloudService) {  
  }

  public Send(){
    console.log(this.email);
    this.service.GetAccess(this.email).then(
      data => {
        console.log(data);
        this.dialogController.ok(); 
      }     
    );

  }
}
