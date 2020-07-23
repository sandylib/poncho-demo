import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Input from '../../components/Input/Input';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Loading} from '../../components/Loading/Loading';
import {APP_URL, APP_ERROR_MESSAGE, INITIAL_ERRRORS, INITIAL_STATE } from '../../constants/applicationConstants';
import {regexAge, regexStr, regexNum, getAge, delay} from '../../utils/help';
import { useStyles } from '../../utils/multiHelp';
import request from '../../utils/request';
import Logo from '../../poncho-insurance-logo.svg'

export default function Create() {
  const classes = useStyles();
  const [userId, setUserId] = useState(null);
  const [inprogress, setInprogress] = useState(false);
  const [values, setValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState(INITIAL_ERRRORS);
  const onChange = (id, value) => {
      switch (id) {
        case 'salary':
          setErrors({
            ...errors,
            [id]: !regexNum.test(value)
          })
          break;
        case  'age':
          const ageValue = getAge(value)
          setErrors({
            ...errors,
            [id]: !regexAge.test(ageValue)
          });
          break;
        case 'name':
          setErrors({
            ...errors,
            [id]: !regexStr.test(value)
          })
          break;
      }
      setValues({
        ...values,
        [id]: value
      })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setInprogress(true);
      const options = {
        method: 'POST', 
        body: JSON.stringify({...values, age: getAge(values['age']), salary: Number(values['salary'])}),
      };
      await delay(300);
      const data = await request(APP_URL, options);
      if(data && data.userId){
        setUserId(data.userId);
      }
      setValues(INITIAL_STATE);
      setErrors(INITIAL_ERRRORS)
      setInprogress(false);

    } catch (error) {
      throw error;
    } finally {
      setUserId(uuidv4());
      setValues(INITIAL_STATE);
      setErrors(INITIAL_ERRRORS)
      setInprogress(false);

    }
  
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
         <img src={Logo} alt="logo" /> 
        </Typography>
        {userId && <Typography component="p" variant="p">
         {userId}
        </Typography>}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input 
                data-testid={`input-name`}
                disabled={inprogress}
                errorMessage={APP_ERROR_MESSAGE.NAME}
                error={errors.name}
                id={'name'}
                value={values.name}
                label={'Name'}
                placeholder='Name'
                onChange={onChange}
                autoComplete="name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
            <Input 
                data-testid={`input-age`}
                type="date"
                disabled={inprogress}
                errorMessage={APP_ERROR_MESSAGE.AGE}
                error={errors.age}
                id={'age'}
                label={'DOB'}
                value={values.age}
                onChange={onChange}
                autoComplete="age"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{inputProps: { min: "1900-05-01", max: "2020-01-01"} }}
                
              />
            </Grid>
            <Grid item xs={12}>
              <Input 
                  data-testid={`input-salary`}
                  disabled={inprogress}
                  errorMessage={APP_ERROR_MESSAGE.SALARY}
                  error={errors.salary}
                  id={'salary'}
                  label={'Salary'}
                  value={values.salary}
                  placeholder='Salary'
                  onChange={onChange}
                  autoComplete="salary"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
            </Grid>
          </Grid>
          <Button
            type="submit"
            onClick={onSubmit}
            disabled={inprogress || Object.keys(errors).some((key)=> errors[key]) || Object.keys(values).some( (key) => key !== 'age' && values[key].length === 0 )}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>
        </form>
      </div>
      {inprogress && <Loading />}
    </Container>
  );
}