import React, { useEffect, useState } from "react";
import css from "./register.module.scss";
import Input from "../../components/input";
import { useForm } from "react-hook-form";
import {
  emailValidation,
  firstnameValidation,
  lastnameValidation,
  passwordValidation,
} from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import addNewUser from "../../redux/action/addNewUser";
import Loading from "../../components/loading";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { reg } = useSelector((state) => state?.registerData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const navigate = useNavigate();

  const handleRegister = () => {
    console.log("njfuhvrkf",{
      lastName,
      firstName,
      email,
      password,
    })
    if (email && password) {
      dispatch(
        addNewUser({
          lastName,
          firstName,
          email,
          password,
        })
      ).then((_) => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
      });
    }
  };
  
  useEffect(() => {
    dispatch(addNewUser());
  }, []);

  useEffect(() => {
    if (reg && reg.message === "Successfully registered") {
      navigate(`/admin-sign-in`);
    }
  }, [navigate, reg]);

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <Loading />
      <div className={css.registerContainer}>
        <h1>Create a new account</h1>
        <div className={css.firstName}>
          <Input
            type="text"
            value={firstName}
            register={register("firstname", firstnameValidation)}
            placeholder="Name"
            errors={errors?.firstname?.message}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div className={css.lastName}>
          <Input
            type="text"
            value={lastName}
            placeholder="Lastname"
            register={register("lastname", lastnameValidation)}
            errors={errors?.lastname?.message}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div className={css.email}>
          <Input
            type="text"
            value={email}
            placeholder="Email"
            register={register("email", emailValidation)}
            errors={errors?.email?.message}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className={css.password}>
          <Input
            type="text"
            value={password}
            placeholder="Password"
            register={register("password", passwordValidation)}
            errors={errors?.password?.message}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <Button variant="contained" size="small" onClick={handleRegister}>
          Sign up
        </Button>
      </div>
    </form>
  );
};

export default Register;
