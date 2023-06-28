import React from 'react';
import { Text } from '@chakra-ui/react';
import { IPrompt } from '../../../types/Prompt.types';
import Prompt from '../PromptButton/PromptButton.component';

const Prompts: React.FC<{ prompts: IPrompt[]; refreshPrompts: () => void }> = ({
  prompts,
  refreshPrompts,
}) => {
  const renderPrompts = () => {
    if (prompts.length === 0) {
      return (
        <p
          style={{
            color: '#7D7A75',
            fontSize: '18px',
            fontWeight: 500,
            textAlign: 'center',
          }}
        >
          No prompts found
        </p>
      );
    }

    return prompts
      .slice(0, 9)
      .map((prompt, index) => <Prompt key={prompt.uuid} index={index + 1} {...prompt} />);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: '30px',
          marginLeft: '24px',
          marginTop: '20px',
        }}
      >
        <Text fontSize="14px" color="#78787E">
          Prompts
        </Text>
        <Text fontSize="14px" color="#78787E" cursor="pointer" onClick={refreshPrompts}>
          Refresh
        </Text>
      </div>
      <div style={{ padding: '5px 10px 10px 10px' }}>{renderPrompts()}</div>
    </div>
  );
};

export default Prompts;
