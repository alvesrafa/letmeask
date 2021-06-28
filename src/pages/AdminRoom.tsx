import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

import '../styles/rooms.scss';
import { database } from '../services/firebase';

type AdminRoomParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<AdminRoomParams>();
  const { id } = params;

  const history = useHistory();

  const { user } = useAuth();

  const { questions, title } = useRoom(id);

  async function handleCheckQuestion(questionId: string) {
    await database.ref(`rooms/${id}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlight(questionId: string) {
    await database.ref(`rooms/${id}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }
  const handleEndRoom = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${id}`).update({
        deleted_at: new Date(),
      });

      history.push('/');
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${id}/questions/${questionId}`).remove();
    }
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />

          <div>
            <RoomCode code={id} />
            <Button outline onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>

          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestion(question.id)}
                  >
                    <img
                      src={checkImg}
                      alt="marcar pegunta como respondida"
                      title="marcar pegunta como respondida"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHighlight(question.id)}
                  >
                    <img
                      src={answerImg}
                      alt="Dar destque à pergunta"
                      title="Dar destque à pergunta"
                    />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img
                  src={deleteImg}
                  alt="Remover pergunta"
                  title="Remover pergunta"
                />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}
