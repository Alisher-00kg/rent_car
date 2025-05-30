import styled from "styled-components";

const AboutUsPage = () => {
  return <div>
    <AboutSection>
      <Title>О нас</Title>
      <Description>
        <strong>RentCar</strong> — современный сервис аренды автомобилей.
        Мы предоставляем новые авто, прозрачные условия и поддержку 24/7, чтобы ваши поездки были комфортными и безопасными.
      </Description>

      <FeaturesGrid>
        <FeatureCard>
          <span>🚗</span>
          <p>Новый автопарк</p>
        </FeatureCard>
        <FeatureCard>
          <span>📱</span>
          <p>Онлайн-бронирование</p>
        </FeatureCard>
        <FeatureCard>
          <span>💰</span>
          <p>Честные цены</p>
        </FeatureCard>
        <FeatureCard>
          <span>📍</span>
          <p>По всему миру</p>
        </FeatureCard>
      </FeaturesGrid>

      <FinalMessage>RentCar — свобода передвижения начинается здесь.</FinalMessage>
    </AboutSection>
  </div>;
};

export default AboutUsPage;
const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  font-weight: 700;
  color: yellowgreen;
`;
const AboutSection = styled.section`
  max-width: 960px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  text-align: center;
  background: linear-gradient(to bottom, #f9fafb, #fff);
  border-radius: 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #6b7280;
  max-width: 700px;
  margin: 0 auto 2.5rem;
  line-height: 1.8;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.75rem;
  margin-bottom: 3rem;
`;

const FeatureCard = styled.div`
  background: #ffffff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }

  p {
    font-size: 1.05rem;
    font-weight: 500;
    color: #374151;
  }
`;

const FinalMessage = styled.p`
  font-size: 1.35rem;
  font-weight: 700;
  color: #111827;
`;
