import { useForm } from "react-hook-form";

// Less code (end)
// Better validation
// Better Erros (set, clear, display)
// Have control over inputs
// Dont deal with events (end)
// Easier Inputs (end)

export default function Forms() {
  const { register } = useForm();
  return (
    <form>
      <input
        {...register("username")}
        type="text"
        placeholder="Username"
        required
      />
      <input {...register("email")} type="email" placeholder="Email" required />
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        required
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
