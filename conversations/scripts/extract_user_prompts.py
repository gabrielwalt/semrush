#!/usr/bin/env python3
"""
Extract only user prompts from a chat-history .md file.
Usage: python3 extract_user_prompts.py <chat-history.md> <output.md>
"""

import sys
import re


def extract_user_prompts(input_path, output_path):
    """Extract user messages from chat history markdown."""
    with open(input_path, 'r') as f:
        content = f.read()

    # Split on message headers: ### User [...] or ### Assistant [...]
    # Pattern: ### User [timestamp] or ### Assistant [timestamp]
    sections = re.split(r'\n### (User|Assistant)\s*(?:\[[^\]]*\])?\n', content)

    # sections[0] is the header, then alternating: role, text, role, text...
    prompts = []
    i = 1
    while i < len(sections) - 1:
        role = sections[i]
        text = sections[i + 1]
        if role == 'User':
            prompts.append(text.strip())
        i += 2

    # Build header from original file
    header_match = re.match(r'(#.*?)\n## Conversation', content, re.DOTALL)
    header = header_match.group(1).strip() if header_match else '# User Prompts'

    lines = []
    lines.append(f'# User Prompts Only')
    lines.append(f'')
    lines.append(f'Source: {input_path}')
    lines.append(f'Prompts: {len(prompts)}')
    lines.append('')

    # Include metadata from header
    for line in header.split('\n')[1:]:  # skip first '# Chat History'
        if line.strip():
            lines.append(line)
    lines.append('')
    lines.append('---')
    lines.append('')

    for i, prompt in enumerate(prompts, 1):
        lines.append(f'## Prompt {i}')
        lines.append('')
        lines.append(prompt)
        lines.append('')
        lines.append('---')
        lines.append('')

    output = '\n'.join(lines)
    with open(output_path, 'w') as f:
        f.write(output)

    print(f'Extracted {len(prompts)} user prompts → {output_path}')
    return len(prompts)


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print(f'Usage: {sys.argv[0]} <chat-history.md> <output.md>')
        sys.exit(1)
    extract_user_prompts(sys.argv[1], sys.argv[2])
