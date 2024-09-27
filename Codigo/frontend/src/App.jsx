import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./hooks/useAuth.hook";
import {LayoutAuth} from "@layouts";
import {Login, Register, Home} from "@pages";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LayoutAuth />} />
          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/dashboard" element={<LayoutAuth />}>
            <Route index element={<Home />} />

            <Route path="*" element={<></>} />
          </Route>
          <Route path="*" element={<></>}>
            <Route path="*" element={<></>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
