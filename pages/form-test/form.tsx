import { useState } from "react";

export default function Forms() {
  // react from hook사용 안 했을 때
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [emailError, setEmailError] = useState("");
  const onUsernameChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setUsername(value);
  };
  const onEmailChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setEmailError("");
    setEmail(value);
  };
  const onPasswordChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setPassword(value);
  };
  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    // submit하기전에 고려해야하는것이 너무 많습니다 이메일이 짧으면 .... 유저이름 짧으면... 패스월드 짧으면...
    // 이렇게 스스로 하기가 너무 많고 안하는것도 있을수도 있고 고려해야할게 너무너무 많습니다 !!
    event.preventDefault();
    if (username === "" || email === "" || password === "") {
      setFormErrors("All fields are required");
    }
    if (!email.includes("@")) {
      setEmailError("email is required");
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        className="bg-yellow-200"
        value={username}
        onChange={onUsernameChange}
        type="text"
        placeholder="Username"
        required
        minLength={5}
      />
      {/* 위에서 required, minLength는 크롬 개발자툴에서 지우면 안먹힌다 !!! 즉 이렇게 하면 강력하지 않습니다 !  */}
      <input
        className="bg-blue-200"
        value={email}
        onChange={onEmailChange}
        type="email"
        placeholder="Email"
        required
      />
      {emailError}
      <input
        className="bg-purple-200"
        value={password}
        onChange={onPasswordChange}
        type="password"
        placeholder="Password"
        required
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
