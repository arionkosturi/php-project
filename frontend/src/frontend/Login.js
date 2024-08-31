// @ts-nocheck
import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import { FaOpencart, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useFetchUsers } from "../components/hooks/useFetch";
import axios from "axios";
export default function UserLogin() {
  const [user, saveUser] = useLocalStorage("user", {});
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false, null);
  const { data: users } = useFetchUsers();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: (value) => {
      const { email, password } = value.value;
      const data = {
        endpoint_name: "login",
        email,
        password,
      };

      axios
        .post(`http://localhost/php-project/backend/api.php`, data)
        .then((resp) => {
          if ("message" in resp.data) {
            setAlert(true, {
              message: resp.data,
            });
            // setError(resp.data)
          } else {
            saveUser({ ...resp.data, isLoggedIn: true });
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <section className="container mx-auto">
      <div className="mx-auto max-w-screen-xl py-64 lg:flex  lg:items-center">
        <div className="mx-auto max-w-xl ">
          <h1 className="text-3xl text-center font-extrabold sm:text-5xl">
            <div className="flex gap-4 justify-center ">
              <FaOpencart className="" />
              OnlineSHOP
            </div>

            <strong className="font-extrabold text-center text-red-700 sm:block">
              User Login
            </strong>
          </h1>

          <p className="mx-6 mt-4 sm:text-xl/relaxed text-center">
            Ju lutem vendosni email dhe password per tu loguar
          </p>

          {alert && (
            <div>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>User Error!</AlertTitle>
                <AlertDescription>Kredenciale te gabuara!</AlertDescription>
              </Alert>
            </div>
          )}
          <form
            className="px-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="mt-6 mb-3">
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "email is required"
                      : value.length < 3
                      ? "email must be at least 3 characters"
                      : undefined,
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return (
                      value.includes("error") &&
                      'No "error" allowed in first name'
                    );
                  },
                }}
                children={(field) => {
                  // Avoid hasty abstractions. Render props are great!
                  return (
                    <>
                      <label
                        className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        htmlFor={field.name}
                      >
                        <input
                          autoComplete="off"
                          className="h-10 p-2 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          placeholder="email"
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                          email
                        </span>
                      </label>
                      <p className="text-sm text-red-600 mt-1">
                        {field.state.meta.errors}
                      </p>
                    </>
                  );
                }}
              />
            </div>
            <div>
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Password is required"
                      : value.length < 5
                      ? "Password must be at least 5 characters"
                      : undefined,
                  onChangeAsyncDebounceMs: 100,
                  onChangeAsync: async ({ value }) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return (
                      value.includes("error") &&
                      'No "error" allowed in first name'
                    );
                  },
                }}
                children={(field) => (
                  <>
                    <label
                      htmlFor={field.name}
                      className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        id={field.name}
                        name={field.name}
                        type="password"
                        placeholder="Password"
                        validators={{
                          onChange: () => {},
                        }}
                        className="h-10 p-2 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Password
                      </span>
                    </label>
                    <p className="text-sm text-red-600 mt-1">
                      {field.state.meta.errors}
                    </p>{" "}
                    <p>
                      Nuk ke nje llogari?{" "}
                      <span
                        className="hover:cursor-pointer underline text-blue-700"
                        onClick={() => {
                          navigate("/register");
                        }}
                      >
                        Register
                      </span>
                    </p>
                  </>
                )}
              />
            </div>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <div className="mt-4 gap-4 flex justify-center">
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    className="flex bg-purple-600 hover:bg-purple-500 shadow border py-1 px-2"
                  >
                    {isSubmitting ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                  {/* <Button
                    onClick={() => {
                      navigate("/Register");
                    }}
                    className="flex bg-green-600 hover:bg-green-500 shadow border py-1 px-2"
                  >
                    Register
                  </Button> */}
                  <Button
                    type="reset"
                    onClick={() => {
                      setAlert(false);
                      form.reset();
                    }}
                  >
                    Reset
                  </Button>
                </div>
              )}
            />
          </form>
        </div>
      </div>
    </section>
  );
}
