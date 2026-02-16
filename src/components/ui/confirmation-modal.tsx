'use client';

import { AlertTriangle, X } from 'lucide-react';
import { Button } from './button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning';
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger'
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 no-overscroll">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[var(--card-bg)] rounded-t-2xl sm:rounded-lg shadow-xl max-w-md w-full border border-[var(--card-border)]">
        {/* Header */}
        <div className="flex items-start gap-3 p-6 pb-4">
          <div className={`
            flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
            ${variant === 'danger' ? 'bg-red-100' : 'bg-[var(--accent-bg)]'}
          `}>
            <AlertTriangle className={`
              w-5 h-5
              ${variant === 'danger' ? 'text-red-600' : 'text-[var(--accent)]'}
            `} />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              {title}
            </h3>
            <p className="mt-2 text-sm text-[var(--foreground-muted)]">
              {message}
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex-shrink-0 text-[var(--foreground-subtle)] hover:text-[var(--foreground)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 p-6 pt-0 pb-safe">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 min-h-[48px]"
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            variant={variant === 'danger' ? 'destructive' : 'primary'}
            className="flex-1 min-h-[48px]"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
