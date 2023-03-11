import React, { useState } from 'react'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import { parsePost } from 'utils/parsePost'

interface Props {
  initValue: string
  setClipboard: React.Dispatch<React.SetStateAction<string>>
}

export function MarkdownEditor({ initValue, setClipboard }: Props) {
  const post = parsePost(initValue)
  const [value, setValue] = useState(post)

  return (
    <>
      <ReactQuill
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
          ],
        }}
        style={{ borderRadius: 10 }}
        theme="snow"
        value={value}
        onChange={(val, d, s, editor) => {
          const text = editor.getText();
          setValue(val)
          setClipboard(text)
        }}
      />
    </>
  )
}
