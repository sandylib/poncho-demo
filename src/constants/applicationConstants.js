export const APP_URL  = `/api/v1/create`;

export const APP_ERROR_MESSAGE = {
  NAME: 'please enter at least 3 characters',
  AGE: 'please select valid DOB (age should between 1 to 120)',
  SALARY: 'please enter at least 3 digit number'
}

export const INITIAL_STATE = {
  name: '',
  age: '',
  salary: ''
}

export const INITIAL_ERRRORS = {
 name: false,
 age: false,
 salary: false
}