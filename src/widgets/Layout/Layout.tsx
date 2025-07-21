import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { Header } from "@/widgets/Header/Header";
import { Sidebar } from "@/widgets/Sidebar/Sidebar";

export const Layout = () => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flex={1}>
        <Header />
        <Box p={3}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
