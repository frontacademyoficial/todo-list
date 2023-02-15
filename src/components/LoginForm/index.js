import Container from "@mui/material/Container";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const { login, error, loading } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    login({ username: username.value, password: password.value });
  };

  return (
    <Container maxWidth="md">
      <form
        onSubmit={onSubmit}
        style={{
          display: "grid",
          justifyItems: "flex-start",
          gap: "1rem",
        }}
      >
        <TextField name="username" placeholder="username" />
        <TextField name="password" placeholder="password" type="password" />

        <Button loading={true} type="submit" variant="contained">
          Login
        </Button>

        {error && <span style={{ color: "red" }}>{error}</span>}
      </form>

      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}
