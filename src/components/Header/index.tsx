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
        <div>
          <a href="/dashboard"><button>Operações</button></a>
        </div>
        <div>
          <a href="/"><button>Resumo</button></a>
        </div>
        <div>
          <button onClick={OpenNewRegisterOperationModal}>Nova Operação</button>
        </div>
      </Content>
    </Container>
  );
}
