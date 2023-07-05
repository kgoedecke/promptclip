import React, { useEffect } from 'react';
import { Divider } from '@chakra-ui/react';
import { getPrompts } from '../../utils/database';
import SearchInput from './SearchInput/SearchInput.component';
import Actions from './Actions/Actions.component';
import Prompts from './Prompts/Prompts.component';
import { PromptsContext } from '../../contexts/prompts.context';
import { setWindowSizeToBody } from '../../utils/window';

document.addEventListener('keydown', (e: KeyboardEvent) => {
  const searchInput = document.getElementById('search-input') as HTMLElement;
  const promptButtons = Array.from(document.querySelectorAll('.prompt-button')) as HTMLElement[];

  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    if (promptButtons.length > 0) {
      e.preventDefault();
      const activeElement = document.activeElement as HTMLElement;

      if (activeElement === searchInput) {
        // If Search-Input is active, focus the first prompt
        promptButtons[0].focus();
      } else {
        // Move focus based on arrow key within prompts
        const currentIndex = promptButtons.findIndex((el) => el === activeElement);

        if (currentIndex !== -1) {
          if (e.key === 'ArrowDown') {
            const nextIndex = (currentIndex + 1) % promptButtons.length;
            promptButtons[nextIndex].focus();
          } else if (e.key === 'ArrowUp') {
            const prevIndex = (currentIndex - 1 + promptButtons.length) % promptButtons.length;
            promptButtons[prevIndex].focus();
          }
        }
      }
    }
  } else if (e.metaKey) {
    // Handle CMD + 1, CMD + 2
    const index = parseInt(e.key, 10);
    const targetElement = promptButtons[index - 1];

    if (index >= 1 && index <= promptButtons.length && targetElement) {
      targetElement.click();
    }
  } else if (e.type === 'keydown' && e.key !== 'Enter') {
    searchInput.focus();
  }
});

function Search() {
  const { prompts, setPrompts } = React.useContext(PromptsContext);
  useEffect(() => {
    (async () => {
      setPrompts(await getPrompts('used'));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await setWindowSizeToBody();
    })();
  }, [prompts]);

  const refreshPrompts = async () => {
    setPrompts(await getPrompts('used'));
  };

  return (
    <div className="searchWindow">
      <SearchInput />
      <Divider
        width="728px"
        borderColor="#7D7A75"
        marginTop="5px"
        marginBottom="10px"
        marginLeft={0}
      />
      <Prompts prompts={prompts} refreshPrompts={refreshPrompts} />
      <Divider
        width="728px"
        borderColor="#7D7A75"
        marginTop="5px"
        marginBottom="15px"
        marginLeft={0}
      />
      <Actions />
    </div>
  );
}

export default Search;
