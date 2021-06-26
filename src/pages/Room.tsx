import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import '../styles/rooms.scss';

type RoomParams = {
  id: string;
};

export function Room() {
  const params = useParams<RoomParams>();
  const { id } = params;

  const { user } = useAuth();

  const { questions, title } = useRoom(id);

  const [question, setQuestioin] = useState('');

  const handleCreateQuestion = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (question.trim() === '') return;

      if (!user) {
        alert('Opa, parece que você não está logado...');
      }

      const questionMonted = {
        content: question,
        author: {
          name: user?.name,
          avatar: user?.avatar,
        },
        isHighlighted: false,
        isAnswered: false,
      };

      await database.ref(`rooms/${id}/questions`).push(questionMonted);
    } finally {
      setQuestioin('');
    }
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />

          <RoomCode code={id} />
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>

          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleCreateQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            value={question}
            onChange={(event) => setQuestioin(event.target.value)}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login.</button>
              </span>
            )}

            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>

        <div className="question-list">
          {questions.map((question) => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
