"use client";

import React, {
  FC,
  useCallback,
  useRef,
  useState,
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
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
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
import hljs from "highlight.js";
import { useDebouncedCallback } from "use-debounce";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import apiClient from "@/lib/apiClient";

type FormValues = {
  title: string;
  content: JSONContent;
  published: boolean;
};

// const JSONContentSchema: z.ZodType<JSONContent> = z.lazy(() =>
//   z
//     .object({
//       type: z.string().optional(),
//       attrs: z.record(z.any()).optional(),
//       content: z.array(z.lazy(() => JSONContentSchema)).optional(),
//       marks: z
//         .array(
//           z
//             .object({
//               type: z.string(),
//               attrs: z.record(z.any()).optional(),
//             })
//             .passthrough()
//         )
//         .optional(),
//       text: z.string().optional(),
//     })
//     .passthrough()
// );

// const FormSchema = z.object({
//   title: z.string().min(1, "Title is required").max(256, "Title is too long"),
//   content: JSONContentSchema,
//   published: z.boolean(),
// });

// type FormValues = z.infer<typeof FormSchema>;

interface EditorProps {
  isEditMode?: boolean;
  initialTitle?: string;
  initialContent?: JSONContent;
  initialPublishedStatus?: boolean;
  blogId?: string;
}

const extensions = [...defaultExtensions, slashCommand];

const Editor: FC<EditorProps> = ({
  isEditMode = false,
  initialContent,
  initialTitle,
  initialPublishedStatus,
  blogId,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>("Saved");
  const { toast } = useToast();
  const router = useRouter();

  const { control, handleSubmit } = useForm<FormValues>({
    // resolver: zodResolver(FormSchema),
    defaultValues: {
      title: initialTitle || "",
      content: initialContent || defaultValue,
      published: initialPublishedStatus || true,
    },
    mode: "onSubmit",
  });

  const editorBubbleRef = useRef<HTMLDivElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);

  //Apply Codeblock Highlighting on the HTML from editor.getHTML()
  const highlightCodeblocks = (content: string) => {
    const doc = new DOMParser().parseFromString(content, "text/html");
    doc.querySelectorAll("pre code").forEach((el) => {
      // @ts-ignore
      // https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
      hljs.highlightElement(el);
    });
    return new XMLSerializer().serializeToString(doc);
  };

  const onSubmit = async (data: FormValues) => {
    // console.log("This is data: ", data);
    try {
      setIsSubmitting(true);
      let response;

      if (isEditMode) {
        response = await apiClient.put(`/blogs/${blogId}`, data);
      } else {
        response = await apiClient.post(`/blogs`, data);
      }

      const publishedOrDrafted = data.published ? "published" : "drafted";

      if (response.data.success === true) {
        router.push("/home");
        router.refresh();
        toast({
          description: isEditMode
            ? `Blog updated successfully.`
            : `Blog ${publishedOrDrafted} successfully.`,
        });
      } else {
        toast({
          description: isEditMode
            ? `Could not update blog.`
            : `Could not publish blog.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        description: isEditMode
          ? `Error updating blog.`
          : `Error publishing blog.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      drawerCloseRef.current?.click();
    }

    // const { success, error } = FormSchema.safeParse(data);
    // if (!success) {
    //   toast({
    //     description: "Title should not be empty",
    //   });
    //
  };

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      // setCharsCount(ed);
      window.localStorage.setItem(
        "html-content",
        highlightCodeblocks(editor.getHTML())
      );
      window.localStorage.setItem("novel-content", JSON.stringify(json));
      window.localStorage.setItem(
        "markdown",
        editor.storage.markdown.getMarkdown()
      );

      setSaveStatus("Saved");
    },
    500
  );

  // const renderCount = useRef(0);

  // useEffect(() => {
  //   renderCount.current += 1;
  //   console.log(`Render count: ${renderCount.current}`);
  // });

  const handleEditorUpdate = useCallback(
    (setValue: (value: JSONContent) => void) =>
      ({ editor }: { editor: EditorInstance }) => {
        const json = editor.getJSON();
        setValue(json);
        debouncedUpdates(editor);
        setSaveStatus("Unsaved");
      },
    []
  );

  const handleFormClick = useCallback((e: React.MouseEvent) => {
    if (
      editorBubbleRef.current &&
      !editorBubbleRef.current.contains(e.target as Node)
    ) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  return (
    <>
      <EditorRoot>
        <form
          onSubmit={handleSubmit(onSubmit)}
          onClick={handleFormClick}
          className="flex flex-col gap-4 relative"
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextareaAutosize
                {...field}
                placeholder="Title"
                className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none border rounded-2xl p-6 border-[#666666d0]"
                autoFocus={true}
              />
            )}
          />
          <Controller
            name="content"
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                {/* <div className="flex absolute right-5 top-32 z-10 mb-5 gap-2">
                  <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
                    {saveStatus}
                  </div>
                </div> */}
                <EditorContent
                  className="border py-8 px-6 rounded-2xl min-h-fit max-h-[60vh] overflow-y-auto placeholder:text-black border-[#666666d0] relative"
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
                  onUpdate={({ editor }) => {
                    const json = editor.getJSON();
                    onChange(json);
                    handleEditorUpdate(onChange)({ editor });
                  }}
                  slotAfter={<ImageResizer />}
                  // autofocus={"start"}
                >
                  <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground absolute top-2 right-2">
                    {saveStatus}
                  </div>
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
                      placement: "bottom",
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

                <Drawer>
                  <DrawerTrigger asChild>
                    <Button className="w-full" type="button">
                      {isEditMode ? `Update` : `Publish`}
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full max-w-sm ">
                      <DrawerHeader>
                        <DrawerTitle className="text-xl font-semibold">
                          Draft settings
                        </DrawerTitle>
                      </DrawerHeader>
                      <Separator />

                      <div className="flex items-center justify-between my-4 px-4">
                        <Controller
                          name="published"
                          control={control}
                          render={({ field }) => (
                            <>
                              <Label
                                htmlFor="save-as-draft"
                                className="text-lg font-medium leading-none tracking-tight"
                              >
                                Save as draft
                              </Label>
                              <Switch
                                id="save-as-draft"
                                checked={!field.value}
                                onCheckedChange={(checked) =>
                                  field.onChange(!checked)
                                }
                              />
                            </>
                          )}
                        />
                      </div>

                      <DrawerFooter className="flex flex-row justify-between items-center w-full">
                        <DrawerClose asChild>
                          <Button variant="outline" ref={drawerCloseRef}>
                            Cancel
                          </Button>
                        </DrawerClose>
                        <Button
                          type="submit"
                          onClick={() => {
                            handleSubmit((data) => {
                              onSubmit(data);
                            })();
                          }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting && (
                            <Icons.spinner className="mr-2 size-4 animate-spin" />
                          )}
                          {isEditMode ? `Update` : `Publish`}
                        </Button>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>
              </>
            )}
          />
        </form>
      </EditorRoot>
    </>
  );
};

export default Editor;
