import { Outlet, useSubmit } from "react-router-dom";


import MainNavigationPage from "../components/MainNavigation";
import { getAuthToken } from "../util/auth";
import { useEffect } from "react";


export default function RootLayout() {
  const submit = useSubmit();
  const token = getAuthToken();

  useEffect(() => {
    if (token === "EXPIRED") {
      submit(null, { method: "post", action: "/logout" });
    }
  }, [token, submit]);

  return (
    <>
      <MainNavigationPage />
      <main>
        <Outlet />
      </main>
    </>
  )
};
