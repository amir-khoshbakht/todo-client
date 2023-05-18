import React, { useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import AuthLayout from "./pages/auth/AuthLayout";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ToastContainer from "./components/Notification";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "./redux/store";
import io from "socket.io-client";
import { Button } from "@mui/material";
function SocketTest() {
  
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const a = io("http://localhost:8000", {
    extraHeaders: {
      authorization: `${accessToken}`,
    },
    // transports: ["websocket"],
  });

  const socket = io("http://localhost:8000", {
    extraHeaders: {
      authorization: `${accessToken}`,
    },
    // transports: ["websocket"],
  });
  socket.on("connect", () => {
    socket.emit("client", "this is message is from client");
  });

  a.onAny((t) => {
    console.log(t);
  });

  const handleC = () => {
    socket.emit("message", "this is message is from asdfasdfasdfasdfds");
  };
  return <Button onClick={handleC}>test</Button>;
}

function App() {
  useEffect(() => {
    document.title = "todo client";
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route>
          <Route index element={<Home />} />
        </Route>
        <Route path="auth/register" element={<Register />} />
        <Route path="auth/login" element={<Login />} />
      </Route>
    )
  );

  return (
    <Provider store={store}>
      {/* <SocketTest /> */}
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  );
}

export default App;
