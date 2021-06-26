import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '../components/Button';

import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';

import { database } from '../services/firebase';

export function Home() {
  const history = useHistory();
  const { signInWithGoogle, user } = useAuth();

  const [roomCode, setRoomCode] = useState('');

  const handleCreateRoomWithGoogle = async () => {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  };
  const handleJoinRoom = async (event: FormEvent) => {
    event.preventDefault();
    if (roomCode.trim() === '') {
      return;
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Nenhuma sala com esse código encontrada!');
      return;
    }

    if (roomRef.val().deleted_at) {
      alert('Está sala já foi finalizada.');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  };

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
          <button className="create-room" onClick={handleCreateRoomWithGoogle}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className={'separator'}>ou entre em um sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
