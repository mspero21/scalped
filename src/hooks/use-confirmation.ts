'use client';

import { useState } from 'react';

interface ConfirmationState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning';
  onConfirm: () => void;
}

export function useConfirmation() {
  const [state, setState] = useState<ConfirmationState>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const confirm = (options: Omit<ConfirmationState, 'isOpen'>) => {
    return new Promise<boolean>((resolve) => {
      setState({
        ...options,
        isOpen: true,
        onConfirm: () => {
          options.onConfirm();
          resolve(true);
        },
      });
    });
  };

  const close = () => {
    setState(prev => ({ ...prev, isOpen: false }));
  };

  return {
    ...state,
    confirm,
    close,
    onClose: close,
  };
}
