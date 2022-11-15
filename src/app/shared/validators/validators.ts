import { AbstractControl } from "@angular/forms";

type Validator = {
  key: string;
  messageError: string;
}

const validators: Validator[] = [
  { key: "required", messageError: "Campo obrigatório." },
  { key: "emailInvalid", messageError: "Email inválido." }
];

export function getMessageError(control: AbstractControl): string {
  for (let error in control.errors ?? []) {
    const validator = validators.find(it => it.key == error);
    if (validator) return validator.messageError;
  }

  return "";
}
