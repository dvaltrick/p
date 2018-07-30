import { Company } from './../models/company';
import { AccessInformation } from './../models/accessInformation';
import { User } from './../models/user';
import { inject } from "aurelia-framework";
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class CloudService {    
  message: string;
  DefaultURL: string = "http://192.168.200.200/pierocloud/api/"; //"https://localhost:44319/api/";
  
  constructor(private httpClient:HttpClient) {
    this.message = 'Hello world';
  }
  
  public Login(user:User) {
    this.httpClient = this.httpClient.configure(
      x =>{
        x.withHeader('content-type','application/json');
      }
    );
    return this.httpClient.post(this.DefaultURL+'login',user);
  }

  public GetCompanies(id:Number){
    var ls =  <AccessInformation>JSON.parse(localStorage.getItem("access-information"));
    console.log(ls);
    var companyFilter = "";

    if(id > 0){
      companyFilter = "/"+id;
    }

    this.httpClient = this.httpClient.configure(
      x =>{
        x.withHeader('content-type','application/json');
        x.withHeader('Authorization','Bearer ' + ls.accessToken.toString());
      }
    );
    return this.httpClient.get(this.DefaultURL+'company'+companyFilter);    
  }

  public GetUserToRecovery(hash:String){
    var ls =  <AccessInformation>JSON.parse(localStorage.getItem("access-information"));
    console.log(ls);
    var companyFilter = "";

    this.httpClient = this.httpClient.configure(
      x =>{
        x.withHeader('content-type','application/json');
      }
    );
    return this.httpClient.get(this.DefaultURL+'user/torecovery/'+hash);    
  }

  public GetAccess(email:String){
    this.httpClient = this.httpClient.configure(
      x =>{
        x.withHeader('content-type','application/json');
      }
    );
    return this.httpClient.get(this.DefaultURL+'login/getaccess/'+email);    
  }

  public GetUsersByCompany(id:Number){
    var ls =  <AccessInformation>JSON.parse(localStorage.getItem("access-information"));
    console.log(ls);

    this.httpClient = this.httpClient.configure(
      x =>{
        x.withHeader('content-type','application/json');
        x.withHeader('Authorization','Bearer ' + ls.accessToken.toString());
      }
    );
    return this.httpClient.get(this.DefaultURL+'user/bycompany/'+id);    
  }

  public DeleteCompany(data:Company){
    var ls =  <AccessInformation>JSON.parse(localStorage.getItem("access-information"));
    console.log(ls);

    this.httpClient = this.httpClient.configure(
      x =>{
        x.withHeader('content-type','application/json');
        x.withHeader('Authorization','Bearer ' + ls.accessToken.toString());
      }
    );

    return this.httpClient.delete(this.DefaultURL+'company/'+data.companyId);
  }

  public DeleteUser(data:User){
    var ls =  <AccessInformation>JSON.parse(localStorage.getItem("access-information"));
    console.log(ls);

    this.httpClient = this.httpClient.configure(
      x =>{
        x.withHeader('content-type','application/json');
        x.withHeader('Authorization','Bearer ' + ls.accessToken.toString());
      }
    );

    return this.httpClient.delete(this.DefaultURL+'user/'+data.userId);
  }

  public PostCompany(data:Company){
    var ls =  <AccessInformation>JSON.parse(localStorage.getItem("access-information"));
    console.log(ls);

    this.httpClient = this.httpClient.configure(
      x =>{
        x.withHeader('content-type','application/json');
        x.withHeader('Authorization','Bearer ' + ls.accessToken.toString());
      }
    );

    return this.httpClient.post(this.DefaultURL+'company',data);
  }

  public PostUser(data:User){
    var ls =  <AccessInformation>JSON.parse(localStorage.getItem("access-information"));
    console.log(ls);

    this.httpClient = this.httpClient.configure(
      x =>{
        x.withHeader('content-type','application/json');
        x.withHeader('Authorization','Bearer ' + ls.accessToken.toString());
      }
    );

    return this.httpClient.post(this.DefaultURL+'user',data);
  }

  public PutUser(data:User){
    var ls =  <AccessInformation>JSON.parse(localStorage.getItem("access-information"));
    console.log(ls);

    this.httpClient = this.httpClient.configure(
      x =>{
        x.withHeader('content-type','application/json');
        x.withHeader('Authorization','Bearer ' + ls.accessToken.toString());
      }
    );

    return this.httpClient.put(this.DefaultURL+'user/recovery',data);
  }

  public PutCompany(data:Company){
    var ls =  <AccessInformation>JSON.parse(localStorage.getItem("access-information"));
    console.log(ls);

    this.httpClient = this.httpClient.configure(
      x =>{
        x.withHeader('content-type','application/json');
        x.withHeader('Authorization','Bearer ' + ls.accessToken.toString());
      }
    );

    return this.httpClient.put(this.DefaultURL+'company',data);
  }
}
