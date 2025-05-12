import { Outlet } from "react-router-dom";
import { AdminHeader } from "../components/header/admin/AdminHeader";
import styled from "styled-components";

export const AdminLayout = () => {
  return (
    <div>
      AdminLayout
      <AdminHeader />
      <StyledOutletWrapper>
        <Outlet />
      </StyledOutletWrapper>
    </div>
  );
};
const StyledOutletWrapper = styled.div`
  padding: 0px 40px;
  margin-top: 120px;
`;
