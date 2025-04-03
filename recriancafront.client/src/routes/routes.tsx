import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import StudentsFormPage from "../pages/alunos/alunos-form";
import EventsFormPage from "../pages/eventos/eventos-form";
import Home from "../pages/home/home";
import SignIn from "../pages/login/signin";
import SignUp from "../pages/login/signup";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./protectedRoutes";
import { AppContainer } from "./styles";

const AppRoutes = () => {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-event"
            element={
              <ProtectedRoute>
                <EventsFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-student"
            element={
              <ProtectedRoute>
                <StudentsFormPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default AppRoutes;
