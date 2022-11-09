import Box from "@mui/material/Box";
import MainLayout from "./layouts/MainLayout";

export default function App() {
  return (
    <MainLayout>
      <Box sx={{ width: "100%", marginTop: "80px" }}>
        {/* {!user ? <UserNotLogged /> : <HomeContainer />} */}
      </Box>
    </MainLayout>
  );
}
