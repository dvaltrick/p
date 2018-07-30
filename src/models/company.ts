import { User } from './user';
import { Rule, ValidationRules } from 'aurelia-validation';

export class Company{
  companyId:Number;
  name:String;
  users: User[];
  rules: Rule<{}, any>[][];

  constructor(){
    this.rules = ValidationRules
    .ensure('name').required().minLength(3).withMessage("Informe o nome da empresa").rules;
  }

}
