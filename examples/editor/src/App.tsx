import { defaultBlockSchema } from "@blocknote/core";
import "@blocknote/core/style.css";
import {
  BlockNoteView,
  ReactSlashMenuItem,
  createReactBlockSpec,
  getDefaultReactSlashMenuItems,
  useBlockNote,
} from "@blocknote/react";
import { useEffect } from "react";
import { RiImage2Fill } from "react-icons/ri";

const AcordionBlock = createReactBlockSpec({
  type: "accordion",
  propSchema: {
    label: {
      default: "https://via.placeholder.com/1000",
    },
  },
  containsInlineContent: false,
  render: ({ editor, block }) => {
    useEffect(() => {
      const id = setTimeout(() => {
        editor.updateBlock(block, {
          props: {
            label:
              "https://storage.googleapis.com/candycode/jotai/jotai-mascot.png",
          },
        });
      }, 2000);

      return () => {
        clearTimeout(id);
      };
    }, []);

    return (
      <div>
        <p>Some content</p>
        <p>{block.props.label}</p>
      </div>
    );
  },
});

const customSchema = {
  ...defaultBlockSchema,
  accordion: AcordionBlock,
};

const insertAccordion: ReactSlashMenuItem<typeof customSchema> = {
  name: "Insert accordion",
  execute: (editor) => {
    editor.insertBlocks(
      [
        {
          type: "accordion",
        },
      ],
      editor.getTextCursorPosition().block,
      "before"
    );
  },
  aliases: ["containers"],
  group: "Containers",
  icon: <RiImage2Fill />,
  hint: "Insert an accordion",
};

export default function App() {
  const editor = useBlockNote({
    theme: "dark",
    blockSchema: customSchema,
    slashMenuItems: [
      ...getDefaultReactSlashMenuItems(customSchema),
      insertAccordion,
    ],
  });

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} />;
}
