import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

import { Button } from '../components/Button';

export function NewRoom() {
  return (
    <div id={'pageAuth'}>
      <aside>
        <img
          src={illustration}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>{`Crie salas de Q&A ao-vivo`}</strong>
        <p>Tire as dpuvidas da sua audiência em temppo-real</p>
      </aside>
      <main>
        <div className={'mainContent'}>
          <img src={logoImg} alt="LetMeAsk" />
          <h2>Criar uma nova sala</h2>

          <form>
            <input type="text" placeholder="Nome da sala" />
            <Button type="submit">Criar na sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente <a href="#">clique aqui</a>{' '}
          </p>
        </div>
      </main>
    </div>
  );
}
