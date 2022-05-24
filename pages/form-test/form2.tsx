import { useForm } from "react-hook-form";

// 코드 줄이기
// validation을 더 잘하기
// 에러 (set, clear, display)
// have control over inputs
// 더이상 이벤트에 신경 안쓰기
// easier inputs

export default function Forms() {
  // react from hook사용 했을 때
  // 우리가 원하는건 전부 useForm에서 나온다 !
  // 밑에 register함수는 input과 state를 연결시켜주는 역할을 함
  const { register, watch, handleSubmit } = useForm();
  // console.log(register)
  // {...register("username")} -> name="username" onChange="....."..... form.tsx 에서
  // value = { username };
  // onChange = { onUsernameChange };   이거랑 같다 !

  // 또한!! register에서 required를 이용하기 onSubmit={handleSubmit(onValid)} 해야함 !
  //  {...register("username", {
  //     required: true
  //   })} 포커스까지 해준다 !

  const onValid = () => {
    console.log("onvalid");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        // {...register("username")}
        {...register("username", {
          required: true,
        })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register("email", { required: true })}
        type="email"
        placeholder="Email"
      />
      <input
        {...register("password", { required: true })}
        type="password"
        placeholder="Password"
      />
      <input {...register("submit")} type="submit" value="Create Account" />
    </form>
  );
}
