import React from 'react';

const TextComponent = ({ text }) => {
  // Replace newline characters (\n) with <br/> tags
  const textWithLineBreaks = text.replace(/\n/g, '<br/>');

  return (
    <div>
      {/* Render the text with line breaks */}
      <div dangerouslySetInnerHTML={{ __html: textWithLineBreaks }}></div>
    </div>
  );
};

export default TextComponent;
