import { useState } from "react";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PersonIcon from "@mui/icons-material/Person";
import TabPanel from "./TabPanel";
import UserTasks from "../../components/UserTasks";

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const HomeContainer = ({ user }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Container maxWidth="md">
      <AppBar position="static" sx={{ backgroundColor: "#ffffff" }}>
        <Tabs
          value={currentTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChangeTab}
          aria-label="tabs"
          centered
        >
          <Tab label="Minhas Tarefas" icon={<PersonIcon />} {...a11yProps(0)} />
        </Tabs>
      </AppBar>

      <TabPanel value={currentTab} index={0}>
        <UserTasks />
      </TabPanel>
    </Container>
  );
};

export default HomeContainer;
