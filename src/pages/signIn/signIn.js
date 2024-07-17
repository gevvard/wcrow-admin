import { useState } from "react";
import { useForm } from "react-hook-form";

import Input from "../../components/input";
import css from "./signIn.module.scss";
import { emailValidation, passwordValidation } from "../../utils/validation";
import { signIn } from "../../redux/action/signIn";
import { useDispatch } from "react-redux";
import Loading from "../../components/loading";
import { Button } from "@mui/material";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(
      signIn({
        password,
        email,
      })
    ).then((_) => {
      setEmail("");
      setPassword("");
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Loading />
      <div className={css.signContainer}>
        <div className={css.title}>
          <h3>Welcome</h3>
        </div>
        <div className={css.userName}>
          <label>Username</label>
          <Input
            type="text"
            register={register("username", emailValidation)}
            errors={errors?.username?.message}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={css.password}>
          <label>Password</label>
          <Input
            type="password"
            register={register("password", passwordValidation)}
            errors={errors?.password?.message}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button variant="contained" size="small" onClick={(e) => onSubmit(e)}>
          Sign In
        </Button>
      </div>
    </form>
  );
};

export default SignIn;
