'use client';

import { useEffect } from 'react';
import { useQuery, useSubscription, gql } from '@apollo/client';
import { useAuthStore } from '../store/useAuthStore';
import CommentForm from '../components/CommentForm';

// Определяем тип для комментария
interface CommentType {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
  };
}

const GET_COMMENTS = gql`
  query GetComments($contentType: String!, $contentId: ID!) {
    comments(contentType: $contentType, contentId: $contentId) {
      id
      content
      user {
        id
        username
      }
      createdAt
    }
  }
`;

const COMMENT_ADDED = gql`
  subscription CommentAdded($contentType: String!, $contentId: ID!) {
    commentAdded(contentType: $contentType, contentId: $contentId) {
      id
      content
      user {
        id
        username
      }
      createdAt
    }
  }
`;

interface Props {
  contentType: string;
  contentId: string;
}

export default function CommentSection({ contentType, contentId }: Props) {
  const { isAuthenticated } = useAuthStore();
  const { data, loading, error, refetch } = useQuery(GET_COMMENTS, {
    variables: { contentType, contentId },
    skip: !contentType || !contentId,
  });

  const { data: subscriptionData } = useSubscription(COMMENT_ADDED, {
    variables: { contentType, contentId },
    skip: !contentType || !contentId,
  });

  useEffect(() => {
    if (subscriptionData) {
      refetch();
    }
  }, [subscriptionData, refetch]);

  if (loading) return <div className="text-center py-4">Загрузка комментариев...</div>;
  if (error) return <div className="text-center py-4 text-red-600">Ошибка загрузки комментариев</div>;

  const comments = data?.comments || [];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Комментарии</h2>
      
      {isAuthenticated() ? (
        <CommentForm 
          contentType={contentType} 
          contentId={contentId}
          onCommentAdded={() => refetch()}
        />
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
          Войдите, чтобы оставить комментарий
        </div>
      )}

      <div className="space-y-4 mt-6">
        {comments.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Пока нет комментариев. Будьте первым!
          </div>
        ) : (
          comments.map((comment: CommentType) => (
            <div key={comment.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="font-semibold">{comment.user.username}</div>
                <div className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleString('ru-RU')}
                </div>
              </div>
              <div className="text-gray-700">{comment.content}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}