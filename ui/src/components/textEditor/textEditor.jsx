import { Editor } from 'slate-react';
import { Value } from 'slate';

import React, {Component} from 'react';
import Button from './basicButton';
import ToolBar from './basicToolBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic,faUnderline,faListUl,faListOl,faCode,faAlignCenter,faAlignJustify,faAlignRight, faAlignLeft,faQuoteLeft} from '@fortawesome/free-solid-svg-icons';

const DEFAULT_TYPE = "paragraph";

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: "text",
            text: 'A line of text in a paragraph'
          }
        ]
      }
    ]
  }
});

function markHotKey (options) {
  const { type, key } = options;

  return {
    onKeyDown : (event, editor, next) => {
      if (event.key !== key || !event.ctrlKey) return next();
      event.preventDefault();
      editor.toggleMark(type);
    }
  }
}

function blockHotKey(options) {
  const { type, key } = options;

  return {
    onKeyDown : (event, editor, next) => {
      if (event.key !== key || !event.ctrlKey)  return next();
      const isCode = editor.value.blocks.some(block => block.type === type);
      editor.setBlocks(isCode ? 'paragraph' : 'code');
    }
  }
}

const plugins = [
  markHotKey({ key:'b', type: 'bold' } ),
  markHotKey({ key:'i', type: 'italic' } ),
  blockHotKey({ key: '`', type: 'code' } )
];

class TextEditor extends Component {
  state = {
    value: initialValue
  }

  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  }

  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  }

  ref = editor => {
    this.editor = editor;
  }

  onChange = ({value}) => { this.setState({value}) }

  onClickMark = (event, type) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  }

  onClickBlock = (event, type) => {
    event.preventDefault();

    const { editor } = this;
    const { value }= editor;
    const { document } = value;

    //render for click block button;
    if ( type !== 'bulleted-list' && type !== 'numbered-list' ) {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item');

      if (isList) {
        editor
        .setBlocks( isActive ? DEFAULT_TYPE : type )
        .unwrapBlock('bullected-list')
        .unwrapBlock('numbered-list')
      } else {
        editor
        .setBlocks( isActive ? DEFAULT_TYPE : type )
      }
    } else {
      const isList = this.hasBlock('list-item');
      const isType = value.blocks.some(block => {
        return !!document.getClosest( block.key, parent => parent.type === type )
      });

      if (isList && isType) {
        editor
        .setBlocks( DEFAULT_TYPE )
        .unwrapBlock( 'bulleted-list' )
        .unwrapBlock( 'unmbered-list' )
      } else if (isList) {
        editor
          .unwrapBlock( type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
          .warpBlock(type);
      } else {
        editor
        .setBlocks('list-item')
        .warpBlock(type);
      }
    }
  }

  renderMarkButton = (type, icon_singnal) => {
    const isActive = this.hasMark(type);
    let cur_icon;

    switch(icon_singnal) {
      case 'format_italic':
        cur_icon = faItalic;
        break;
      case 'format_underline':
        cur_icon = faUnderline;
        break;
      case 'format_code':
        cur_icon = faCode;
        break;
      case 'format_list_numbered':
        cur_icon = faListOl;
        break;
      case 'format_list_bulleted':
        cur_icon = faListUl;
        break;
      case 'format_align_left':
        cur_icon = faAlignLeft;
        break;
      case 'format_align_center':
        cur_icon = faAlignCenter;
        break;
      case 'format_align_right':
        cur_icon = faAlignRight;
        break;
      case 'format_align_justify':
        cur_icon = faAlignJustify;
        break;
      default:
        cur_icon = faBold;
        break;
    }

    return (
      <Button
        activeState = {isActive}
        onMouseDown = {event => this.onClickMark(event, type)}
      >
        <FontAwesomeIcon icon={ cur_icon } />
      </Button>
    )
  }

  renderBlockButton = (type, icon_singnal) => {
    let isActive  = this.hasBlock(type);
    let cur_icon;

    if (['numbered-list','bulleted-list'].includes(type)) {
      const { value: { document,blocks }} = this.state;

      if ( blocks.size > 0 ) {
        const parent = document.getParent(blocks.first().key)
        isActive = this.hasBlock("list-item") && parent && parent.type === type;
      }
    }

    switch(icon_singnal) {
      case "format_list_numbered":
        cur_icon = faListOl;
        break;
      case "format_list_bulleted":
        cur_icon = faListUl;
        break;
      case "format_quote":
        cur_icon = faQuoteLeft;
        break;
    }

    return (
      <Button
        activeState = { isActive }
        onMouseDown = { event => this.onClickBlock(event, type) }
      >
        <FontAwesomeIcon icon={ cur_icon } />
      </Button>
    )
  }

  renderMark = (props, editor, next) => {
    const { children,mark,attributes } = props;

    switch(mark.type) {
      case 'bold':
        return <strong {...attributes}>{children} </strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next();
    }
  }

  renderBlock = (props, editor, next) => {
    const {children,node,attributes} = props;

    switch(node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulluted-list':
        return <ul {...attributes}>{children}</ul>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      case 'code':
        return <pre {...attributes}><code>{children}</code></pre>
      default:
        return next();
  }
}

  render() {
    return (
      <div className="textEditor">
        <ToolBar
          className="generateTools"
        >
        { this.renderMarkButton("bold","format_bold") }
        { this.renderMarkButton("italic","format_italic") }
        { this.renderMarkButton("underlined","format_underline")}
        { this.renderMarkButton("code","format_code")}
        { this.renderBlockButton("block-quote","format_quote") }
        { this.renderBlockButton('numbered-list', 'format_list_numbered') }
        { this.renderBlockButton('bulleted-list', 'format_list_bulleted') }
        </ToolBar>
        <Editor
          className="textEditorContent"
          spellCheck
          autoFocus
          ref={ this.ref }
          plugins={plugins}
          value={ this.state.value }
          onChange = { this.onChange}
          renderBlock={ this.renderBlock }
          renderMark = {this.renderMark}
        />
      </div>
    )
  }
}

export default TextEditor;
