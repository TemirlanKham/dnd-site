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
  const [addComment, { loading }] = useMutation(ADD_COMMENT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await addComment({
        variables: { content, contentType, contentId }
      });
      setContent('');
      onCommentAdded();
    } catch (error) {
      console.error('Ошибка добавления комментария:', error);
    }
  };

  return (
    
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Написать комментарий..."
        className="w-full p-3 bg-gray-800 rounded-lg mb-2 min-h-[100px]"
        disabled={loading}
      />
      
      
    
  );
}