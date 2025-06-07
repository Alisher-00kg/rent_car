import styled from "styled-components";
import TabsUi from "../../components/UI/tabs";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/UI/card/Card";
import { getAllCars } from "../../store/thunks/allCars";

const secondTab = [
  { value: "", label: "Все" },
  { value: "Стандарт", label: "Стандарт" },
  { value: "Комфорт", label: "Комфорт" },
  { value: "Бизнес", label: "Бизнес" },
  { value: "Минивен", label: "Минивен" },
  { value: "Внедорожник", label: "Внедорожник" },
  { value: "Кроссовер", label: "Кроссовер" },
  { value: "Эконом", label: "Эконом" },
];

const SalesPage = () => {
  const [activeTab, setActiveTab] = useState("");
  const { cars } = useSelector((state) => state.allCars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
  };

  const filteredCars = useMemo(() => {
    if (!activeTab) return cars;
    return cars.filter((car) => car.category === activeTab);
  }, [cars, activeTab]);

  return (
    <StyledWrapper>
      <TabsUi
        tabs={secondTab}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <StyledUl>
        {filteredCars?.map((item) => (
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
`;

const StyledUl = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 50px;
  flex-wrap: wrap;
  padding: 0;
  margin-top: 40px;
`;
