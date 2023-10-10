import { useModal } from "../../hooks/useModal";

import logo from "../../assets/electronLogo.svg";
import { Container, Content } from "./styles";

export function Header() {
  const { OpenNewRegisterOperationModal } = useModal();

  return (
    <Container>
      <Content>
        <div>
          <img src={logo} alt="" />
          <h1>simple dashboard</h1>
        </div>
        <button onClick={OpenNewRegisterOperationModal}>new opeation</button>
      </Content>
    </Container>
  );
}
