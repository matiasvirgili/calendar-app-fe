import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarPage } from "../calendar/pages/CalendarPage";

export const AppRouter = () => {
  const authStatus = "Not-authenticated";
  return (
    <Routes>
      {authStatus === "authenticated" ? (
        <Route path="/auth/*" element={<LoginPage></LoginPage>}></Route>
      ) : (
        <Route path="/*" element={<CalendarPage></CalendarPage>}></Route>
      )}

      <Route path="/*" element={<Navigate to="/auth/login"></Navigate>}></Route>
    </Routes>
  );
};
