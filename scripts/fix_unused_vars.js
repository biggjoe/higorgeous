const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = process.cwd();

function runEslint() {
  const result = spawnSync('C:\\Windows\\System32\\cmd.exe', ['/d', '/s', '/c', 'npx eslint src/app --ext .ts,.tsx --format json'], {
    cwd: root,
    encoding: 'utf8',
  });

  const stdout = result.stdout || '';
  return JSON.parse(stdout || '[]');
}

function removeImportUnused(line, unusedNames) {
  const importMatch = line.match(/^(import\s+(?:type\s+)?(?:[^\s,]+\s*,\s*)?(?:\{(?<specs>[^}]*)\}|(?<default>[^\s,]+))(?<rest>.*?))$/);
  if (!importMatch) return null;

  const specs = importMatch.groups.specs;
  const defaultName = importMatch.groups.default;
  if (specs !== undefined) {
    const parts = specs.split(',').map((p) => p.trim()).filter(Boolean);
    const keep = parts.filter((p) => !unusedNames.has(p.split(' as ').pop().trim()));
    if (keep.length) {
      return line.replace(specs, keep.join(', '));
    }
    return null;
  }

  if (defaultName && unusedNames.has(defaultName)) {
    return null;
  }
  return line;
}

function updateDestructuredSignature(line, unusedNames) {
  const sig = line.match(/function\s+\w+\s*\(([^)]*)\)/);
  if (!sig) return line;

  const params = sig[1];
  const destructMatch = params.match(/\(\{\s*([^}]*)\s*\}\s*:\s*(\{[^)]*\})\)/);
  if (!destructMatch) return line;

  const names = destructMatch[1].split(',').map((n) => n.trim()).filter(Boolean).map((n) => n.split('=')[0].trim().split(' as ').pop().trim());
  const keep = names.filter((name) => !unusedNames.has(name));
  if (keep.length === names.length) return line;

  const replacement = keep.length ? keep.join(', ') : '';
  let newParams = params;
  if (keep.length) {
    newParams = newParams.replace(destructMatch[1], replacement);
  } else {
    const typeAnnotation = destructMatch[2];
    newParams = newParams.replace(destructMatch[0], '({}: ' + typeAnnotation + ')');
  }
  return line.replace(params, newParams);
}

function updateAssignmentDeclaration(line, unusedNames) {
  const arrMatch = line.match(/^(\s*(?:const|let|var)\s+)\[(.*)\]\s*=.*$/);
  if (arrMatch) {
    const parts = arrMatch[2].split(',').map((p) => p.trim()).filter(Boolean).map((p) => p.split('=')[0].trim());
    const keep = parts.filter((name) => !unusedNames.has(name));
    if (keep.length !== parts.length) {
      if (keep.length) {
        const rest = line.split('=')[1];
        return `${arrMatch[1]}[${keep.join(', ')}] =${rest}`;
      }
      return null;
    }
  }

  const objMatch = line.match(/^(\s*(?:const|let|var)\s+)\{(.*)\}\s*=.*$/);
  if (objMatch) {
    const parts = objMatch[2].split(',').map((p) => p.trim()).filter(Boolean).map((p) => p.split('=')[0].trim());
    const keep = parts.filter((name) => !unusedNames.has(name));
    if (keep.length !== parts.length) {
      if (keep.length) {
        const rest = line.split('=')[1];
        return `${objMatch[1]}{${keep.join(', ')}} =${rest}`;
      }
      return null;
    }
  }

  const simpleMatch = line.match(/^(\s*(?:const|let|var)\s+)([A-Za-z_][A-Za-z0-9_]*)(\s*=.*)$/);
  if (simpleMatch && unusedNames.has(simpleMatch[2])) return null;

  return line;
}

function main() {
  const items = runEslint();

  for (const entry of items) {
    const filePath = path.resolve(root, entry.filePath.replace(/^C:\\projects\\nextprojects\\higorgeous\\/, ''));
    if (!fs.existsSync(filePath)) continue;

    const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
    const issuesByLine = {};

    for (const msg of entry.messages || []) {
      if (!['@typescript-eslint/no-unused-vars', 'no-unused-vars'].includes(msg.ruleId)) continue;
      const nameMatch = msg.message.match(/'([^']+)'/);
      if (!nameMatch) continue;
      const name = nameMatch[1];
      if (!issuesByLine[msg.line - 1]) issuesByLine[msg.line - 1] = new Set();
      issuesByLine[msg.line - 1].add(name);
    }

    let changed = false;
    for (const lineNo of Object.keys(issuesByLine).sort((a, b) => Number(b) - Number(a))) {
      const unusedNames = issuesByLine[lineNo];
      let line = lines[Number(lineNo)];
      let stripped = line.trim();

      if (stripped.startsWith('import ')) {
        const newLine = removeImportUnused(line, unusedNames);
        if (newLine === null) {
          lines[Number(lineNo)] = '';
          changed = true;
          continue;
        }
        if (newLine !== line) {
          lines[Number(lineNo)] = newLine;
          changed = true;
          continue;
        }
      }

      const sigUpdated = updateDestructuredSignature(line, unusedNames);
      if (sigUpdated !== line) {
        lines[Number(lineNo)] = sigUpdated;
        changed = true;
        continue;
      }

      const declUpdated = updateAssignmentDeclaration(line, unusedNames);
      if (declUpdated === null) {
        lines[Number(lineNo)] = '';
        changed = true;
        continue;
      }
      if (declUpdated !== line) {
        lines[Number(lineNo)] = declUpdated;
        changed = true;
      }
    }

    if (changed) {
      const cleaned = lines.filter((ln) => ln.trim() !== '').join('\n').trimEnd() + '\n';
      fs.writeFileSync(filePath, cleaned, 'utf8');
    }
  }
}

main();
