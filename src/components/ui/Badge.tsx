import React from 'react';

interface BadgeProps {
  text: string;
}

const Badge: React.FC<BadgeProps> = ({ text }) => {
  return (
    <span style={{
      backgroundColor: '#007bff',
      color: 'white',
      padding: '0.2rem 0.5rem',
      borderRadius: '0.25rem',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    }}>
      {text}
    </span>
  );
};

export default Badge;
