import React, { useState } from "react";
import AuthenticationService from "@/services/AuthenticationService";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}
enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(Role.USER);
  const [gender, setGender] = useState<Gender>(Gender.FEMALE);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === Gender.MALE) {
      setGender(Gender.MALE);
    } else if (event.target.value === Gender.FEMALE) {
      setGender(Gender.FEMALE);
    } else if (event.target.value === Gender.OTHER) {
      setGender(Gender.OTHER);
    }
  };

  const handlesubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const requestData = {
      email: email,
      password: password,
      role: role,
      firstName: firstName,
      lastName: lastName,
      contactNo: phone,
      address: "",
      noOfBooksLoan: 0,
      gender: gender,
    };
    AuthenticationService.register(requestData).then((response) => {
      console.log(response);
      navigate("/");
      window.location.reload();
    });
  };

  return (
    <section className="bg-white">
      <div className="flex justify-center min-h-[93.5vh]">
        <div
          className="hidden bg-cover lg:block lg:w-2/5"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')",
          }}
        ></div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize">
              Get your free account now.
            </h1>

            <p className="mt-4 text-gray-500">
              Let’s get you all set up so you can verify your personal account
              and begin setting up your profile.
            </p>

            <div className="mt-6 flex flex-col md:flex-row justify-between">
              <div>
                <h1 className="text-gray-500">Select type of account</h1>

                <div className="mt-3 md:flex md:items-center md:-mx-2">
                  <button
                    className={cn(
                      "flex focus:border-blue-400 hover:ring-blue-400 hover:ring hover:ring-opacity-40 justify-center w-full px-6 py-3 text-white bg-blue-500 rounded-lg md:w-auto md:mx-2 hover:outline-none",
                      {
                        "bg-blue-500": role === Role.ADMIN,
                        "bg-gray-300": role !== Role.ADMIN,
                      }
                    )}
                    onClick={() => setRole(Role.ADMIN)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                    <span className="mx-2">admin</span>
                  </button>

                  <button
                    className={cn(
                      "flex  focus:border-blue-400 hover:ring-blue-400 hover:ring hover:ring-opacity-40 justify-center w-full px-6 py-3 mt-4 text-white border rounded-lg md:mt-0 md:w-auto md:mx-2 hover:outline-none",
                      {
                        "bg-blue-500": role === Role.USER,
                        "bg-gray-300": role !== Role.USER,
                      }
                    )}
                    onClick={() => setRole(Role.USER)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>

                    <span className="mx-2">user</span>
                  </button>
                </div>
              </div>
              <div className="md:w-[58%]">
                <div className="mt-4 md:mt-0 md:ml-[4rem] ">
                  <label className="text-gray-500">Select Gender</label>
                  <div className="mt-3 py-1 text-gray-600 rounded-lg md:w-auto">
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue={"FEMALE"}
                      name="radio-buttons-group"
                      style={{ display: "flex", flexDirection: "row" }}
                      onChange={handleGenderChange}
                    >
                      <FormControlLabel
                        value={Gender.FEMALE}
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value={Gender.MALE}
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value={Gender.OTHER}
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>

            <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm text-gray-600">
                  First Name
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="John"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 ">
                  Last name
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Snow"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600">
                  Phone number
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  placeholder="XXX-XX-XXXX-XXX"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600">
                  Email address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="johnsnow@example.com"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600">
                  Confirm password
                </label>
                <input
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className={cn(
                    "block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40",
                    {
                      "border-red-400 ring-red-400 outline-none ring ring-opacity-40 focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40":
                        passwordConfirm !== password,
                    }
                  )}
                />
              </div>

              <button
                className="flex col-span-2 justify-center items-center w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                onClick={(e) => handlesubmit(e)}
              >
                <span>Sign Up </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className=" ml-2 w-5 h-5 rtl:-scale-x-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="col-span-2 flex justify-center">
                <p className="text-sm text-center text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                  >
                    Login
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
