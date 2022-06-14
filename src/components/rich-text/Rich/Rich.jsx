import { useEffect, useRef, useState } from 'react'
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js'
import StyleButton from './StyleButton'

const Rich = () => {

  const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
  )

  const editor = useRef(null)

  const focusEditor = () => {
    editor.current.focus()
  }

  useEffect(() => {
    focusEditor()
  }, [])

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState)
      return true;
    }
    return false;
  }

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        setEditorState(newEditorState)
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }
  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType))
  }
  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  }

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.

  let className = "RichEditor-editor"
  var contentState = editorState.getCurrentContent()
  if (!contentState.hasText()) {
    if (
      contentState
        .getBlockMap()
        .first()
        .getType() !== "unstyled"
    ) {
      className += " RichEditor-hidePlaceholder";
    }
  }

  return (
    <div className="RichEditor-root">
      <BlockStyleControls
        editorState={ editorState }
        onToggle={ toggleBlockType }
      />
      <InlineStyleControls
        editorState={ editorState }
        onToggle={ toggleInlineStyle }
      />
      <div className={className} onClick={ focusEditor }>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={ styleMap }
          editorState={ editorState }
          handleKeyCommand={ handleKeyCommand }
          keyBindingFn={ mapKeyToEditorCommand }
          onChange={editorState => setEditorState(editorState)}
          placeholder="Tell a story..."
          ref={ editor }
          spellCheck={ true }
        />
      </div>
    </div>
  )
}

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" }
];
const InlineStyleControls = props => {

  const currentStyle = props.editorState.getCurrentInlineStyle()

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" }
];
const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection()
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType()
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  )
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

const getBlockStyle = (block) => {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

export default Rich