import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Button } from '../components/Button';

import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');

  const history = useHistory();

  const handleCreateRoom = async (event: FormEvent) => {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }
    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
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

          <h2>Criar uma nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar na sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente <Link to="/">clique aqui</Link>{' '}
          </p>
        </div>
      </main>
    </div>
  );
}
