import { useRef } from 'react';
import classes from './ProfileForm.module.css';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const newPasswordRef=useRef(null);
  const authCtx=useContext(AuthContext)

  const submitHandler=(event)=>{
    event.preventDefault();
    const enteredPassword=newPasswordRef.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD0XCaT6bzwmQCIeY3UOurg8eECwDb2s6Q',
      {
        method:'POST',
        body:JSON.stringify(
          {idToken:authCtx.token,
          password:enteredPassword,
          returnSecureToken:true
        }),
        headers:{
          'Content-Type':'application/json',
        }

    }).then(res=>{
      console.log("success");
    })

  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={newPasswordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
