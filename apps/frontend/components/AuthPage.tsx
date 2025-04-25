"use client";

export function AuthPage({ isSignup }: { isSignup: boolean }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="grid text-black  space-y-5 p-5 m-2 bg-white rounded">
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button
          onClick={() => {}}
          className="p-2 cursor-pointer bg-gray-400 rounded-2xl"
        >
          {isSignup ? "Signup" : "Login"}{" "}
        </button>
      </div>
    </div>
  );
}
