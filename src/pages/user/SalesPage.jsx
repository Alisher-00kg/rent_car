import styled from "styled-components";
import TabsUi from "../../components/UI/tabs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/UI/card/Card";
import { getAllCars } from "../../store/thunks/allCars";

const secondTab = [
  { value: "standart", label: "Стандарт класс" },
  {
    value: "comfort",
    label: `Комфорт класс`,
  },
  { value: "bisuness", label: "Бизнес класс" },
  { value: "miniven", label: "Минивэны" },
  { value: "SUVs", label: "Внедорожники " },
];

const SalesPage = () => {
  const [activeTab, setActiveTab] = useState("standart");
  const { cars } = useSelector((state) => state.allCars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
  };
  return (
    <StyledWrapper>
      <TabsUi
        tabs={secondTab}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <StyledUl>
        {cars?.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </StyledUl>
    </StyledWrapper>
  );
};

export default SalesPage;
const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 60px 120px 0 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 50px;
  font-weight: 700;
  color: yellowgreen;
`;

const StyledUl = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 50px;
  flex-wrap: wrap;
`;
