import React, { createContext, useState, useContext } from 'react';
import { Modal } from 'antd';

const DialogContext = createContext();

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};

export const DialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState('');

  const openDialog = (title, content) => {
    setTitle(title);
    setContent(content);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setTitle('');
    setContent(null);
    setIsOpen(false);
  };

  return (
    <DialogContext.Provider value={{ isOpen, title, content, openDialog, closeDialog }}>
      <Modal title={title} footer={false} draggable={false} open={isOpen} style={{ width: '300px'}} onCancel={closeDialog}>
        {content}
      </Modal>
      {children}
    </DialogContext.Provider>
  );
};
