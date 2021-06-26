import { useEffect, useState } from 'react';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';
type QuestionProps = {
  id: string;
  author: {
    avatar: string;
    name: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlight: boolean;
  likeCount: number;
  likeId: string | undefined;
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

    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

export function useRoom(id: string) {
  const { user } = useAuth();

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
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(
            ([key, like]) => like.authorId === user?.id
          )?.[0],
        })
      );

      setTitle(roomValues.title);
      setQuestions(parsedQuestions);
    });

    return () => {
      roomRef.off('value');
    };
  }, [id, user?.id]);

  return { questions, title };
}
