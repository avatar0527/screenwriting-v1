import React from 'react';
import { getDefaultKeyBinding } from 'draft-js';

const TypeKeyBinding = (e) => {
  if (e.keyCode === 9 && e.keyCode !== 16) {
    return 'tab';
  } else if (e.keyCode === 9 && e.keyCode === 16) {
    return '-tab';
  }
  return getDefaultKeyBinding(e);
};
