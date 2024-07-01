"use client";

import React, { useEffect, useRef, useState } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/emailer/ConfirmModal';

function OutputSection2({ aiOutput, emails }: {
  aiOutput: string;
  emails: any;
}) {
  const editorRef: any = useRef();
  const [content, setContent] = useState<string>('');
  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput);
  }, [aiOutput])

  return (
    <div className='bg-white shadow-lg border rounded-lg'>
      <Editor
        ref={editorRef}
        initialValue="Your result will appear here"
        initialEditType="wysiwyg"
        height="400px"
        useCommandShortcut={true}
        onChange={() => setContent(editorRef.current.getInstance().getMarkdown())}
      />
      <ConfirmModal content={content} emails={emails}  />
    </div>
  )
}

export default OutputSection2