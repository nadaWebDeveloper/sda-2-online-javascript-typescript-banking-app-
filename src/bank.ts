import {ICustomer,IBranch,ITransaction,IBank} from './interface'

// 1- CLASS TRANSACTION
class Transaction implements ITransaction {
  amount:number;
  date:Date;
  constructor(amount:number) {
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
class Customer implements ICustomer{
  name:string;
  id:number;
  Transaction: Transaction[];
  constructor(name: string, id:number) {
    this.name = name;
    this.id = id;
    this.Transaction = [];
  }

  getName():string {
    return this.name;
  }

  getId():number {
    return this.id;
  }

  getTransactions() {
    return this.Transaction;
  }

  getBalance() {
    let balance = this.Transaction.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
    return `Total of Balance is: ${balance}`;
  }

  addTransaction(amount:number) {
    const transaction = new Transaction(amount);
    const result = amount <= 0 ? false : this.Transaction.push(transaction);
    const transactionString = JSON.stringify(this.Transaction);
    const isDone = result
      ? `\nThe transaction is successful for this amount[ ${amount} ]\n${transactionString}\n`
      : `\nThe transaction is Failed for this amount[ ${amount} ]\n`;
    return isDone;
  }
}

// 3- CLASS BRANCH
class Branch implements IBranch{
  nameBranch:string;
  Customers:Customer[];
  constructor(nameBranch:string) {
    this.nameBranch = nameBranch;
    this.Customers = [];
  }

  getBranchName():string {
    return this.nameBranch;
  }

  getCustomers(): Customer[] {
    return this.Customers;
  }

  addCustomer(customer:Customer): Customer[] | string {
    const existingCustomer = this.Customers.includes(customer);
    console.log(existingCustomer);
    if (!existingCustomer) {
      this.Customers.push(customer);
      return this.Customers;
    } else {
      return `customer already exists`;
    }
  }

  addCustomerTransaction(customerId:number, amount:number): void {
    const customer = this.Customers.find(
      (customer) => customer.id === customerId
    );
    customer ? customer.addTransaction(amount) : false;
  }
}

// 4- CLASS BANK
class Bank implements IBank{
  nameBank:string;
  Branches:Branch[];
  constructor(nameBank:string) {
    this.nameBank = nameBank;
    this.Branches = [];
  }

  addBranch(branch:Branch): boolean | undefined{
  if(!this.Branches.includes(branch)){
        const result = this.Branches.push(branch);
        return result> 0 ? true: false;
    }
  }

  addCustomer(branch:Branch, customer:Customer): boolean | undefined{
    if(this.Branches.includes(branch)){
        const result = branch.addCustomer(customer);
        return result ? true: false;
    }
  }

  addCustomerTransaction(branch:Branch, customerId:number, amount:number):boolean{
   const targetBranch = this.findBranchByName(branch.nameBranch);
   if(targetBranch){
    targetBranch.addCustomerTransaction(customerId,amount);
    return true;
   }
   return false;


  }

  findBranchByName(branchName:string): Branch | undefined{
    return this.Branches.find((branch) => branch.nameBranch === branchName);
  }

  checkBranch(branch:Branch): boolean{
    return this.Branches.includes(branch)
  }

  listCustomers(branch: Branch, includeTransactions: boolean): void {
    console.log(`_____${this.nameBank} bank ${branch.getBranchName()} list_____`);
    if (this.checkBranch(branch)) {
      console.log(branch.getBranchName());
      let customers = branch.getCustomers();
      for (let customer of customers) {
        console.log("customer: Id | name");
        console.log(`         ${customer.getId()}   ${customer.getName()}`);
  
        let transactions = customer.getTransactions();
  
        if (includeTransactions) {
          console.log(`transiactions:`);
          for (let transaction of transactions) {
            console.log(
              `amount:${transaction["amount"]} date:${transaction["date"]}`
            );
          }
          console.log("____________");
        }
      }
    } else {
      console.error(`The ${branch.getBranchName()}is not found`);
    }
  }
}

export  {Transaction,Customer,Branch, Bank};



const arizonaBank = new Bank("Arizona")
const westBranch = new Branch("West Branch")
const sunBranch = new Branch("Sun Branch")
const customer1 = new Customer("John", 1)
const customer2 = new Customer("Anna", 2)
const customer3 = new Customer("John", 3)

arizonaBank.addBranch(westBranch)
arizonaBank.addBranch(sunBranch)
arizonaBank.addBranch(westBranch) 

arizonaBank.findBranchByName("bank")
arizonaBank.findBranchByName("sun")

arizonaBank.addCustomer(westBranch, customer1)
arizonaBank.addCustomer(westBranch, customer3)
arizonaBank.addCustomer(sunBranch, customer1)
arizonaBank.addCustomer(sunBranch, customer2)
console.log(arizonaBank);

// arizonaBank.addCustomerTransaction(westBranch, customer1.getId, 3000)
// arizonaBank.addCustomerTransaction(westBranch, customer1.getId, 2000)
// arizonaBank.addCustomerTransaction(westBranch, customer2.getId, 3000)

// customer1.addTransaction(-1000)
// console.log(customer1.getBalance())
// console.log(arizonaBank.listCustomers(westBranch, true))
// console.log(arizonaBank.listCustomers(sunBranch,true))
console.log(arizonaBank);
