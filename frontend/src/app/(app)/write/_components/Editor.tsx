"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  EditorRoot,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorContent,
  type JSONContent,
  EditorCommandList,
  EditorBubble,
  EditorInstance,
} from "novel";
import { ImageResizer, Placeholder, handleCommandNavigation } from "novel/extensions";
import { defaultExtensions } from "./extensions";
import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { ColorSelector } from "./selectors/color-selector";

import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";
import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { uploadFn } from "./image-upload";
import { Separator } from "@/components/ui/separator";

import TextareaAutosize from "react-textarea-autosize";
import { defaultValue } from "@/lib/default-value";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

type FormValues = {
  title: string;
  content: JSONContent;
};

const extensions = [...defaultExtensions, slashCommand];

const Editor = ({}) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: "",
      content: defaultValue,
    },
    mode: "onSubmit",
  });

  const editorBubbleRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const onSubmit = (data: FormValues) => {
    console.log("This is data: ", data);
    // Handle form submission here
  };


  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`Render count: ${renderCount.current}`);
  });

  const handleEditorUpdate = useCallback(
    (setValue: (value: JSONContent) => void) =>
      ({ editor }: { editor: EditorInstance }) => {
        setValue(editor.getJSON());
      },
    []
  );

  const handleFormClick = useCallback((e: React.MouseEvent) => {
    if (
      editorBubbleRef.current &&
      !editorBubbleRef.current.contains(e.target as Node) &&
      submitButtonRef.current &&
      !submitButtonRef.current.contains(e.target as Node)
    ) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  const memoizedEditorContent = useMemo(
    () => (
      <Controller
        name="content"
        control={control}
        render={({ field: { onChange, value } }) => (
          <EditorContent
            className="border p-6 rounded-2xl min-h-[20rem] placeholder:text-black"
            {...(value && { initialContent: value })}
            extensions={extensions}
            immediatelyRender={false}
            editorProps={{
              handleDOMEvents: {
                keydown: (_view, event) => handleCommandNavigation(event),
              },
              handlePaste: (view, event) =>
                handleImagePaste(view, event, uploadFn),
              handleDrop: (view, event, _slice, moved) =>
                handleImageDrop(view, event, moved, uploadFn),
              attributes: {
                class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full h-[20rem]`,
              },
            }}
            onUpdate={handleEditorUpdate(onChange)}
            slotAfter={<ImageResizer />}
            // autofocus={"start"}
          >
            <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
              <EditorCommandEmpty className="px-2 text-muted-foreground">
                No results
              </EditorCommandEmpty>
              <EditorCommandList>
                {suggestionItems.map((item) => (
                  <EditorCommandItem
                    value={item.title}
                    onCommand={(val) => item.command?.(val)}
                    className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                    key={item.title}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </EditorCommandItem>
                ))}
              </EditorCommandList>
            </EditorCommand>

            <EditorBubble
              tippyOptions={{
                placement: "top",
              }}
              className="flex w-fit max-w-[90vw] overflow-x-scroll md:overflow-hidden md:overflow-x-hidden rounded-md border border-muted bg-background shadow-xl"
              ref={editorBubbleRef}
            >
              <Separator orientation="vertical" />
              <NodeSelector />
              <Separator orientation="vertical" />
              <LinkSelector />
              <Separator orientation="vertical" />
              <TextButtons />
              <Separator orientation="vertical" />
              <ColorSelector />
            </EditorBubble>
          </EditorContent>
        )}
      />
    ),
    [control, handleEditorUpdate]
  );

  return (
    <EditorRoot>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={handleFormClick}
        className="flex flex-col gap-4"
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextareaAutosize
              {...field}
              placeholder="Title"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none border rounded-2xl p-6"
              autoFocus={true}
            />
          )}
        />
        {memoizedEditorContent}
        <Button type="submit" ref={submitButtonRef}>
          Submit
        </Button>
      </form>
    </EditorRoot>
  );
};

export default Editor;
