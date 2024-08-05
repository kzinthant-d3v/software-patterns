// Expression interface
interface Expression {
  interpret(context: Map<string, number>): number;
}

// Terminal Expression: NumberExpression
class NumberExpression implements Expression {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  public interpret(context: Map<string, number>): number {
    return this.value;
  }
}

// Non-terminal Expression: AdditionExpression
class AdditionExpression implements Expression {
  private leftExpression: Expression;
  private rightExpression: Expression;

  constructor(left: Expression, right: Expression) {
    this.leftExpression = left;
    this.rightExpression = right;
  }

  public interpret(context: Map<string, number>): number {
    return this.leftExpression.interpret(context) + this.rightExpression.interpret(context);
  }
}

// Non-terminal Expression: SubtractionExpression
class SubtractionExpression implements Expression {
  private leftExpression: Expression;
  private rightExpression: Expression;

  constructor(left: Expression, right: Expression) {
    this.leftExpression = left;
    this.rightExpression = right;
  }

  public interpret(context: Map<string, number>): number {
    return this.leftExpression.interpret(context) - this.rightExpression.interpret(context);
  }
}

// Usage
const context = new Map<string, number>();

// Represents the expression (5 + 2) - (3 + 1)
const expression: Expression = new SubtractionExpression(
  new AdditionExpression(new NumberExpression(5), new NumberExpression(2)),
  new AdditionExpression(new NumberExpression(3), new NumberExpression(1))
);

console.log("Result of expression (5 + 2) - (3 + 1):");
console.log(expression.interpret(context)); // Output: 3
