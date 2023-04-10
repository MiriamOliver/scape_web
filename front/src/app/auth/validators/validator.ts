import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


const confirmarPasswd = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    console.log(value);
    if(value.passwd == value.passwdConf){

      console.log(value.passwd);
      console.log('------------')
      console.log(value.passwdConf);
    }else{
      console.log('falso');
    }

    return (value.passwd == value.passwdConf) ? { confirmarPasswd: true } : null;
  }
}

export {
  confirmarPasswd
}
