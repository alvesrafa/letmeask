import { useEffect, useState } from 'react';
import { database } from '../services/firebase';
type QuestionProps = {
  id: string;
  author: {
    avatar: string;
    name: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlight: boolean;
};

type FirebaseQuestions = Record<
  string,
  {
    author: {
      avatar: string;
      name: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlight: boolean;
  }
>;

export function useRoom(id: string) {
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [title, setTitle] = useState('');
  useEffect(() => {
    if (!id) return;

    const roomRef = database.ref(`rooms/${id}`);

    roomRef.on('value', (room) => {
      const roomValues = room.val();

      const firebaseQuestions: FirebaseQuestions = roomValues.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => ({
          id: key,
          content: value.content,
          author: value.author,
          isHighlight: value.isHighlight,
          isAnswered: value.isAnswered,
        })
      );
      setTitle(roomValues.title);
      setQuestions(parsedQuestions);
    });
  }, [id]);

  return { questions, title };
}
