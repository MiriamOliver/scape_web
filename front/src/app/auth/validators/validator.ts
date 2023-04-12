import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


const confirmarPasswd = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    return !(value.passwd == value.passwdConf) ? { confirmarPasswd: true } : null;
  }
}

export {
  confirmarPasswd
}
