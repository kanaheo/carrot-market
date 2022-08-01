import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
  });
  const onValid = (data: LoginForm) => {};
  const onInvalid = (errors: FieldErrors) => {};
  return (
    // <form className="mt-10" onSubmit={handleSubmit(onValid, onInvalid)}>
    <form className="mt-10" onSubmit={handleSubmit(onValid)}>
      <div>
        <input
          className="bg-yellow-200"
          {...register("username", {
            required: "Username is required",
            minLength: {
              message: "5글자 이상 입력하세요",
              value: 5,
            },
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
        {errors.password?.message}
      </div>
      <br />
      <input className="border-2" type="submit" value="생성하기" />
    </form>
  );
}
