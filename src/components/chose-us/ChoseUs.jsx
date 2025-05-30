import { styled } from "@mui/material";
import { Icons } from "../../assets";

const ChoseUs = () => {
  return (
    <StyledDiv>
      <h2>Почему нужно выбрать нас?</h2>
      <div className="container">
        <StyledItem>
          <Icons.Progress />
          <p>Новый и ухоженный автопарк</p>
        </StyledItem>
        <StyledItem>
          <Icons.Location />
          <p>На месте когда и где нужно</p>
        </StyledItem>
        <StyledItem>
          <Icons.Warning />
          <p>Саблюдаем дорожные правила и этикет</p>
        </StyledItem>
      </div>
    </StyledDiv>
  );
};

export default ChoseUs;
const StyledDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "70px",
  "& h2": {
    color: "#281677f1",
    fontSize: "42px",
  },
  "& .container": {
    width: "100%",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

const StyledItem = styled("div")({
  padding: "0px 25px",
  width: "322px",
  height: "192px",
  borderRadius: "12px",
  background: "#1522ad",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  boxShadow: "0px 8px 25px 0px #0000001A",
  "& p": {
    width: "fit-content",
    fontSize: "16px",
    fontWeight: "500",
    color: "#fff902",
    textAlign: "center",
  },
});
