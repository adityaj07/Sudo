"use client";

import { FC } from "react";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import { Extensions } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import TextStyle from "@tiptap/extension-text-style";
import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import Dropcursor from "@tiptap/extension-dropcursor";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import History from "@tiptap/extension-history";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";

import Strike from "@tiptap/extension-strike";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

interface BlogContentProps {
  content: JSONContent;
}

const extensions: Extensions = [
  Document,
  Text,
  Blockquote,
  Bold,
  BulletList,
  Code,
  CodeBlock,
  Dropcursor,
  HardBreak,
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),
  History,
  HorizontalRule,
  Italic,
  ListItem,
  OrderedList,
  Paragraph,
  Strike,
  TextStyle,
  Color,
  Highlight,
  Underline,
  Superscript,
  Subscript,
  Link,
  Image,
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
];

const BlogContent: FC<BlogContentProps> = ({ content }) => {
  const editor = useEditor({
    extensions,
    content: content,
    editable: false,
    immediatelyRender: false,
  });

  return (
    <div className="prose lg:prose-lg xl:prose-xl max-w-none dark:prose-invert prose-headings:font-title font-default focus:outline-none text-wrap">
      <EditorContent editor={editor} />
    </div>
  );
};

export default BlogContent;
