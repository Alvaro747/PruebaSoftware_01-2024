import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./hooks/useAuth.hook";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<></>}>
            <Route index element={<></>} />
          </Route>
          <Route path="/auth" element={<></>}>
            <Route index element={<></>} />
            <Route path="login" element={<></>} />
            <Route path="logout" element={<></>} />
            <Route path="lock-screen" element={<></>} />
          </Route>
          <Route path="/admin" element={<></>}>
            <Route index element={<></>} />
            <Route path="account">
              <Route index path="overview" element={<></>} />
              <Route path="profile" element={<></>} />
            </Route>

            <Route path="user">
              <Route path="management" element={<></>} />
              <Route path="detail/:id" element={<></>} />
            </Route>

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
