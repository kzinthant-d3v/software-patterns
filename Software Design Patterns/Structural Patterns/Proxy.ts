// Subject interface
interface SecureData {
  fetchData(): string;
}

// Real Subject: RealSecureData
class RealSecureData implements SecureData {
  private data: string;

  constructor() {
    this.data = "Sensitive Information";
  }

  public fetchData(): string {
    return this.data;
  }
}


// Proxy: SecureDataProxy
class SecureDataProxy implements SecureData {
  private realSecureData: RealSecureData;
  private userRole: string;

  constructor(userRole: string) {
    this.realSecureData = new RealSecureData();
    this.userRole = userRole;
  }

  public fetchData(): string {
    if (this.hasAccess()) {
      return this.realSecureData.fetchData();
    } else {
      return "Access Denied: You do not have the necessary permissions.";
    }
  }

  private hasAccess(): boolean {
    // Check if the user has the required role to access the data
    return this.userRole === "admin" || this.userRole === "manager";
  }
}

// Usage
function accessData(userRole: string) {
  const secureDataProxy = new SecureDataProxy(userRole);
  console.log(`User with role '${userRole}' attempting to access data:`);
  console.log(secureDataProxy.fetchData());
}

accessData("admin");
// Output:
// User with role 'admin' attempting to access data:
// Sensitive Information

accessData("manager");
// Output:
// User with role 'manager' attempting to access data:
// Sensitive Information

accessData("user");
// Output:
// User with role 'user' attempting to access data:
// Access Denied: You do not have the necessary permissions.
