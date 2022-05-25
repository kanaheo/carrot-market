import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
  email: string;
  errors?: string;
}

export default function Forms() {
  // react from hook사용 했을 때
  // 우리가 원하는건 전부 useForm에서 나온다 !
  // 밑에 register함수는 input과 state를 연결시켜주는 역할을 함
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
  } = useForm<LoginForm>({
    mode: "onChange",
  });
  // console.log(register)
  // {...register("username")} -> name="username" onChange="....."..... form.tsx 에서
  // value = { username };
  // onChange = { onUsernameChange };   이거랑 같다 !

  // 또한!! register에서 required를 이용하기 onSubmit={handleSubmit(onValid)} 해야함 !
  //  {...register("username", {
  //     required: true
  //   })} 포커스까지 해준다 !

  const onValid = (data: LoginForm) => {
    console.log("onvalid");
    resetField("password");
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <div>
        <input
          className="bg-yellow-200"
          {...register("username", {
            required: "true",
            minLength: 5,
          })}
          type="text"
          placeholder="Username"
        />
        {errors.username?.message}
      </div>
      <div>
        <input
          className="bg-blue-200"
          {...register("email", {
            required: "Email is required",
            validate: {
              notGmail: (value) =>
                !value.includes("@gmail.com") || "Gmail사용하지마세요 ",
            },
          })}
          type="email"
          placeholder="Email"
        />
        {errors.email?.message}
      </div>
      <div>
        <input
          className="bg-purple-200"
          {...register("password", { required: "Password is required" })}
          type="password"
          placeholder="Password"
        />
      </div>
      <input type="submit" value="Create Account" />
    </form>
  );
}
