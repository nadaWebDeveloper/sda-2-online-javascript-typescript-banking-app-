// 1- CLASS TRANSACTION
class Transaction {
  constructor(amount) {
    if (amount <= 0) {
      console.error(
        `Transaction can not have negative amount or Zero [ ${amount} ]`
      );
    } else {
      try {
        this.amount = amount;
        this.date = new Date();
      } catch (error) {
        console.error(error);
      }
    }
  }
}

// 2- CLASS CUSTOMER
class Customer {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.Transaction = [];
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getTransaction() {
    return this.Transaction;
  }

  getBalance() {
    let balance = this.Transaction.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
    return `Total of Balance is: ${balance}`;
  }

  addTransaction(amount) {
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
class Branch {
  constructor(nameBranch) {
    this.nameBranch = nameBranch;
    this.Customers = [];
  }

  getBranchName() {
    return this.nameBranch;
  }

  getCustomers() {
    return this.Customers;
  }

  addCustomer(customer) {
    const existingCustomer = this.Customers.includes(customer);
    console.log(existingCustomer);
    if (!existingCustomer) {
      this.Customers.push(customer);
      return this.Customers;
    } else {
      return `customer already exists`;
    }

    // if(!this.Customers.includes(customer)){
    //     const result = this.Customers.push(customer);
    //     return result> 0 ? true: false;
    // }
  }

  addCustomerTransaction(customerId, amount) {
    const customer = this.Customers.find(
      (customer) => customer.id === customerId
    );
    customer ? customer.addTransaction(amount) : false;
  }
}

// 4- CLASS BANK
class Bank {
  constructor(nameBank) {
    this.nameBank = nameBank;
    this.Branches = [];
  }

  addBranch(branch){
  if(!this.Branches.includes(branch)){
        const result = this.Branches.push(branch);
        return result> 0 ? true: false;
    }
  }

  addCustomer(branch, customer){
    if(this.Branches.includes(branch)){
        const result = branch.addCustomer(customer);
        return result > 0 ? true: false;
    }
  }

  addCustomerTransaction(branch, customerId, amount){
   const targetBranch = this.findBranchByName(branch.nameBranch);
   if(targetBranch){
    targetBranch.addCustomerTransaction(customerId,amount);
   }

  }

  findBranchByName(branchName){
    return this.Branches.find((branch) => branch.nameBranch === branchName);
  }

  checkBranch(branch){
    return this.Branches.includes(branch)
  }

  listCustomers(branch, includeTransactions){

  }
}



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

arizonaBank.addCustomerTransaction(westBranch, customer1.getId, 3000)
arizonaBank.addCustomerTransaction(westBranch, customer1.getId, 2000)
arizonaBank.addCustomerTransaction(westBranch, customer2.getId, 3000)

customer1.addTransaction(-1000)
console.log(customer1.getBalance())
console.log(arizonaBank.listCustomers(westBranch, true))
console.log(arizonaBank.listCustomers(sunBranch,true))
console.log(arizonaBank);
