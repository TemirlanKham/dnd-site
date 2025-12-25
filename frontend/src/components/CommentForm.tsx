'use client';

import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_COMMENT = gql`
  mutation AddComment($content: String!, $contentType: String!, $contentId: ID!) {
    addComment(content: $content, contentType: $contentType, contentId: $contentId) {
      id
      content
      createdAt
    }
  }
`;

interface Props {
  contentType: string;
  contentId: string;
  onCommentAdded: () => void;
}

export default function CommentForm({ contentType, contentId, onCommentAdded }: Props) {
  const [content, setContent] = useState('');
  const [addComment, { loading, error }] = useMutation(ADD_COMMENT, {
    onCompleted: () => {
      setContent('');
      onCommentAdded();
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await addComment({
        variables: { content, contentType, contentId }
      });
    } catch (error) {
      console.error('Ошибка добавления комментария:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Написать комментарий..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-2 min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
        disabled={loading}
      />
      <div className="flex justify-between items-center">
        {error && <span className="text-red-600 text-sm">Ошибка: {error.message}</span>}
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="ml-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Отправка...' : 'Отправить'}
        </button>
      </div>
    </form>
  );
}