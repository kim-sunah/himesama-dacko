import React from 'react';

interface CommentTextProps {
  text: string;
}

const CommentText: React.FC<CommentTextProps> = ({ text }) => {
  const maxLength = 70;

  const splitText = (text: string, length: number) => {
    const regex = new RegExp(`.{1,${length}}`, 'g');
    return text.match(regex) || [];
  };

  const parts = splitText(text, maxLength);

  return (
    <p>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && <br />}
        </React.Fragment>
      ))}
    </p>
  );
};

export default CommentText;