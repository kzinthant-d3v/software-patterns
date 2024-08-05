// Handler interface
interface SupportHandler {
  setNext(handler: SupportHandler): SupportHandler;
  handleRequest(issue: SupportTicket): void;
}

// Support Ticket class
class SupportTicket {
  constructor(public issueType: IssueType, public description: string) {}
}

// Issue types
enum IssueType {
  GENERAL,
  TECHNICAL,
  BILLING,
}

// Abstract SupportHandler class
abstract class AbstractSupportHandler implements SupportHandler {
  protected nextHandler: SupportHandler | null = null;

  public setNext(handler: SupportHandler): SupportHandler {
    this.nextHandler = handler;
    return handler;
  }

  public handleRequest(issue: SupportTicket): void {
    if (this.nextHandler) {
      this.nextHandler.handleRequest(issue);
    }
  }

  protected abstract processIssue(issue: SupportTicket): void;
}

// Concrete Handler: Level1Support
class Level1Support extends AbstractSupportHandler {
  protected processIssue(issue: SupportTicket): void {
    console.log(`Level 1 support handling general issue: ${issue.description}`);
  }

  public handleRequest(issue: SupportTicket): void {
    if (issue.issueType === IssueType.GENERAL) {
      this.processIssue(issue);
    } else {
      super.handleRequest(issue);
    }
  }
}

// Concrete Handler: Level2Support
class Level2Support extends AbstractSupportHandler {
  protected processIssue(issue: SupportTicket): void {
    console.log(`Level 2 support handling technical issue: ${issue.description}`);
  }

  public handleRequest(issue: SupportTicket): void {
    if (issue.issueType === IssueType.TECHNICAL) {
      this.processIssue(issue);
    } else {
      super.handleRequest(issue);
    }
  }
}

// Concrete Handler: Level3Support
class Level3Support extends AbstractSupportHandler {
  protected processIssue(issue: SupportTicket): void {
    console.log(`Level 3 support handling billing issue: ${issue.description}`);
  }

  public handleRequest(issue: SupportTicket): void {
    if (issue.issueType === IssueType.BILLING) {
      this.processIssue(issue);
    } else {
      super.handleRequest(issue);
    }
  }
}

// Usage
function setupSupportChain(): SupportHandler {
  const level1Support = new Level1Support();
  const level2Support = new Level2Support();
  const level3Support = new Level3Support();

  level1Support.setNext(level2Support).setNext(level3Support);
  return level1Support;
}

const supportChain = setupSupportChain();

const generalIssue = new SupportTicket(IssueType.GENERAL, "Password reset request");
const technicalIssue = new SupportTicket(IssueType.TECHNICAL, "Software installation problem");
const billingIssue = new SupportTicket(IssueType.BILLING, "Incorrect billing amount");

console.log("Processing support tickets:");

supportChain.handleRequest(generalIssue);
// Output: Level 1 support handling general issue: Password reset request

supportChain.handleRequest(technicalIssue);
// Output: Level 2 support handling technical issue: Software installation problem

supportChain.handleRequest(billingIssue);
// Output: Level 3 support handling billing issue: Incorrect billing amount
