// Command interface
interface Command {
  execute(): void;
  undo(): void;
}


// Receiver: TextEditor
class TextEditor {
  private text: string = "";

  public type(words: string): void {
    this.text += words;
  }

  public deleteLast(words: string): void {
    if (this.text.endsWith(words)) {
      this.text = this.text.slice(0, -words.length);
    }
  }

  public getText(): string {
    return this.text;
  }
}

// Concrete Command: TypeCommand
class TypeCommand implements Command {
  private editor: TextEditor;
  private words: string;

  constructor(editor: TextEditor, words: string) {
    this.editor = editor;
    this.words = words;
  }

  public execute(): void {
    this.editor.type(this.words);
  }

  public undo(): void {
    this.editor.deleteLast(this.words);
  }
}

// Concrete Command: DeleteCommand
class DeleteCommand implements Command {
  private editor: TextEditor;
  private words: string;

  constructor(editor: TextEditor, words: string) {
    this.editor = editor;
    this.words = words;
  }

  public execute(): void {
    this.editor.deleteLast(this.words);
  }

  public undo(): void {
    this.editor.type(this.words);
  }
}

// Invoker: CommandManager
class CommandManager {
  private commandHistory: Command[] = [];
  private redoStack: Command[] = [];

  public executeCommand(command: Command): void {
    command.execute();
    this.commandHistory.push(command);
    this.redoStack = []; // Clear redo stack after a new command
  }

  public undo(): void {
    const command = this.commandHistory.pop();
    if (command) {
      command.undo();
      this.redoStack.push(command);
    }
  }

  public redo(): void {
    const command = this.redoStack.pop();
    if (command) {
      command.execute();
      this.commandHistory.push(command);
    }
  }
}

// Usage
const editor = new TextEditor();
const commandManager = new CommandManager();

const typeHello = new TypeCommand(editor, "Hello, ");
const typeWorld = new TypeCommand(editor, "World!");
const deleteWorld = new DeleteCommand(editor, "World!");

console.log("Executing commands:");
commandManager.executeCommand(typeHello);
commandManager.executeCommand(typeWorld);
console.log(editor.getText()); // Output: Hello, World!

console.log("\nUndoing commands:");
commandManager.undo();
console.log(editor.getText()); // Output: Hello,

console.log("\nRedoing commands:");
commandManager.redo();
console.log(editor.getText()); // Output: Hello, World!

console.log("\nDeleting last word:");
commandManager.executeCommand(deleteWorld);
console.log(editor.getText()); // Output: Hello,

console.log("\nUndoing delete command:");
commandManager.undo();
console.log(editor.getText()); // Output: Hello, World!
