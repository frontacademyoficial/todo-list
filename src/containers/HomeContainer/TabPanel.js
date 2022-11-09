import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box mt={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
