import { AccessInformation } from './models/accessInformation';
import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';
import { inject } from 'aurelia-framework';

@inject(Router)
export class App {
  message = 'Piero'; 
  access: AccessInformation = new AccessInformation();
  logged:Boolean = false;

  constructor(private router:Router) {
    var ls = JSON.parse(localStorage.getItem('access-information'));
    this.access = <AccessInformation>ls;

    if(this.access && this.access.accessToken.length > 0){
      this.logged = true;
    }
    
  }

  public call(page:string){
    this.router.navigate(page);
  }

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Piero';

    config.options.pushState = true;
    config.options.root = "/piero";
    config.options.hashChange = false;
    config.map([
      {route: '', moduleId: PLATFORM.moduleName('login/login'),   title: 'Login' },
      {route: 'panel', moduleId: PLATFORM.moduleName('panel/panel'), title: 'Painel'},
      {route: 'company', moduleId: PLATFORM.moduleName('companymanager/companymanager'), title: 'Empresa'},
      {route: 'recovery/:hash', moduleId: PLATFORM.moduleName('recovery/recovery'), title:'Recuperação de senha'}
    ]); 

    this.router = router;
  }
}
