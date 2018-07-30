import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';

@inject(Router)
export class Panel {    
  message: string;
    
  constructor(private router:Router) {
    this.message = 'Hello world';
  }


}
