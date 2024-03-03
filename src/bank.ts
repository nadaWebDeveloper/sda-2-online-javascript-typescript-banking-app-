import { ICustomer, IBranch, ITransaction, IBank } from "./interface";

// 0- CLASS IDGENERATOR
class IdGenerator {
  private usedIds: Set<string> = new Set();

  generateUniqueId(): string {
    let id: string;

    do {
      id = this.generateRandomId();
    } while (this.usedIds.has(id));

    this.usedIds.add(id);
    return id;
  }

  private generateRandomId(): string {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*';
    const idLength = 10;
    let randomId = '';

    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  }
}

// 1- CLASS TRANSACTION
class Transaction implements ITransaction {
  amount: number;
  date: Date;
  constructor(amount: number) {
    if (amount <= 0) {
      console.error(
        `Transaction can not have negative amount or Zero [ ${amount} ]`
      );
    }
    this.amount = amount;
    this.date = new Date();
  }
}

// 2- CLASS CUSTOMER
class Customer implements ICustomer {
  name: string;
  id: string;
  numberUser:string;
  transaction: Transaction[];
  constructor(name: string,id: string) {
    const idGenerator = new IdGenerator();
    this.name = name;
    this.id = id;
    this.numberUser = idGenerator.generateUniqueId();
    this.transaction = [];
  }

  getName(): string {
    return this.name;
  }

  getId(): string {
    return this.id;
  }

  getTransactions() {
    return this.transaction;
  }

  getBalance() {
    let balance = this.getTransactions().reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
    return balance > 0
      ? `Total of Balance is: ${balance}`
      : `Your Bank Account Is Empty`;
  }

  addTransaction(amount: number) {
    const transaction = new Transaction(amount);
    const result = amount <= 0 ? false : this.transaction.push(transaction);
    const transactionString = JSON.stringify(this.transaction);
    const isDone = result
      ? `\nThe transaction is successful for this amount[ ${amount} ] Added to ${this.name} Account\n${transactionString}\n`
      : `\nThe transaction is Failed for negative amount or Zero[ ${amount} ]\n`;
    return isDone;
  }
}

// 3- CLASS BRANCH
class Branch implements IBranch {
  nameBranch: string;
  customers: Customer[];
  constructor(nameBranch: string) {
    this.nameBranch = nameBranch;
    this.customers = [];
  }

  getBranchName(): string {
    return this.nameBranch;
  }

  getCustomers(): Customer[] {
    return this.customers;
  }

  addCustomer(customer: Customer): boolean {
    const existingCustomer = this.getCustomers().find(
      (customerI) => customerI.getId() === customer.getId()
    );
    if (!existingCustomer) {
      this.getCustomers().push(customer);
      console.log(
        `------------------------------------------------------------------`
      );
      console.log(this.customers);
      return true;
    } else {
      console.log(
        `------------------------------------------------------------------`
      );
      console.log(this.customers);
      return false;
    }
  }

  addCustomerTransaction(customerId: string, amount: number): boolean {
    const IndexCustomer = this.getCustomers().findIndex(
      (customer) => customer.getId() === customerId
    );

    const findCustomer = this.getCustomers().find(
      (customer) => customer.getId() === customerId
    );
    findCustomer === undefined
      ? console.log(`Not Have Any Data To This User By ID: ${customerId}`)
      : console.log(findCustomer);
    if (IndexCustomer === -1) {
      console.log(
        `Customer with id ${customerId} not found in ${this.nameBranch}`
      );
      console.log(
        `------------------------------------------------------------------`
      );
      return false;
    } else {
      console.log(this.getCustomers()[IndexCustomer].addTransaction(amount));
      return true;
    }
  }
}

// 4- CLASS BANK
class Bank implements IBank {
  nameBank: string;
  branches: Branch[];
  constructor(nameBank: string) {
    this.nameBank = nameBank;
    this.branches = [];
  }

  getNameBank(): string {
    return this.nameBank;
  }

  getBranches(): Branch[] {
    return this.branches;
  }

  addBranch(branch: Branch): boolean {
    let existedBranch = this.checkBranch(branch);
    if (!existedBranch) {
      this.branches.push(branch);
      console.log(`Branch: ${branch.getBranchName()} Added Successfully`);
      return true;
    } else {
      console.log(
        `------------------------------------------------------------------`
      );
      console.warn(`Branch: ${branch.getBranchName()} Already Exist`);
      return false;
    }
  }

  addCustomer(branch: Branch, customer: Customer): boolean {
    if (this.checkBranch(branch)) {
      const existingCustomer = branch.addCustomer(customer);
      if (existingCustomer) {
        console.log(
          `Added New Customer [${customer.getName()}] with ID [${customer.getId()}] Added to ${branch.getBranchName()}'s Branch`
        );
        return true;
      } else {
        console.warn(
          `Customer: [ ${customer.getName()} ] ID:[ ${customer.getId()} ] already exists`
        );
        console.log(
          `------------------------------------------------------------------`
        );
        return false;
      }
    } else {
      console.log(
        `------------------------------------------------------------------`
      );
      console.warn(`The Branch ${branch.getBranchName()} Is not found On Bank`);
      console.log(
        `------------------------------------------------------------------`
      );
      return false;
    }
  }

  addCustomerTransaction(
    branch: Branch,
    customerId: string,
    amount: number
  ): string | undefined {
    const foundBranch = this.findBranchByName(branch.getBranchName());
    console.log(
      `------------------------------------------------------------------`
    );
    console.log(foundBranch);
    const targetBranch = this.checkBranch(branch);
    if (targetBranch) {
      return branch.addCustomerTransaction(customerId, amount)
        ? `On ${branch.getBranchName()}`
        : `${branch.getBranchName()} Is Not Found`;
    }
  }

  findBranchByName(branchName: string): Branch | string {
    const branch = this.branches.find(
      (branch) =>
        branch.getBranchName().toLowerCase() === branchName.toLowerCase()
    );
    return branch
      ? `The Branch :${branch.getBranchName()} Is Founded `
      : `The Branch :${branchName} Is Not Founded`;
  }

  checkBranch(branch: Branch): boolean {
    return this.branches.includes(branch);
  }

  listCustomers(branch: Branch, includeTransactions: boolean): void {
    if (this.checkBranch(branch)) {
      console.log(
        `\n---------------------------------${this.nameBank} bank ${branch.getBranchName()}---------------------------------`
      );
      console.log(
        `------------------------------Customers of ${branch.getBranchName()}:------------------------------------`
      );
      const customers = branch.getCustomers();
      customers.forEach((customer) => {
        console.log(
          `Customer: Id: ${customer.getId()} | name: ${customer.getName()}`
        );
        if (includeTransactions) {
          let transactions = customer.getTransactions();
          transactions.length > 0
            ? console.log(transactions)
            : console.log(
                `[ You have not made any transactions on your bank account ]`
              );
          console.log(
            `------------------------------------------------------------------`
          );
        }
      });
    } else {
      console.error(`The Branch: ${branch.getBranchName()}Is Not Found`);
    }
  }

  searchCustomer(branch: Branch, searchCustomer: string ): void {
    if (this.checkBranch(branch)) {
      let customers = branch.getCustomers();
      let result = customers.filter((customer) => {
        return (  customer
          .getName()
          .toLowerCase()
          .includes(searchCustomer.toLowerCase()) ||
          customer.getId().toString().includes(searchCustomer));
      });
      console.log(
        `------------------------------------------------------------------`
      );
      console.log('Search Result: ');
      result.length > 0 ? console.log(result) : console.log(`No Customer Found such [${searchCustomer}] On Branch: [${branch.getBranchName()}]`);
      console.log(
        `------------------------------------------------------------------`
      );
    } else {
      console.log(`${branch.getBranchName()} Not Found This Branch`);
    }
  }
}

export { Transaction, Customer, Branch, Bank };

const arizonaBank = new Bank("Arizona");
const westBranch = new Branch("West Branch");
const sunBranch = new Branch("Sun Branch");
const testBranch = new Branch("test Branch");



const customer1 = new Customer("John", '678');
const customer2 = new Customer("Anna", '779');
const customer3 = new Customer("John", '908');
const customer4 = new Customer("nada", '8');

arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(sunBranch);
arizonaBank.addBranch(westBranch);

arizonaBank.findBranchByName("bank");
arizonaBank.findBranchByName("sun");

arizonaBank.addCustomer(westBranch, customer1);
arizonaBank.addCustomer(westBranch, customer3);
console.log(arizonaBank.addCustomer(testBranch, customer3));
console.log(arizonaBank.addCustomer(sunBranch, customer1));
arizonaBank.addCustomer(sunBranch, customer1);
arizonaBank.addCustomer(sunBranch, customer2);
console.log(arizonaBank.addCustomer(sunBranch, customer2));
console.log(arizonaBank);

arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);
console.log(arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000));
console.log(arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), -2000));
console.log(arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000));
console.log(
  arizonaBank.addCustomerTransaction(westBranch, customer4.getId(), 4000)
);


customer1.addTransaction(0);
console.log(customer1.getBalance());
console.log(customer3.getBalance());
console.log(arizonaBank.listCustomers(westBranch, true));
console.log(arizonaBank.listCustomers(sunBranch, true));
console.log(arizonaBank);
console.log(arizonaBank.searchCustomer(westBranch,'john'));

