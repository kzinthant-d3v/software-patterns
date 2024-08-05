// Memento class
class EditorState {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  public getContent(): string {
    return this.content;
  }
}

// Originator class
class TextEditor {
  private content: string = "";

  public type(words: string): void {
    this.content += words;
  }

  public getContent(): string {
    return this.content;
  }

  public save(): EditorState {
    return new EditorState(this.content);
  }

  public restore(state: EditorState): void {
    this.content = state.getContent();
  }
}

// Caretaker class
class EditorHistory {
  private history: EditorState[] = [];

  public push(state: EditorState): void {
    this.history.push(state);
  }

  public pop(): EditorState | undefined {
    return this.history.pop();
  }
}

// Usage
const editor = new TextEditor();
const history = new EditorHistory();

console.log("Typing in the text editor:");
editor.type("Hello, ");
history.push(editor.save());

editor.type("world!");
history.push(editor.save());

console.log(editor.getContent()); // Output: Hello, world!

console.log("\nUndoing last action:");
editor.restore(history.pop()!);
console.log(editor.getContent()); // Output: Hello,

console.log("\nUndoing last action:");
editor.restore(history.pop()!);
console.log(editor.getContent()); // Output:
