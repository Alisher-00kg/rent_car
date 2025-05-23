import { Outlet } from "react-router-dom";
import { AdminHeader } from "../components/header/admin/AdminHeader";
import styled from "styled-components";
import ScrollToTop from "../components/UI/scroll-to-top/ScrollToTop";

export const AdminLayout = () => {
  return (
    <>
      <ScrollToTop />
      <div>
        <AdminHeader />
        <StyledOutletWrapper>
          <Outlet />
        </StyledOutletWrapper>
      </div>
    </>
  );
};
const StyledOutletWrapper = styled.div`
  padding: 0px 40px;
  margin-top: 130px;
`;
