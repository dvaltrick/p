import { Router } from 'aurelia-router';
import { User } from 'models/user';
import { CloudService } from './../services/cloudservice';
import { inject } from "aurelia-framework";

@inject(CloudService, Router)
export class Recovery {    
  message: string;
  hash: string = "";
  user: User;
  newPassword: string;

  constructor(private service:CloudService, private router:Router) {
    this.message = 'Hello world';
  }

  activate(params){
    this.hash = params.hash;

    if(this.hash.length == 0){
      this.router.navigate('/');
    }

    this.Load();
  }

  public Load(){
    this.service.GetUserToRecovery(this.hash).then(
      data => {
        console.log(data);
        if(data.statusCode == 204){
          this.router.navigate('/');
        }
        this.user = <User>data.content;
      }
    ).catch(
      ret => {
        this.router.navigate('/');
      }
    );
  }

  public ChangePassword(){
    this.user.accessKey = this.newPassword;
    this.service.PutUser(this.user).then(
      data => {
        this.router.navigate('/');
      }
    );
  }
}
