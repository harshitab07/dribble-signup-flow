const validate= values=>{
    const errors={};
    if(!values.name){
        errors.name='Name is required'
    }else if(values.name.length>20){
        errors.name='Name must be 20 characters or less'
    }else if(values.name.length<3){
        errors.name='Name must be 3 characters or more'
    }
    if(!values.username){
        errors.username='Username is required';
    }else if(values.username.length>15){
        errors.username='Username must be 15 characters or less'
    }else if(values.username.length<3){
        errors.username='Username must be 3 characters or more'
    }

    if(!values.email){
        errors.email='Email is required';
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
errors.email='Invalid email address'
    }
    if(!values.password){
        errors.password='Password is required';
    }
    else if (
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+](?=.*\d){6,}/.test(values.password)
      ) {
        errors.password='Password must contains 1 uppercase, 1 lowercase, 1 special symbol,1 number and must be characters long'
      }
      if(values.acceptTerms===false){
        errors.acceptTerms='Please Accept Terms & Conditions'
      }
    return errors;
}
export default validate;