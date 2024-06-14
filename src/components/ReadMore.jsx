import React, { useState, useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: none;
  border: none;
  color: #1b5fb1;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  white-space: pre-wrap;
  overflow: hidden;
  transition: max-height 0.3s ease;
  line-height: 1.6;
  word-break: break-all;
  
`;

function ReadMore({ text, maxRows = 5, maxCharacters = 100 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState('auto');
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setContentHeight(contentHeight);
    }
  }, [text]);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const sanitizedText = DOMPurify.sanitize(text.replace(/\n/g, '<br/>'));

  let displayedText = sanitizedText;
  if (!isExpanded && sanitizedText.length > maxCharacters) {
    displayedText = sanitizedText.slice(0, maxCharacters) + '...';
  }

  const lineHeight = 1.2; // Adjust as needed
  const actualRows = Math.ceil(contentHeight / (lineHeight * 16)); // Assuming 1rem = 16px

  return (
    <div>
      <ContentContainer
        ref={contentRef}
        style={{
          maxHeight: isExpanded ? 'none' : `${maxRows * lineHeight}em`,
        }}
        dangerouslySetInnerHTML={{ __html: displayedText }}
      />
      {actualRows > maxRows || sanitizedText.length > maxCharacters ? (
        <StyledButton onClick={toggleReadMore}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </StyledButton>
      ) : null}
    </div>
  );
}

export default ReadMore;
