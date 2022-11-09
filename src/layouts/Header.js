import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from "../images/front-academy-logo.png";

const Header = () => {
  return (
    <Box flexGrow="1">
      <AppBar position="static" sx={{ backgroundColor: "#0a0a0a" }}>
        <Toolbar>
          <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" width="100%">
            <img
              width="190px"
              src={logo}
              style={{ marginRight: 20 }}
              alt="todo list logo"
            />

            <Box justifySelf="center">
              <Typography variant="h6">Todo List</Typography>
            </Box>

            <div />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
