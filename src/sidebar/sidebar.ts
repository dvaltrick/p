import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";

@inject(Router)
export class Sidebar {    
  message: string;
  
  constructor(private router:Router) {
    this.message = 'Hello world';
  }

  public call(page:string){
    this.router.navigate(page);
  }
}
