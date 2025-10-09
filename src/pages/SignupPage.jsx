import AuthForm from "../components/AuthForm";

export default function SignupPage() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex items-center justify-center bg-white">
        <AuthForm mode="signup" />
      </div>
      <div className="hidden md:flex flex-1 bg-white items-center justify-center">
        <h1 className="text-6xl font-light leading-snug">
          LISTEN<br />AND<br />ANSWER
          <p className="text-yellow-500 text-base mt-4">Spelling BeeZ</p>
        </h1>
      </div>
    </div>
  );
}
