import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog';
import { cn } from '../lib/utils';

interface FileEditorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filePath: string | null;
  fileName: string;
  initialContent: string;
  onSave?: (filePath: string, content: string) => Promise<void>;
}

export function FileEditorModal({
  open,
  onOpenChange,
  filePath,
  fileName,
  initialContent,
  onSave
}: FileEditorModalProps) {
  const { t } = useTranslation('common');
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Reset state when modal opens or file changes
  useEffect(() => {
    if (open) {
      setContent(initialContent);
      setError(null);
      setHasUnsavedChanges(false);
    }
  }, [open, initialContent]);

  // Track unsaved changes
  useEffect(() => {
    if (open && content !== initialContent) {
      setHasUnsavedChanges(true);
    }
  }, [content, initialContent, open]);

  const handleSave = async () => {
    if (!filePath) return;

    setIsSaving(true);
    setError(null);

    try {
      const result = await window.electronAPI.writeFile(filePath, content);
      if (result.success) {
        setHasUnsavedChanges(false);
        onSave?.(filePath, content);
        onOpenChange(false);
      } else {
        setError(result.error || t('fileEditor.saveFailed'));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('fileEditor.saveFailed'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenChange = useCallback((newOpen: boolean) => {
    if (!newOpen && hasUnsavedChanges) {
      // Warn user about unsaved changes
      const confirmDiscard = window.confirm(t('fileEditor.unsavedWarning'));
      if (!confirmDiscard) {
        return;
      }
    }
    onOpenChange(newOpen);
  }, [hasUnsavedChanges, onOpenChange, t]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{t('fileEditor.title', { name: fileName })}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 min-h-0 py-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={cn(
              'w-full h-full min-h-[400px] p-3 rounded-lg border border-border',
              'bg-background text-foreground font-mono text-sm',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              'resize-none'
            )}
            spellCheck={false}
            disabled={isSaving}
          />
        </div>

        {error && (
          <div className="text-sm text-destructive bg-destructive/10 rounded-lg p-3" role="alert">
            {error}
          </div>
        )}

        <DialogFooter className="flex items-center justify-between sm:justify-between">
          <div className="text-sm text-muted-foreground">
            {hasUnsavedChanges && (
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-yellow-500" />
                {t('fileEditor.unsavedChanges')}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSaving}
            >
              {t('fileEditor.cancel')}
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || !hasUnsavedChanges}
            >
              {isSaving ? t('fileEditor.saving') : t('fileEditor.save')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
