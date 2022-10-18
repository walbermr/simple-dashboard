import { useModal } from "../../hooks/useModal";

import logo from "../../assets/electronLogo.svg";
import { Container, Content } from "./styles";

export function Header() {
  const { OpenNewRegisterProductModal } = useModal();

  return (
    <Container>
      <Content>
        <div>
          <img src={logo} alt="" />
          <h1>simple dashboard</h1>
        </div>
        <button onClick={OpenNewRegisterProductModal}>new product</button>
      </Content>
    </Container>
  );
}
