/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Field as RichTextField } from '@/components/Fields/RichText';
import MarkdownLabel from '@/components/Fields/MarkdownLabel';
import Markdown from '@/components/Fields/Markdown';
import { escapeAngleBracket } from '@/components/Fields/RichText/lib/parse';

const initialValue = `# Heading!\n\nsomething **with markdown**. Perhaps [a link]('place')\n\n\n- and a\n- list\n\n\nThat has other elements following it.\n\n\n1. Numbered\n1. Elements\n\n\n&gt; A block quote that should not render.\n\n&gt; HTML angle bracket\n\nNow some meaningful whitespace:\n\n<br>\n\n\n<br>\n\n\n<br>\n\n\n...ok?\n\n---\n\nHorizontal line\n`;

export default {
  title: 'Fields/RichText',
  args: {
    hasError: false,
  },
  argTypes: {
    initialValue: { control: null },
    inline: { control: null },
  },
};

const meta = {
  invalid: false,
  touched: false,
};

const errorMeta = {
  ...meta,
  error: 'Something was not right about the input',
  invalid: true,
  touched: true,
};

export const Primary = {
  render: ({ initialValue, hasError, ...args }) => {
    const [value, onChange] = useState(initialValue);

    const props = {
      ...args,
      input: {
        value,
        onChange,
      },
      meta: hasError ? errorMeta : meta,
    };

    return (
      <>
        <RichTextField {...props} />
        <div style={{ display: 'flex', width: '100%' }}>
          <div
            style={{ padding: '1rem', margin: '1rem', border: '1px solid white', flex: '1 1 33%' }}
          >
            <h4>Raw React-Markdown:</h4>
            <ReactMarkdown>{escapeAngleBracket(value)}</ReactMarkdown>
          </div>
          <div
            style={{ padding: '1rem', margin: '1rem', border: '1px solid white', flex: '1 1 33%' }}
          >
            <h4>Markdown:</h4>
            <Markdown label={value} />
          </div>
          <div
            style={{ padding: '1rem', margin: '1rem', border: '1px solid white', flex: '1 1 33%' }}
          >
            <h4>Markdown Label:</h4>
            <MarkdownLabel label={value} />
          </div>
        </div>
        <div style={{ margin: '2rem 0' }}>
          <h4>Raw Markdown:</h4>
          <pre>{JSON.stringify({ value }, null, 2)}</pre>
        </div>
      </>
    );
  },

  args: {
    initialValue,
  },
};

export const Inline = {
  render: ({ initialValue, hasError, ...args }) => {
    const [value, onChange] = useState(initialValue);

    const props = {
      ...args,
      input: {
        value,
        onChange,
      },
      meta: hasError ? errorMeta : meta,
    };

    return (
      <>
        <RichTextField {...props} />
        <div style={{ display: 'flex', width: '100%' }}>
          <div
            style={{ padding: '1rem', margin: '1rem', border: '1px solid white', flex: '1 1 33%' }}
          >
            <h4>Raw React-Markdown:</h4>
            <ReactMarkdown>{escapeAngleBracket(value)}</ReactMarkdown>
          </div>
          <div
            style={{ padding: '1rem', margin: '1rem', border: '1px solid white', flex: '1 1 33%' }}
          >
            <h4>Markdown:</h4>
            <Markdown label={value} />
          </div>
          <div
            style={{ padding: '1rem', margin: '1rem', border: '1px solid white', flex: '1 1 33%' }}
          >
            <h4>Markdown Label:</h4>
            <MarkdownLabel label={value} />
          </div>
        </div>
        <div style={{ margin: '2rem 0' }}>
          <h4>Raw Markdown:</h4>
          <pre>{JSON.stringify({ value }, null, 2)}</pre>
        </div>
      </>
    );
  },

  args: {
    inline: true,
  },
};

export const DisallowedTypes = {
  render: ({ initialValue, hasError, ...args }) => {
    const [value, onChange] = useState(initialValue);

    const props = {
      ...args,
      input: {
        value,
        onChange,
      },
      meta: hasError ? errorMeta : meta,
    };

    return (
      <>
        <RichTextField {...props} />
        <div style={{ display: 'flex', width: '100%' }}>
          <div
            style={{ padding: '1rem', margin: '1rem', border: '1px solid white', flex: '1 1 33%' }}
          >
            <h4>Raw React-Markdown:</h4>
            <ReactMarkdown>{escapeAngleBracket(value)}</ReactMarkdown>
          </div>
          <div
            style={{ padding: '1rem', margin: '1rem', border: '1px solid white', flex: '1 1 33%' }}
          >
            <h4>Markdown:</h4>
            <Markdown label={value} />
          </div>
          <div
            style={{ padding: '1rem', margin: '1rem', border: '1px solid white', flex: '1 1 33%' }}
          >
            <h4>Markdown Label:</h4>
            <MarkdownLabel label={value} />
          </div>
        </div>
        <div style={{ margin: '2rem 0' }}>
          <h4>Raw Markdown:</h4>
          <pre>{JSON.stringify({ value }, null, 2)}</pre>
        </div>
      </>
    );
  },

  args: {
    disallowedTypes: ['quote', 'history'],
  },
};

export const EmptyValues = {
  render: ({ initialValue, hasError, ...args }) => {
    const [value, onChange] = useState(initialValue);

    const props = {
      ...args,
      input: {
        value,
        onChange,
      },
      meta: hasError ? errorMeta : meta,
    };

    return (
      <>
        <RichTextField {...props} />
        <div style={{ display: 'flex', width: '100%' }}>
          <div
            style={{ padding: '1rem', margin: '1rem', border: '1px solid white', flex: '1 1 33%' }}
          >
            <h4>Raw React-Markdown:</h4>
            <ReactMarkdown>{escapeAngleBracket(value)}</ReactMarkdown>
          </div>
          <div
            style={{ padding: '1rem', margin: '1rem', border: '1px solid white', flex: '1 1 33%' }}
          >
            <h4>Markdown:</h4>
            <Markdown label={value} />
          </div>
          <div
            style={{ padding: '1rem', margin: '1rem', border: '1px solid white', flex: '1 1 33%' }}
          >
            <h4>Markdown Label:</h4>
            <MarkdownLabel label={value} />
          </div>
        </div>
        <div style={{ margin: '2rem 0' }}>
          <h4>Raw Markdown:</h4>
          <pre>{JSON.stringify({ value }, null, 2)}</pre>
        </div>
      </>
    );
  },

  args: {
    initialValue: ' ',
  },
};
