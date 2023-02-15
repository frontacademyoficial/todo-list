import Box from "@mui/material/Box";
import HomeContainer from "./containers/HomeContainer";
import LoginForm from "./components/LoginForm";
import MainLayout from "./layouts/MainLayout";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { isLoggedIn } = useAuth();

  return (
    <MainLayout>
      <Box sx={{ width: "100%", marginTop: "60px" }}>
        {isLoggedIn ? <HomeContainer /> : <LoginForm />}
      </Box>
    </MainLayout>
  );
}
