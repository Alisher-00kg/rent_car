import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  styled,
} from "@mui/material";
import { Icons } from "../../assets";
import { faqData } from "../../utils/constants/faqData";

const AccordionItem = ({
  question,
  answer,
  isExpanded,
  onChange,
  index,
  numberOfList,
}) => (
  <>
    {index === 0 && <div />}
    <StyledAccordion expanded={isExpanded} onChange={onChange}>
      <StyledAccordionSummary
        expandIcon={
          isExpanded ? (
            <Icons.ArrowToFaqDown
              style={{
                fill: "#7E52FF",
              }}
            />
          ) : (
            <Icons.ArrowToFaqDown
              style={{
                fill: "#7E52FF",
              }}
            />
          )
        }
      >
        <span className="number">{numberOfList}</span>
        <h2>{question}</h2>
      </StyledAccordionSummary>
      <AccordionDetails>
        <StyledH3>{answer}</StyledH3>
      </AccordionDetails>
    </StyledAccordion>
  </>
);

export const FaqInfo = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <StyledArticle>
      <WrapperFooter>
        <StyledFAQ>
          <StyledTypography>Часто задаваемые вопросы:</StyledTypography>
        </StyledFAQ>
        <StyledMain>
          <StyledH1>
            <StyledFAQContainer>
              {faqData.map((item, index) => (
                <AccordionItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isExpanded={expanded === `panel${index + 1}`}
                  onChange={handleChange(`panel${index + 1}`)}
                  panel={`panel${index + 1}`}
                  index={index}
                  numberOfList={item.id}
                />
              ))}
            </StyledFAQContainer>
          </StyledH1>
        </StyledMain>
      </WrapperFooter>
    </StyledArticle>
  );
};

const StyledTypography = styled("h2")({
  fontWeight: "600",
  fontSize: "2.5rem",
});

const StyledArticle = styled("article")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  color: "#000",
});

const WrapperFooter = styled("div")({
  maxWidth: "100%",
  padding: "0 2rem",
});

const StyledMain = styled("div")({
  width: "100%",
});

const StyledH3 = styled("p")({
  color: "#7E52FF",
  fontWeight: "400",
  fontSize: "1.125rem",
});

const StyledH1 = styled("div")({
  cursor: "pointer",
  width: "100%",
  maxWidth: "81rem",
});

const StyledAccordion = styled(Accordion)({
  borderRadius: "12px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
  paddingTop: "1.8rem",
  "&::before": {
    display: "none",
  },
});

const StyledFAQ = styled("div")({
  paddingLeft: "32px",
  paddingTop: "7rem",
  paddingBottom: "2rem",
});

const StyledAccordionSummary = styled(AccordionSummary)({
  color: "#000",
  position: "relative",
  "& h2": {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginLeft: "50px",
    paddingBottom: "20px",
  },
  "& .number": {
    position: "absolute",
    top: "5px",
    width: "40px",
    height: "40px",
    fontSize: "18px",
    fontWeight: "600",
    borderRadius: "50px",
    background: "#7E52FF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
});

const StyledFAQContainer = styled("div")({
  width: "100%",
  maxWidth: "90rem",
  overflow: "hidden",
  padding: "0 2rem",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});
