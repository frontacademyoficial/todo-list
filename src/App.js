import Box from "@mui/material/Box";
import MainLayout from "./layouts/MainLayout";
import HomeContainer from "./containers/HomeContainer";

export default function App() {
  return (
    <MainLayout>
      <Box sx={{ width: "100%", marginTop: "80px" }}>
        <HomeContainer />
      </Box>
    </MainLayout>
  );
}
