import { MouseEvent, useEffect, useState } from "react";
import AuthenticationService from "@/services/AuthenticationService";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<unknown | null>(null);
  const [input, setInput] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (errors !== null) {
      console.log(errors);

      alert(errors);
    }
  }, [errors]);

  const handlesubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    try {
      setInput({
        email: z.string().email().parse(email),
        password: z.string().min(3).parse(password),
      });
      setErrors(null);
      console.log(input);
      const requestData = {
        email: email,
        password: password,
      };
      AuthenticationService.login(requestData).then((response) => {
        console.log(response);
        navigate("/");
        window.location.reload();
      });
    } catch (error) {
      console.log("1");

      if (error instanceof Error && error.name === "ZodError") {
        setErrors(error);
      } else {
        throw error;
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center min-h-[93.5vh]">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Library LIB
              </h2>

              <p className="max-w-3xl mt-3 text-gray-300 text-md">
                At our library, we pride ourselves on our diverse collection of
                genres and topics. From classic literature to contemporary
                fiction, gripping mysteries to heartwarming romances, our
                shelves are filled with treasures waiting to be discovered.
                Explore the depths of history, unravel thrilling mysteries, or
                immerse yourself in fantastical realms—all within the pages of
                our carefully curated books.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <img className="h-12" src="/logo.png" alt="" />
              </div>

              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Sign in to access your account
              </p>
            </div>

            <div className="mt-8">
              <form>
                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@example.com"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-gray-600 dark:text-gray-200">
                      Password
                    </label>
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <button
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    onClick={(e) => handlesubmit(e)}
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">
                Don&#x27;t have an account yet?{" "}
                <Link
                  to="/signup"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Sign up
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
