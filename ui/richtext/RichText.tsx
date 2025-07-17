'use client';
import React, { useEffect, useRef } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.bubble.css';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { AllEmojis } from '../../utils/Emojis';
import Dropdown from '../drop/Dropdown';
import RowFlex from '../specials/RowFlex';
import ToolTip from '../tooltip/ToolTip';
import Circle from '../specials/Circle';
import Tip from '../tooltip/Tip';

// ✅ Define RangeStatic locally since Quill does not export it
type RangeStatic = {
  index: number;
  length: number;
};

interface RichTextProps {
  /** The HTML content of the editor */
  value: string;
  showEmojis: boolean;
  /** Function triggered when the editor content changes */
  onChange: (content: string) => void;

  /** Placeholder shown when editor is empty */
  placeholder?: string;

  /** Optional ReactNode to be rendered after the emoji dropdown */
  afterEmoji?: React.ReactNode;

  /** Extra class names for container styling */
  funcss?: string;
}

const RichText: React.FC<RichTextProps> = ({
  value,
  onChange,
  placeholder = 'Write something...',
  afterEmoji,
  showEmojis,
  funcss = '',
}) => {
  const { quill, quillRef } = useQuill({
    theme: 'bubble',
    placeholder,
    modules: {
      toolbar: [['bold', 'italic', 'underline'], [{ list: 'bullet' }]],
    },
  });

  const savedRange = useRef<RangeStatic | null>(null);

  useEffect(() => {
    if (!quill) return;

    const handleSelectionChange = (range: RangeStatic | null) => {
      if (range) savedRange.current = range;
    };

    const handleTextChange = () => {
      onChange(quill.root.innerHTML);
    };

    quill.on('selection-change', handleSelectionChange);
    quill.on('text-change', handleTextChange);

    return () => {
      quill.off('selection-change', handleSelectionChange);
      quill.off('text-change', handleTextChange);
    };
  }, [quill, onChange]);

  useEffect(() => {
    if (quill && value !== quill.root.innerHTML) {
      quill.root.innerHTML = value;
    }
  }, [quill, value]);

  const insertEmoji = (emoji: string) => {
    if (quill && savedRange.current) {
      quill.insertText(savedRange.current.index, emoji);
      quill.setSelection(savedRange.current.index + emoji.length);
    }
  };

  const renderEmojiSection = (title: string, emojis: string[]) => (
    <>
      <div className="mb-2 mt-2 text-sm">{title}</div>
      <RowFlex gap={0.3}>
        {emojis.map((emoji, i) => (
          <span key={i} className="h6 pointer" onClick={() => insertEmoji(emoji)}>
            {emoji}
          </span>
        ))}
      </RowFlex>
    </>
  );

  return (
    <div className={funcss} >
      {/* Editor Container */}
      <div id={"bubble-editor-container"} className="bubble-editor-container p-0">
        <div ref={quillRef} className="bubble-editor" />
      </div>

      {/* Emoji Dropdown */}
      <RowFlex gap={0.5}>
        {
            showEmojis &&
               <Dropdown
               closableOnlyOutside
          direction="dropdown"
          openOnHover={false}
          button={
            <ToolTip>
              <Circle funcss="bg border">
                <MdOutlineEmojiEmotions />
              </Circle>
              <Tip tip="top" animation="ScaleUp" duration={0.5} content="Emojis" />
            </ToolTip>
          }
          items={[
            {
              label: (
                <div className="w-200 h-300" style={{ overflowY: 'auto' }}>
                  {renderEmojiSection('❤️ Smileys & People', AllEmojis.Smiley)}
                  {renderEmojiSection('👍 Gestures & Body Parts', AllEmojis.Gesture)}
                  {renderEmojiSection('🔥 Symbols & Expressions', AllEmojis.Symbols)}
                  {renderEmojiSection('🚀 Travel, Objects & Activities', AllEmojis.Travel)}
                  {renderEmojiSection('👨‍👩‍👧‍👦 People & Professions', AllEmojis.People)}
                  {renderEmojiSection('🐶 Animals & Nature', AllEmojis.Animals)}
                </div>
              ),
            },
          ]}
        />
        }
        {afterEmoji || null}
      </RowFlex>
    </div>
  );
};

export default RichText;
