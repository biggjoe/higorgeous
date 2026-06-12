import json
import re
import subprocess
from pathlib import Path


ROOT = Path('c:/projects/nextprojects/higorgeous').resolve()


def run_eslint():
    result = subprocess.run(
        ['npx', 'eslint', 'src/app', '--ext', '.ts,.tsx', '--format', 'json'],
        capture_output=True,
        text=True,
        cwd=ROOT,
        shell=False,
    )
    return json.loads(result.stdout) if result.stdout.strip() else []


def remove_import_unused(line: str, unused_names: set[str]):
    # Handles named imports such as: import { A, B } from 'x';
    import_match = re.match(r'^(import\s+(?:type\s+)?(?:[^\s,]+\s*,\s*)?(?:\{(?P<specs>[^}]*)\}|(?P<default>[^\s,]+))(?P<rest>.*?))$', line)
    if not import_match:
        return None

    specs = import_match.group('specs')
    default = import_match.group('default')
    if specs is not None:
        parts = [p.strip() for p in specs.split(',') if p.strip()]
        keep = [p for p in parts if p.split(' as ')[-1].strip() not in unused_names]
        if keep:
            return line.replace(specs, ', '.join(keep))
        return None

    if default is not None and default in unused_names:
        return None
    return line


def update_destructured_signature(line: str, unused_names: set[str]):
    sig = re.search(r'function\s+\w+\s*\(([^)]*)\)', line)
    if not sig:
        return line
    params = sig.group(1)
    destruct_match = re.search(r'\(\{\s*([^}]*)\s*\}\s*:\s*(\{[^)]*\})\)', params)
    if not destruct_match:
        return line

    names = [n.strip().split('=')[0].strip().split(' as ')[-1].strip()
             for n in destruct_match.group(1).split(',') if n.strip()]
    keep = [n for n in names if n not in unused_names]
    if len(keep) == len(names):
        return line

    replacement = ', '.join(keep) if keep else ''
    new_params = params
    if keep:
        new_params = new_params.replace(destruct_match.group(1), replacement)
    else:
        # replace the whole destructured parameter with an empty object
        new_params = new_params.replace(destruct_match.group(0), '({}: ' + destruct_match.group(2) + ')')
    return line.replace(params, new_params)


def update_assignment_declaration(line: str, unused_names: set[str]):
    # const [a, b] = useState(...)
    arr_match = re.match(r'^(\s*(?:const|let|var)\s+)\[(.*)\]\s*=.*$', line)
    if arr_match:
        parts = [p.strip().split('=')[0].strip() for p in arr_match.group(2).split(',') if p.strip()]
        keep = [p for p in parts if p not in unused_names]
        if len(keep) != len(parts):
            if keep:
                rest = line.split('=', 1)[1]
                return f"{arr_match.group(1)}[{', '.join(keep)}] = {rest.lstrip()}"
            return None

    # const { a, b } = ...
    obj_match = re.match(r'^(\s*(?:const|let|var)\s+)\{(.*)\}\s*=.*$', line)
    if obj_match:
        parts = [p.strip().split('=')[0].strip() for p in obj_match.group(2).split(',') if p.strip()]
        keep = [p for p in parts if p not in unused_names]
        if len(keep) != len(parts):
            if keep:
                rest = line.split('=', 1)[1]
                return f"{obj_match.group(1)}{{{', '.join(keep)}}} = {rest.lstrip()}"
            return None

    # const foo = ...
    simple_match = re.match(r'^(\s*(?:const|let|var)\s+)([A-Za-z_][A-Za-z0-9_]*)(\s*=.*)$', line)
    if simple_match and simple_match.group(2) in unused_names:
        return None

    return line


def main():
    items = run_eslint()

    for entry in items:
        file_path = Path(entry['filePath'])
        if not file_path.exists():
            continue

        lines = file_path.read_text(encoding='utf-8').splitlines()
        issues_by_line = {}
        for msg in entry.get('messages', []):
            if msg.get('ruleId') not in ('@typescript-eslint/no-unused-vars', 'no-unused-vars'):
                continue
            name_match = re.search(r"'([^']+)'", msg.get('message', ''))
            if not name_match:
                continue
            issues_by_line.setdefault(msg['line'] - 1, set()).add(name_match.group(1))

        changed = False
        for line_no in sorted(issues_by_line.keys(), reverse=True):
            unused_names = issues_by_line[line_no]
            line = lines[line_no]
            stripped = line.strip()

            if stripped.startswith('import '):
                new_line = remove_import_unused(line, unused_names)
                if new_line is None:
                    lines[line_no] = ''
                    changed = True
                    continue
                if new_line != line:
                    lines[line_no] = new_line
                    changed = True
                    continue

            new_line = update_destructured_signature(line, unused_names)
            if new_line != line:
                lines[line_no] = new_line
                changed = True
                continue

            new_line = update_assignment_declaration(line, unused_names)
            if new_line is None:
                lines[line_no] = ''
                changed = True
                continue
            if new_line != line:
                lines[line_no] = new_line
                changed = True

        if changed:
            cleaned = '\n'.join([ln for ln in lines if ln.strip() != '']).rstrip() + '\n'
            file_path.write_text(cleaned, encoding='utf-8')


if __name__ == '__main__':
    main()
