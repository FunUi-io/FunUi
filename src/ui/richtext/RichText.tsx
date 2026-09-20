'use client';
import React, { useEffect, useRef } from 'react';
import { useQuill } from 'react-quilljs';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { AllEmojis } from '../../utils/Emojis';
import Dropdown from '../drop/Dropdown';
import RowFlex from '../specials/RowFlex';
import ToolTip from '../tooltip/ToolTip';
import Circle from '../specials/Circle';
import Tip from '../tooltip/Tip';
import Flex from '../flex/Flex';

type RangeStatic = {
  index: number;
  length: number;
};

interface RichTextProps {
  value: string;
  onChange: (content: string) => void;
  showEmojis?: boolean;
  placeholder?: string;
  afterEmoji?: React.ReactNode;
  funcss?: string;
  modules?: any;
  theme?: 'bubble' | 'snow';
  fontFamily?: string;
  maxValue?: number;
}

const RichText: React.FC<RichTextProps> = ({
  value,
  onChange,
  showEmojis = false,
  placeholder = 'Write something...',
  afterEmoji,
  funcss = '',
  modules,
  theme = 'bubble',
  fontFamily,
  maxValue,
}) => {
  const savedRange = useRef<RangeStatic | null>(null);
  const isInitialized = useRef(false);
  // Keep a ref to latest onChange to avoid stale closures without re-binding events
  const onChangeRef = useRef(onChange);
  const maxValueRef = useRef(maxValue);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    maxValueRef.current = maxValue;
  }, [maxValue]);

  const defaultModules = {
    toolbar: [['bold', 'italic', 'underline'], [{ list: 'bullet' }]],
  };

  const { quill, quillRef } = useQuill({
    theme,
    placeholder,
    modules: modules || defaultModules,
  });

  // Seed the editor with the initial value only once on mount
  useEffect(() => {
    if (quill && !isInitialized.current) {
      isInitialized.current = true;
      const cleanedValue = value
        ?.replace(/<p><br><\/p>/g, '')
        ?.replace(/\s+/g, ' ')
        ?.trim();
      quill.root.innerHTML = cleanedValue || '';
    }
  }, [quill]); // eslint-disable-line react-hooks/exhaustive-deps
  // ↑ `value` intentionally omitted — we only want to seed once, not sync on every change

  // Bind Quill event listeners once after quill is ready
  useEffect(() => {
    if (!quill) return;

    const handleSelectionChange = (range: RangeStatic | null) => {
      if (range) savedRange.current = range;
    };

    const handleTextChange = () => {
      const currentMax = maxValueRef.current;
      const plainText = quill.getText().trim();

      // Enforce maxValue character limit
      if (currentMax && plainText.length > currentMax) {
        // Preserve cursor position when truncating
        const currentSelection = quill.getSelection();
        quill.setText(plainText.slice(0, currentMax));
        if (currentSelection) {
          const newIndex = Math.min(currentSelection.index, currentMax);
          quill.setSelection(newIndex, 0);
        }
        // After setText, re-read the HTML so the onChange value is accurate
      }

      const cleanedHTML = quill.root.innerHTML
        ?.replace(/<p><br><\/p>/g, '')
        ?.replace(/\s+/g, ' ')
        ?.trim();

      onChangeRef.current(cleanedHTML || '');
    };

    quill.on('selection-change', handleSelectionChange);
    quill.on('text-change', handleTextChange);

    return () => {
      quill.off('selection-change', handleSelectionChange);
      quill.off('text-change', handleTextChange);
    };
  }, [quill]); // bind once; use refs for latest values

  const insertEmoji = (emoji: string) => {
    if (!quill) return;

    // If no saved range yet, default to end of document
    const range = savedRange.current ?? { index: quill.getLength() - 1, length: 0 };
    const plainText = quill.getText().trim();
    const currentMax = maxValueRef.current;

    if (!currentMax || plainText.length + emoji.length <= currentMax) {
      quill.insertText(range.index, emoji);
      const newIndex = range.index + emoji.length;
      quill.setSelection(newIndex, 0);
      savedRange.current = { index: newIndex, length: 0 };
    }
  };

  const renderEmojiSection = (title: string, emojis: string[]) => (
    <>
      <div className="mb-2 mt-2 text-sm">{title}</div>
      <RowFlex gap={0.3}>
        {emojis.map((emoji, i) => (
          <span
            key={i}
            className="h6 pointer"
            onClick={() => insertEmoji(emoji)}
          >
            {emoji}
          </span>
        ))}
      </RowFlex>
    </>
  );

  const charCount = quill ? quill.getText().trim().length : 0;

  return (
    <div
      className={`fit round-edge ${funcss}`}
      style={{ position: 'relative', overflow: 'visible' }}
    >
      <div id="editor-container" className="bubble-editor-container p-0">
        <div
          ref={quillRef}
          className={theme === 'bubble' ? 'bubble-editor' : 'snow-editor'}
          style={{
            fontFamily: fontFamily || 'inherit',
          }}
        />
      </div>

      {(showEmojis || afterEmoji || maxValue) && (
        <div
          className="p-1"
          style={{ height: 'fit-content', top: `calc(100%)`, width: '100%' }}
        >
          <Flex justify="space-between" gap={1} alignItems="center" width="100%">
            {(showEmojis || afterEmoji) ? (
              <div>
                <Flex width="100%" gap={0.5} alignItems="center">
                  {showEmojis && (
                    <Dropdown
                      closableOnlyOutside
                      button={
                        <ToolTip>
                          <Circle size={2} funcss="bg border">
                            <MdOutlineEmojiEmotions />
                          </Circle>
                          <Tip
                            tip="top"
                            animation="ScaleUp"
                            duration={0.5}
                            content="Emojis"
                          />
                        </ToolTip>
                      }
                      items={[
                        {
                          label: (
                            <div
                              className="w-200 h-200"
                              style={{ overflowY: 'auto' }}
                            >
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
                  )}
                  {afterEmoji}
                </Flex>
              </div>
            ) : (
              <div />
            )}

            {maxValue ? (
              <div className="text-xs text-right">
                <span
                  className={charCount >= maxValue ? 'text-danger' : 'text-primary'}
                >
                  {charCount}
                </span>
                /{maxValue}
              </div>
            ) : (
              <div />
            )}
          </Flex>
        </div>
      )}
    </div>
  );
};

export default RichText;

// 'use client';
// import React, { useEffect, useRef } from 'react';
// import { useQuill } from 'react-quilljs';
// import { MdOutlineEmojiEmotions } from 'react-icons/md';
// import { AllEmojis } from '../../utils/Emojis';
// import Dropdown from '../drop/Dropdown';
// import RowFlex from '../specials/RowFlex';
// import ToolTip from '../tooltip/ToolTip';
// import Circle from '../specials/Circle';
// import Tip from '../tooltip/Tip';
// import Flex from '../flex/Flex';

// type RangeStatic = {
//   index: number;
//   length: number;
// };

// interface RichTextProps {
//   value: string;
//   onChange: (content: string) => void;
//   showEmojis?: boolean;
//   placeholder?: string;
//   afterEmoji?: React.ReactNode;
//   funcss?: string;
//   modules?: any;
//   theme?: 'bubble' | 'snow';
//   fontFamily?: string;
//   maxValue?: number;
// }

// const RichText: React.FC<RichTextProps> = ({
//   value,
//   onChange,
//   showEmojis = false,
//   placeholder = 'Write something...',
//   afterEmoji,
//   funcss = '',
//   modules,
//   theme = 'bubble',
//   fontFamily,
//   maxValue,
// }) => {
//   const savedRange = useRef<RangeStatic | null>(null);

//   const defaultModules = {
//     toolbar: [['bold', 'italic', 'underline'], [{ list: 'bullet' }]],
//   };

//   const { quill, quillRef } = useQuill({
//     theme,
//     placeholder,
//     modules: modules || defaultModules,
//   });

//   useEffect(() => {
//     if (!quill) return;

//     const handleSelectionChange = (range: RangeStatic | null) => {
//       if (range) savedRange.current = range;
//     };

//     const handleTextChange = () => {
//       if (!quill) return;

//       const plainText = quill.getText().trim();

//       // --- Enforce maxValue if needed ---
//       if (maxValue && plainText.length > maxValue) {
//         const truncated = plainText.slice(0, maxValue);
//         quill.setText(truncated);
//         quill.setSelection(truncated.length);
//       }

//       // --- Clean the HTML output ---
//       const cleanedHTML = quill.root.innerHTML
//         ?.replace(/<p><br><\/p>/g, '') // remove empty paragraphs
//         ?.replace(/\s+/g, ' ')         // collapse multiple spaces
//         ?.trim();                      // remove leading/trailing spaces

//       onChange(cleanedHTML || '');
//     };

//     quill.on('selection-change', handleSelectionChange);
//     quill.on('text-change', handleTextChange);

//     return () => {
//       quill.off('selection-change', handleSelectionChange);
//       quill.off('text-change', handleTextChange);
//     };
//   }, [quill, onChange, maxValue]);

//   useEffect(() => {
//     if (quill && value !== quill.root.innerHTML) {
//       // clean before setting editor value
//       const cleanedValue = value
//         ?.replace(/<p><br><\/p>/g, '')
//         ?.replace(/\s+/g, ' ')
//         ?.trim();
//       quill.root.innerHTML = cleanedValue || '';
//     }
//   }, [quill, value]);

//   const insertEmoji = (emoji: string) => {
//     if (quill && savedRange.current) {
//       const plainText = quill.getText().trim();
//       if (!maxValue || plainText.length + emoji.length <= maxValue) {
//         quill.insertText(savedRange.current.index, emoji);
//         quill.setSelection(savedRange.current.index + emoji.length);
//       }
//     }
//   };

//   const renderEmojiSection = (title: string, emojis: string[]) => (
//     <>
//       <div className="mb-2 mt-2 text-sm">{title}</div>
//       <RowFlex gap={0.3}>
//         {emojis.map((emoji, i) => (
//           <span
//             key={i}
//             className="h6 pointer"
//             onClick={() => insertEmoji(emoji)}
//           >
//             {emoji}
//           </span>
//         ))}
//       </RowFlex>
//     </>
//   );

//   return (
//     <div
//       className={`fit round-edge ${funcss}`}
//       style={{ position: 'relative', overflow: 'visible' }}
//     >
//       <div id="editor-container" className="bubble-editor-container p-0">
//         <div
//           ref={quillRef}
//           className={theme === 'bubble' ? 'bubble-editor' : 'snow-editor'}
//           style={{
//             fontFamily: fontFamily || 'inherit',
//           }}
//         />
//       </div>

//       {(showEmojis || maxValue) && (
//         <div
//           className="p-1"
//           style={{ height: 'fit-content', top: `calc(100%)`, width: '100%' }}
//         >
//           <Flex justify="space-between" gap={1} alignItems="center" width="100%">
//             {(showEmojis || afterEmoji) ? (
//               <div>
//                 <Flex width="100%" gap={0.5} alignItems="center">
//                   {showEmojis && (
//                     <Dropdown
//                       closableOnlyOutside
//                       button={
//                         <ToolTip>
//                           <Circle size={2} funcss="bg border">
//                             <MdOutlineEmojiEmotions />
//                           </Circle>
//                           <Tip
//                             tip="top"
//                             animation="ScaleUp"
//                             duration={0.5}
//                             content="Emojis"
//                           />
//                         </ToolTip>
//                       }
//                       items={[
//                         {
//                           label: (
//                             <div
//                               className="w-200 h-200"
//                               style={{ overflowY: 'auto' }}
//                             >
//                               {renderEmojiSection('❤️ Smileys & People', AllEmojis.Smiley)}
//                               {renderEmojiSection('👍 Gestures & Body Parts', AllEmojis.Gesture)}
//                               {renderEmojiSection('🔥 Symbols & Expressions', AllEmojis.Symbols)}
//                               {renderEmojiSection('🚀 Travel, Objects & Activities', AllEmojis.Travel)}
//                               {renderEmojiSection('👨‍👩‍👧‍👦 People & Professions', AllEmojis.People)}
//                               {renderEmojiSection('🐶 Animals & Nature', AllEmojis.Animals)}
//                             </div>
//                           ),
//                         },
//                       ]}
//                     />
//                   )}
//                   {afterEmoji}
//                 </Flex>
//               </div>
//             ) : (
//               <div />
//             )}

//             {maxValue && quill ? (
//               <div className="text-xs text-right">
//                 <span className="text-primary">
//                   {quill.getText().trim().length}
//                 </span>
//                 /{maxValue}
//               </div>
//             ) : (
//               <div />
//             )}
//           </Flex>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RichText;
