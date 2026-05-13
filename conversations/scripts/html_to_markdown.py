#!/usr/bin/env python3
"""
Convert Bedrock Conversation View HTML exports to Markdown.
Usage: python3 html_to_markdown.py <input.html> <output.md>
"""

import sys
import re
import html


def strip_tags(text):
    """Remove HTML tags and decode entities."""
    text = re.sub(r'<br\s*/?>', '\n', text, flags=re.IGNORECASE)
    text = re.sub(r'<[^>]+>', '', text)
    text = html.unescape(text)
    return text


def extract_text_from_element(html_content):
    """Extract readable text preserving basic structure."""
    # Convert common block elements to newlines
    content = re.sub(r'</(p|div|li|tr|td|th|h[1-6])>', '\n', html_content, flags=re.IGNORECASE)
    content = re.sub(r'<br\s*/?>', '\n', content, flags=re.IGNORECASE)
    # Convert headings
    for i in range(1, 7):
        content = re.sub(rf'<h{i}[^>]*>', '#' * i + ' ', content, flags=re.IGNORECASE)
    # Convert code blocks
    content = re.sub(r'<pre[^>]*><code[^>]*>', '\n```\n', content, flags=re.IGNORECASE)
    content = re.sub(r'</code></pre>', '\n```\n', content, flags=re.IGNORECASE)
    content = re.sub(r'<code[^>]*>', '`', content, flags=re.IGNORECASE)
    content = re.sub(r'</code>', '`', content, flags=re.IGNORECASE)
    # Convert bold/italic
    content = re.sub(r'<strong[^>]*>|<b[^>]*>', '**', content, flags=re.IGNORECASE)
    content = re.sub(r'</strong>|</b>', '**', content, flags=re.IGNORECASE)
    content = re.sub(r'<em[^>]*>|<i[^>]*>', '_', content, flags=re.IGNORECASE)
    content = re.sub(r'</em>|</i>', '_', content, flags=re.IGNORECASE)
    # Convert list items
    content = re.sub(r'<li[^>]*>', '- ', content, flags=re.IGNORECASE)
    # Convert links
    content = re.sub(r'<a[^>]*href="([^"]*)"[^>]*>([^<]*)</a>', r'[\2](\1)', content, flags=re.IGNORECASE)
    # Strip remaining tags
    content = re.sub(r'<[^>]+>', '', content)
    content = html.unescape(content)
    # Clean up whitespace
    content = re.sub(r'\n{3,}', '\n\n', content)
    content = re.sub(r' +', ' ', content)
    lines = [line.rstrip() for line in content.split('\n')]
    content = '\n'.join(lines)
    return content.strip()


def parse_html_conversation(html_path):
    """Parse a Bedrock Conversation View HTML into structured messages."""
    with open(html_path, 'r', errors='replace') as f:
        content = f.read()

    messages = []

    # Find all chat message elements using testid
    # Split on message boundaries
    msg_splits = list(re.finditer(r'data-testid="stChatMessage"', content))

    for i, match in enumerate(msg_splits):
        start = match.start()
        end = msg_splits[i + 1].start() if i + 1 < len(msg_splits) else len(content)
        chunk = content[start:end]

        # Determine role from aria-label
        if 'aria-label="Chat message from user"' in chunk:
            role = 'user'
        elif 'aria-label="Chat message from assistant"' in chunk:
            role = 'assistant'
        else:
            continue

        # Extract the message content div
        content_match = re.search(r'data-testid="stChatMessageContent"[^>]*>(.*)', chunk, re.DOTALL)
        if not content_match:
            continue

        msg_content = content_match.group(1)

        # Extract text
        text = extract_text_from_element(msg_content)
        if text:
            messages.append({'role': role, 'text': text})

    return messages


def convert_to_markdown(html_path, output_path):
    """Convert HTML conversation to Markdown."""
    messages = parse_html_conversation(html_path)

    lines = []
    # Extract metadata from HTML
    with open(html_path, 'r', errors='replace') as f:
        html_content = f.read()

    session_match = re.search(r'sessionID=([a-f0-9-]+)', html_content)
    session_id = session_match.group(1) if session_match else 'unknown'

    lines.append(f'# Conversation Detail')
    lines.append(f'')
    lines.append(f'Session ID: {session_id}')
    lines.append(f'Source: {html_path}')
    lines.append(f'Messages: {len(messages)}')
    lines.append(f'')
    lines.append('---')
    lines.append('')

    for i, msg in enumerate(messages):
        role_label = '## User' if msg['role'] == 'user' else '## Assistant'
        lines.append(role_label)
        lines.append('')
        lines.append(msg['text'])
        lines.append('')
        lines.append('---')
        lines.append('')

    output = '\n'.join(lines)
    with open(output_path, 'w') as f:
        f.write(output)

    print(f'Converted {len(messages)} messages → {output_path}')
    return len(messages)


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print(f'Usage: {sys.argv[0]} <input.html> <output.md>')
        sys.exit(1)
    convert_to_markdown(sys.argv[1], sys.argv[2])
