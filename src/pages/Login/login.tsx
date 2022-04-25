import { useForm } from "react-hook-form";
import { useState  } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button} from "@mui/material";
import "./login.scss";


//  Redux
import * as loginReducers from "../../redux/reducers/loginSlice"
import { useAppDispatch } from "../../redux/hooks";


export default function Login() {
  const redirect = useNavigate();
  const dispatch = useAppDispatch()
  const { handleSubmit, register } = useForm<FormInput>();
  const [isPending,setIsPending] = useState(false)
  const [error, setError] = useState("")

  interface FormInput {
    email: string;
    password: string;
  }


  const onSubmit = async (data: FormInput) => {
    setError("")
    setIsPending(true)
    fetch('http://localhost:8000/users').
      then(res => {
        if(!res.ok) {
          setError("Error Occured (???) --> invalid address");
          setIsPending(false)
        }
        return res.json()
      }).
      then(resData => {
        for( let user of resData){
          if(user.email == data.email && user.password == data.password){
              dispatch(loginReducers.login({user , auth: true}))
              console.log("LOGIN is SUCCESFUL")
              // FOR VISUALS
              setTimeout(()=>{
                setIsPending(false)
                setError("Login Succesful")
                redirect("/profile")
              },1000)
              return
            }
          }
        // FOR VISUALS
          setTimeout(()=>{
            setError("Email or Password is incorrect!")
            dispatch(loginReducers.login({user:{ }, auth: false}))
            setIsPending(false)
              },1000)
      }).catch((err)=>{console.log(err);})
      console.log("Done"); //it's for tests
    };

  return (
    <div className="Login">
      {error && <div> {error} </div>}
      <h3>Login</h3>
      <form onSubmit={handleSubmit(onSubmit)} data-testid={"login-form"}>
        <TextField 
          required 
          label="Mail/Username" 
          variant="outlined"  
          type={"email"}
           margin="normal"
          {...register("email")}
          data-testid={"email-input"}
        />
         <TextField
          required 
          variant="outlined"  
          label="Password"
          type={"password"}
           margin="normal"
          {...register("password")}
          data-testid={"pwd-input"}
        />

        <div>
          {isPending && <div> LOADING....</div>}
          {!isPending && 
              <>
                <Button 
                  variant="contained" 
                  type={"submit"} 
                  data-testid={"submit-btn"}>
                    Login
                </Button>
                <Button variant="contained" onClick={(e) => {
                      e.preventDefault();
                      redirect("/register")
                    }}>Register</Button>
              </>}
        </div>
      </form>
    </div>
  );
}
