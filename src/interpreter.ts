export type TraceStep = {
  line: number;
  note: string;
  variables: Record<string, number>;
};

export type RunResult = {
  variables: Record<string, number>;
  output: string[];
  path: string;
  steps: TraceStep[];
};

type SourceLine = { indent: number; text: string; number: number };
type Statement =
  | { kind: "assign"; name: string; expression: string; line: number }
  | { kind: "print"; expression: string; line: number }
  | { kind: "if"; condition: string; yes: Statement[]; no: Statement[]; line: number }
  | { kind: "for"; name: string; count: string; body: Statement[]; line: number };

type Token = { kind: "number" | "name" | "operator" | "left" | "right"; value: string };

export class SyntaxProblem extends Error {}

function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let position = 0;

  while (position < source.length) {
    const rest = source.slice(position);
    const whitespace = rest.match(/^\s+/);
    if (whitespace) {
      position += whitespace[0].length;
      continue;
    }
    const number = rest.match(/^\d+/);
    if (number) {
      tokens.push({ kind: "number", value: number[0] });
      position += number[0].length;
      continue;
    }
    const name = rest.match(/^[A-Za-z_][A-Za-z0-9_]*/);
    if (name) {
      tokens.push({ kind: "name", value: name[0] });
      position += name[0].length;
      continue;
    }
    const operator = rest.match(/^(\/\/|==|!=|<=|>=|[+\-*%<>])/);
    if (operator) {
      tokens.push({ kind: "operator", value: operator[0] });
      position += operator[0].length;
      continue;
    }
    if (rest[0] === "(") {
      tokens.push({ kind: "left", value: "(" });
      position += 1;
      continue;
    }
    if (rest[0] === ")") {
      tokens.push({ kind: "right", value: ")" });
      position += 1;
      continue;
    }
    throw new SyntaxProblem(`“${rest[0]}” is not in the supported grammar.`);
  }
  return tokens;
}

function evaluateExpression(source: string, variables: Record<string, number>): number {
  const tokens = tokenize(source);
  let index = 0;

  const peek = () => tokens[index];
  const take = () => tokens[index++];

  const primary = (): number => {
    const token = take();
    if (!token) throw new SyntaxProblem("This expression ends too soon.");
    if (token.kind === "number") return Number(token.value);
    if (token.kind === "name") {
      if (!(token.value in variables)) throw new SyntaxProblem(`Set ${token.value} before using it.`);
      return variables[token.value];
    }
    if (token.kind === "left") {
      const value = comparison();
      if (take()?.kind !== "right") throw new SyntaxProblem("A closing parenthesis is missing.");
      return value;
    }
    throw new SyntaxProblem(`“${token.value}” cannot start a value.`);
  };

  const unary = (): number => {
    if (peek()?.kind === "operator" && peek().value === "-") {
      take();
      return -unary();
    }
    return primary();
  };

  const multiply = (): number => {
    let value = unary();
    while (peek()?.kind === "operator" && ["*", "//", "%"].includes(peek().value)) {
      const operator = take().value;
      const right = unary();
      if ((operator === "//" || operator === "%") && right === 0) {
        throw new SyntaxProblem("Division by zero stops this trace. Change the divisor.");
      }
      if (operator === "*") value *= right;
      if (operator === "//") value = Math.floor(value / right);
      if (operator === "%") value = ((value % right) + right) % right;
    }
    return value;
  };

  const add = (): number => {
    let value = multiply();
    while (peek()?.kind === "operator" && ["+", "-"].includes(peek().value)) {
      const operator = take().value;
      const right = multiply();
      value = operator === "+" ? value + right : value - right;
    }
    return value;
  };

  const comparison = (): number => {
    const left = add();
    if (peek()?.kind !== "operator" || !["==", "!=", "<", "<=", ">", ">="].includes(peek().value)) return left;
    const operator = take().value;
    const right = add();
    const result =
      operator === "==" ? left === right :
      operator === "!=" ? left !== right :
      operator === "<" ? left < right :
      operator === "<=" ? left <= right :
      operator === ">" ? left > right : left >= right;
    return result ? 1 : 0;
  };

  if (tokens.length === 0) throw new SyntaxProblem("Add a value after the operator.");
  const value = comparison();
  if (index !== tokens.length) throw new SyntaxProblem(`Check the expression near “${tokens[index].value}”.`);
  if (!Number.isSafeInteger(value) || Math.abs(value) > 1_000_000) {
    throw new SyntaxProblem("Keep results between -1,000,000 and 1,000,000.");
  }
  return value;
}

function sourceLines(code: string): SourceLine[] {
  if (code.length > 500) throw new SyntaxProblem("Keep the snippet under 500 characters.");
  if (code.includes("\t")) throw new SyntaxProblem("Use four spaces instead of tabs.");
  const lines = code.split("\n")
    .map((raw, index) => ({ raw: raw.replace(/\s+$/, ""), number: index + 1 }))
    .filter(({ raw }) => raw.trim().length > 0)
    .map(({ raw, number }) => {
      const indent = raw.length - raw.trimStart().length;
      if (indent % 4 !== 0) throw new SyntaxProblem(`Line ${number} needs groups of four spaces.`);
      return { indent, text: raw.trimStart(), number };
    });
  if (lines.length === 0) throw new SyntaxProblem("The snippet is empty. Restore the puzzle to keep tracing.");
  if (lines.length > 14) throw new SyntaxProblem("Keep the snippet to 14 lines or fewer.");
  return lines;
}

function parse(code: string): Statement[] {
  const lines = sourceLines(code);

  const block = (start: number, indent: number): [Statement[], number] => {
    const statements: Statement[] = [];
    let cursor = start;
    while (cursor < lines.length) {
      const current = lines[cursor];
      if (current.indent < indent) break;
      if (current.indent > indent) throw new SyntaxProblem(`Line ${current.number} is indented without a block.`);
      if (current.text === "else:") break;

      const assignment = current.text.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);
      const print = current.text.match(/^print\((.+)\)$/);
      const condition = current.text.match(/^if\s+(.+):$/);
      const loop = current.text.match(/^for\s+([A-Za-z_][A-Za-z0-9_]*)\s+in\s+range\((.+)\):$/);

      if (condition) {
        const [yes, afterYes] = block(cursor + 1, indent + 4);
        if (yes.length === 0) throw new SyntaxProblem(`Line ${current.number} needs an indented line below it.`);
        cursor = afterYes;
        let no: Statement[] = [];
        if (lines[cursor]?.indent === indent && lines[cursor]?.text === "else:") {
          const [parsedNo, afterNo] = block(cursor + 1, indent + 4);
          if (parsedNo.length === 0) throw new SyntaxProblem(`Line ${lines[cursor].number} needs an indented line below it.`);
          no = parsedNo;
          cursor = afterNo;
        }
        statements.push({ kind: "if", condition: condition[1], yes, no, line: current.number });
        continue;
      }
      if (loop) {
        const [body, afterBody] = block(cursor + 1, indent + 4);
        if (body.length === 0) throw new SyntaxProblem(`Line ${current.number} needs an indented line below it.`);
        statements.push({ kind: "for", name: loop[1], count: loop[2], body, line: current.number });
        cursor = afterBody;
        continue;
      }
      if (print) {
        statements.push({ kind: "print", expression: print[1], line: current.number });
        cursor += 1;
        continue;
      }
      if (assignment) {
        statements.push({ kind: "assign", name: assignment[1], expression: assignment[2], line: current.number });
        cursor += 1;
        continue;
      }
      throw new SyntaxProblem(`Line ${current.number} is outside the supported grammar.`);
    }
    return [statements, cursor];
  };

  const [statements, cursor] = block(0, 0);
  if (cursor !== lines.length) throw new SyntaxProblem(`Check line ${lines[cursor].number}.`);
  return statements;
}

export function runSnippet(code: string): RunResult {
  const statements = parse(code);
  const variables: Record<string, number> = {};
  const output: string[] = [];
  const branches: string[] = [];
  const steps: TraceStep[] = [];
  let work = 0;

  const snapshot = (line: number, note: string) => {
    steps.push({ line, note, variables: { ...variables } });
  };

  const execute = (items: Statement[]) => {
    for (const statement of items) {
      work += 1;
      if (work > 100) throw new SyntaxProblem("This trace has too many steps. Use a smaller loop.");
      if (statement.kind === "assign") {
        variables[statement.name] = evaluateExpression(statement.expression, variables);
        snapshot(statement.line, `${statement.name} becomes ${variables[statement.name]}.`);
      } else if (statement.kind === "print") {
        const value = evaluateExpression(statement.expression, variables);
        output.push(String(value));
        snapshot(statement.line, `Prints ${value}.`);
      } else if (statement.kind === "if") {
        const yes = evaluateExpression(statement.condition, variables) !== 0;
        branches.push(yes ? "If path" : "Else path");
        snapshot(statement.line, yes ? "The condition is true." : "The condition is false.");
        execute(yes ? statement.yes : statement.no);
      } else {
        const count = evaluateExpression(statement.count, variables);
        if (count < 0 || count > 20) throw new SyntaxProblem("range() must be between 0 and 20.");
        branches.push(`Loop ${count} ${count === 1 ? "time" : "times"}`);
        snapshot(statement.line, `The loop will run ${count} ${count === 1 ? "time" : "times"}.`);
        for (let value = 0; value < count; value += 1) {
          variables[statement.name] = value;
          execute(statement.body);
        }
      }
    }
  };

  execute(statements);
  return { variables, output, path: branches.join(" → ") || "Straight path", steps };
}
