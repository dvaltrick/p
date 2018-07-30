import { ValidationController, validateTrigger, ValidationRules, Rule } from 'aurelia-validation';
import { User } from './../models/user';
import { ValidationService } from './../services/validationservice';
import { AccessInformation } from './../models/accessInformation';
import { CloudService } from './../services/cloudservice';
import { Company } from './../models/company';
import { inject, NewInstance } from 'aurelia-framework';

import * as toastr from 'toastr';

@inject(CloudService, ValidationService, NewInstance.of(ValidationController))
export class CompanyManager {    
  EditMode:Boolean = false;
  UserEditMode: Boolean = false;
  Company:Company = new Company();
  Companies:Company[] = [];
  User:User;
  Users: User[] = [];
  access: AccessInformation;
  controller = null;
  baseCompany: Number = 0;
  rules: Rule<{}, any>[][];
  userRules: Rule<{}, any>[][];

  constructor(private service:CloudService, private validation:ValidationService, private sController:ValidationController) {
    this.access = <AccessInformation>JSON.parse(localStorage.getItem('access-information'));
    
    if(this.access.type > 0){
      this.baseCompany = this.access.company;
    }

    this.controller = sController;
    this.controller.validateTrigger = validateTrigger.manual;

    this.rules = ValidationRules
      .ensure('name').required().withMessage("Informe o nome da empresa").minLength(3).withMessage("Tamanho do nome da empresa inválido").rules;
    
    this.userRules = ValidationRules
      .ensure('userName').email().withMessage("Informe um email válido para o usuário")
      .ensure('name').required().withMessage("Informe o nome do usuário")
      .ensure('accessKey').required().withMessage("Informe uma senha para continuar").minLength(8).withMessage("A senha deve possuir 8 ou mais caracteres")
      .rules;
    
    this.Load();
  }

  public New(){
    this.Company = new Company();
    this.Users = [];
    this.EditMode = true;
  }

  public AddUser(){
    this.User = new User();
    this.User.permission = 2;
    this.UserEditMode = true;
  }

  public RemoveUser(user:User){
    this.service.DeleteUser(user).then(
      data => {
        this.service.GetUsersByCompany(this.Company.companyId).then(
          data => {
            this.Users = <User[]>data.content;
            toastr.success('Usuário removido com sucesso');
          }
        );
      }
    );
  }

  public Edit(data:Company){
    this.Company = data;
    this.service.GetUsersByCompany(data.companyId).then(
      data => {
        this.Users = <User[]>data.content;
      }
    );
    this.EditMode = true;
  }

  public Delete(data:Company){
    this.service.DeleteCompany(data).then(
      data => {
        this.Load();
        toastr.success("Empresa removida com sucesso");
      },
      reject => {
        toastr.error("Não foi possível remover a empresa");
      }
    );
  }

  public SaveUser(){
    this.controller.validate({object:this.User, rules:this.userRules}).then(
      result =>{
        if(result.valid){
          if(this.Company.companyId > 0){
            if(this.validation.EmailValidation(this.User.userName.toString())){
              this.User.companyId = this.Company.companyId;
              this.service.PostUser(this.User).then(
                data => {
                  this.Users.push(<User>data.content);
                  this.UserEditMode = false;
                }
              );
            }else{
              toastr.error('Email inválido, verifique e tente novamente');
            }

          }else{
            this.Users.push(this.User);
            this.UserEditMode = false;
          }
        }
      }
    );
  }

  public CancelUser(){
    this.UserEditMode = false;
  }

  public Save(){
    this.controller.validate({object:this.Company, rules:this.rules}).then(
      result =>{
        if(result.valid){
          if(this.Company.companyId > 0){
            this.service.PutCompany(this.Company).then(
              data => {
                this.Load();
                this.EditMode = false;
      
                toastr.success("Empresa atualizada com sucesso");
              },
              reject =>{
                toastr.error("Não foi possível atualizar a empresa");
              }
            );
          }else{
            this.service.PostCompany(this.Company).then(
              data => {
                if(data.content.companyId == undefined){
                  toastr.error("Não foi possível cadastrar a empresa");
                }else{
                  this.Users.forEach(e => {
                    e.companyId = data.content.companyId;
                    this.service.PostUser(e);
                  });
        
                  this.Load();
                  this.EditMode = false;
                  
                  toastr.success("Empresa cadastrada com sucesso");
                }
              },
              reject =>{
                toastr.error("Não foi possível cadastrar a empresa");
              }
            );
          }
        }
      }
    );

    
  }

  public Cancel(){
    this.EditMode = false;
  }

  public Load(){
    this.service.GetCompanies(this.baseCompany).then(
      data => {
        this.Companies = <Company[]>data.content;
      }
    );
  }
}
