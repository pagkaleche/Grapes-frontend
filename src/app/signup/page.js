"use client";

import { useAppDispatch } from "@/store/store";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { APIService } from "@/lib/APIService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setToken } from "@/store/authSlice";

function SignUp() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const apiService = new APIService();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      throw new Error('no email or password');
    }

    try {
      let registrationResponse = await apiService.Auth.register(email, password);
      console.log(registrationResponse);

      let authenticationResponse = await apiService.Auth.login(email, password);
      dispatch(setToken(authenticationResponse.token));
      router.push("/");
    }
    catch (exc) {
      console.error(exc);
      throw exc;
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="/images/logo.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white-900">
            Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-white-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  onChange={(e) => { setEmail(e.target.value)}}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-white-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  onChange={ (e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-200 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already a member?{" "}
            <a
              href="/log-in"
              className="font-semibold text-gray-500 hover:text-gray-200"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </>
  );
}


export default function Root() {
  return (
    <Provider store={store}>
      <SignUp />
    </Provider>
  );
}
