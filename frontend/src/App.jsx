// App.jsx (must exist)
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCurrentUser, logoutUser } from "./store/authSlice";

export default function App() {
  const dispatch = useDispatch();
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getCurrentUser()).unwrap();
      } catch {
        dispatch(logoutUser());
      } finally {
        setBootstrapped(true);
      }
    })();
  }, [dispatch]);

  if (!bootstrapped) {
    return <div className="fixed inset-0 grid place-items-center">Loading…</div>;
  }

  return <Outlet />;
}