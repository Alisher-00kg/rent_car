import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, styled, Tab } from "@mui/material";

const TabsUi = ({ tabs, onTabChange, activeTab }) => {
  const handleChange = (event, newValue) => {
    onTabChange(newValue);
  };

  return (
    <BoxStyle>
      <TabContext value={activeTab}>
        <ScrollableTabList
          onChange={handleChange}
          aria-label="scrollable auto tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab) => (
            <TabsStyle key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </ScrollableTabList>

        {tabs.map((tab) => (
          <TabPanel key={tab.value} value={tab.value}>
            {tab.content}
          </TabPanel>
        ))}
      </TabContext>
    </BoxStyle>
  );
};

export default TabsUi;
const BoxStyle = styled(Box)(() => ({
  width: "100%",
}));

const ScrollableTabList = styled(TabList)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    overflowX: "auto",
  },
  "& .MuiTabs-flexContainer": {
    display: "flex",
    gap: "20px",
  },

  "& .MuiTabs-indicator": {
    display: "none",
  },
}));
const TabsStyle = styled(Tab)(({ theme }) => ({
  color: "#c4bb15",
  fontFamily: "Inter",
  fontWeight: "500",
  fontSize: "22px",
  textTransform: "inherit",
  cursor: "pointer",
  background: "transparent",
  padding: "0px 0px 6px 0px",
  minHeight: 0,
  lineHeight: 1,
  position: "relative",

  ":hover": {
    color: "#7E52FF",
  },

  ":hover::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "80%",
    height: "2px",
  },

  [theme.breakpoints.down("md")]: {
    fontSize: "18px",
  },

  "&.Mui-selected": {
    color: "black",
    borderBottom: "2px solid red",
  },
}));
