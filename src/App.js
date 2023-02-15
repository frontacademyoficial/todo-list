import Box from "@mui/material/Box";
import HomeContainer from "./containers/HomeContainer";
import LoginForm from "./components/LoginForm";
import MainLayout from "./layouts/MainLayout";

export default function App() {
  const isLoggedIn = false;

  return (
    <MainLayout>
      <Box sx={{ width: "100%", marginTop: "60px" }}>
        {isLoggedIn ? <HomeContainer /> : <LoginForm />}
      </Box>
    </MainLayout>
  );
}
