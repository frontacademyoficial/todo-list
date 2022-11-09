import Box from "@mui/material/Box";

const Wrapper = ({ children, className, width = 1000 }) => (
  <Box
    className={className}
    sx={{
      margin: "0 auto",
      maxWidth: `${parseInt(width) + 48}px`,
      padding: "0 24px",
      position: "relative",
    }}
  >
    {children}
  </Box>
);

export default Wrapper;
