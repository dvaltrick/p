import { EmailDialog } from './../dialog/emaildialog';
import { DialogService } from 'aurelia-dialog';
import { Router } from 'aurelia-router';
import { json } from 'aurelia-fetch-client';
import { AccessInformation } from './../models/accessInformation';
import { CloudService } from './../services/cloudservice';
import { User } from './../models/user';
import { inject } from 'aurelia-framework';

@inject(CloudService, Router, DialogService)
export class Login {    
  message: string;
  login: User;
  access: AccessInformation;

  constructor(private service:CloudService, private router:Router, private dialogService:DialogService) {
    this.message = 'Efetue seu login';
    this.access = new AccessInformation();
    this.login = new User();
  }

  public Login(){
    this.service.Login(this.login).then(
      ret => {
        this.access = ret.content;
        if(this.access.authenticated == true){
          localStorage.setItem('access-information',JSON.stringify(this.access));
          this.router.navigate('company');
        }
      }
    );
  }

  public Open(){
    this.dialogService.open({viewModel:EmailDialog});
  }

} 
