import { useEffect, useRef } from "react";
import { styled } from "@mui/system";
import { useSpring, animated } from "@react-spring/web";
import { partnersSlider } from "../../utils/constants/generals";

export const InfinitySlider = () => {
  const sliderRef = useRef(null);

  const [{ x }, api] = useSpring(() => ({
    x: 0,
    config: { duration: 0 },
  }));

  useEffect(() => {
    const timeout = setTimeout(() => {
      const totalWidth = sliderRef.current.scrollWidth / 2;

      const scroll = () => {
        api.start({
          from: { x: 0 },
          to: { x: -totalWidth },
          config: { duration: 20000, easing: (t) => t },
          onRest: scroll,
        });
      };

      scroll();
    }, 300);

    return () => clearTimeout(timeout);
  }, [api]);

  const items = [...partnersSlider, ...partnersSlider];

  return (
    <StyledAllContainer>
      <StyledContainerName>Наши партнеры</StyledContainerName>
      <SliderContainer ref={sliderRef}>
        <animated.div
          style={{
            display: "flex",
            gap: "5rem",
            transform: x.to((a) => `translateX(${a}px)`),
            willChange: "transform",
          }}
        >
          {items.map((item, index) => (
            <SliderItem key={index}>
              <SliderImage src={item.logo} alt={`Logo ${item.id}`} />
            </SliderItem>
          ))}
        </animated.div>
      </SliderContainer>
    </StyledAllContainer>
  );
};

const StyledAllContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2.8rem;
  width: 100%;
  height: 55vh;
`;

const StyledContainerName = styled("h1")({
  fontSize: "35px",
  fontWeight: "700",
  color: "#281677f1",
});

const SliderContainer = styled("div")({
  overflow: "hidden",
  width: "100%",
  position: "relative",
  whiteSpace: "nowrap",
});

const SliderItem = styled("div")({
  minWidth: "12.5rem",
  margin: "0 0.625rem",
  textAlign: "center",
});

const SliderImage = styled("img")({
  width: "18rem",
  height: "10.2rem",
  objectFit: "contain",
  borderRadius: "12px",
  background: "#fff",
  padding: "10px",
});
