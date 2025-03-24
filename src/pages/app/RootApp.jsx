import { Outlet } from "react-router-dom";


export default function RootApp() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  )
};