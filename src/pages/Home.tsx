import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

import { Button } from '../components/Button';

export function Home() {
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
          <button className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className={'separator'}>ou entre em um sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
