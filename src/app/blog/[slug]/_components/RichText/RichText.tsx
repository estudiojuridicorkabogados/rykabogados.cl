import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import {
  Block,
  BLOCKS,
  Inline,
  INLINES,
  MARKS,
} from "@contentful/rich-text-types";

import { RichText as RichTextType } from "@/types/global";

import {
  Alert,
  Asset,
  Blockquote,
  Bold,
  Heading,
  Hyperlink,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "./Blocks";

const EMOJI_REGEX =
  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;

/**
 * Contentful does not support an alert block, so we have to use a quote block
 * and do a hack by adding an emoji as the first character of the quote.
 */
function isBlockAnAlert(block: Block | Inline): boolean {
  return (
    block.content[0].nodeType === "paragraph" &&
    block.content[0].content[0].nodeType === "text" &&
    EMOJI_REGEX.test(block.content[0].content[0].value)
  );
}

export const RichText: React.FC<{ richtext: RichTextType }> = ({
  richtext,
}) => {
  if (!richtext.json) {
    return null;
  }

  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (block) => {
        const asset = richtext.assets?.find((asset) => {
          return asset?.id === block.data.target.sys.id;
        });

        if (!asset) {
          return null;
        }

        return <Asset asset={asset} />;
      },
      [BLOCKS.QUOTE]: (block, children) => {
        if (isBlockAnAlert(block)) {
          return <Alert>{children}</Alert>;
        }

        return <Blockquote>{children}</Blockquote>;
      },
      [INLINES.HYPERLINK]: ({ data }, children) => (
        <Hyperlink uri={data.uri}>{children}</Hyperlink>
      ),
      [BLOCKS.PARAGRAPH]: (_, children: any) => <Text>{children}</Text>,
      [BLOCKS.HEADING_1]: (_, children: any) => (
        <Heading size={1}>{children}</Heading>
      ),
      [BLOCKS.HEADING_2]: (_, children: any) => (
        <Heading size={2}>{children}</Heading>
      ),
      [BLOCKS.HEADING_3]: (_, children: any) => (
        <Heading size={3}>{children}</Heading>
      ),
      [BLOCKS.HEADING_4]: (_, children: any) => (
        <Heading size={4}>{children}</Heading>
      ),
      [BLOCKS.HEADING_5]: (_, children: any) => (
        <Heading size={5}>{children}</Heading>
      ),
      [BLOCKS.HEADING_6]: (_, children: any) => (
        <Heading size={6}>{children}</Heading>
      ),
      [BLOCKS.OL_LIST]: (_, children: any) => (
        <OrderedList>{children}</OrderedList>
      ),
      [BLOCKS.UL_LIST]: (_, children: any) => (
        <UnorderedList>{children}</UnorderedList>
      ),
      [BLOCKS.LIST_ITEM]: (node) => {
        console.log(": ListItem rendered", node);
        const UnTaggedChildren = documentToReactComponents(
          node as unknown as any,
          {
            renderNode: {
              [BLOCKS.PARAGRAPH]: (_, children) => children,
              [BLOCKS.LIST_ITEM]: (_, children) => children,
              [BLOCKS.OL_LIST]: (nestedListNode) => {
                const UnTaggedChildren = documentToReactComponents(
                  nestedListNode as unknown as any,
                  {
                    renderNode: {
                      [BLOCKS.PARAGRAPH]: (_, children) => children,
                      [BLOCKS.LIST_ITEM]: (_, children) => (
                        <ListItem>{children}</ListItem>
                      ),
                      [BLOCKS.OL_LIST]: (_, children) => (
                        <OrderedList>{children}</OrderedList>
                      ),
                      [BLOCKS.UL_LIST]: (_, children) => (
                        <UnorderedList>{children}</UnorderedList>
                      ),
                      [INLINES.HYPERLINK]: ({ data }, children) => (
                        <Hyperlink uri={data.uri}>{children}</Hyperlink>
                      ),
                    },
                  }
                );

                return <OrderedList>{UnTaggedChildren}</OrderedList>;
              },
              [BLOCKS.UL_LIST]: (nestedListNode) => {
                const UnTaggedChildren = documentToReactComponents(
                  nestedListNode as unknown as any,
                  {
                    renderNode: {
                      [BLOCKS.PARAGRAPH]: (_, children) => children,
                      [BLOCKS.LIST_ITEM]: (_, children) => (
                        <ListItem>{children}</ListItem>
                      ),
                      [BLOCKS.OL_LIST]: (_, children) => children,
                      [BLOCKS.UL_LIST]: (_, children) => children,
                      [INLINES.HYPERLINK]: ({ data }, children) => (
                        <Hyperlink uri={data.uri}>{children}</Hyperlink>
                      ),
                    },
                  }
                );

                return <UnorderedList>{UnTaggedChildren}</UnorderedList>;
              },
              [INLINES.HYPERLINK]: ({ data }, children) => (
                <Hyperlink uri={data.uri}>{children}</Hyperlink>
              ),
            },
          }
        );

        return <ListItem>{UnTaggedChildren}</ListItem>;
      },
    },
  };

  return (
    <article className="flex flex-col gap-y-2 text-2xl break-words font-merriweather">
      {documentToReactComponents(richtext.json, options)}
    </article>
  );
};
