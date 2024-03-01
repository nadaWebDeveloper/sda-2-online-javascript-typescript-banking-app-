"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank = exports.Branch = exports.Customer = exports.Transaction = void 0;
// 1- CLASS TRANSACTION
class Transaction {
    constructor(amount) {
        if (amount <= 0) {
            console.error(`Transaction can not have negative amount or Zero [ ${amount} ]`);
        }
        this.amount = amount;
        this.date = new Date();
    }
}
exports.Transaction = Transaction;
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
    getTransactions() {
        return this.Transaction;
    }
    getBalance() {
        let balance = this.getTransactions().reduce((total, transaction) => total + transaction.amount, 0);
        return `Total of Balance is: ${balance}`;
    }
    addTransaction(amount) {
        const transaction = new Transaction(amount);
        const result = amount <= 0 ? false : this.Transaction.push(transaction);
        const transactionString = JSON.stringify(this.Transaction);
        const isDone = result
            ? `\nThe transaction is successful for this amount[ ${amount} ] Added to ${this.name} Account\n${transactionString}\n`
            : `\nThe transaction is Failed for negative amount or Zero[ ${amount} ]\n`;
        return isDone;
    }
}
exports.Customer = Customer;
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
        // this.Customers.includes(customer);
        const existingCustomer = this.getCustomers().find((customerI) => customerI.getId() === customer.getId());
        console.log(existingCustomer);
        if (!existingCustomer) {
            this.getCustomers().push(customer);
            console.log(this.Customers);
            return true;
        }
        else {
            console.log(`Customer: ${customer.getName()} ID: ${customer.getId()} already exists`);
            return false;
        }
    }
    addCustomerTransaction(customerId, amount) {
        const IndexCustomer = this.getCustomers().findIndex((customer) => customer.getId() === customerId);
        IndexCustomer === -1
            ? `Customer with id ${customerId} not found in ${this.nameBranch}`
            : this.getCustomers()[IndexCustomer].addTransaction(amount);
        return true;
    }
}
exports.Branch = Branch;
// 4- CLASS BANK
class Bank {
    constructor(nameBank) {
        this.nameBank = nameBank;
        this.Branches = [];
    }
    getName() {
        return this.nameBank;
    }
    getBranches() {
        return this.Branches;
    }
    addBranch(branch) {
        let existedBranch = this.checkBranch(branch);
        if (!existedBranch) {
            this.Branches.push(branch);
            console.log(`${branch.getBranchName()} added successfully`);
            return true;
        }
        else {
            console.log(`${branch.getBranchName()} already exist`);
            return false;
        }
    }
    addCustomer(branch, customer) {
        if (this.checkBranch(branch)) {
            branch.addCustomer(customer);
            console.log(`Customer ${customer.getName()} with id ${customer.getId()} added to ${branch.getBranchName()}`);
            return true;
        }
        else {
            console.log(`The Branch ${branch.getBranchName()} Is not found On Bank`);
            return false;
        }
    }
    addCustomerTransaction(branch, customerId, amount) {
        //  const targetBranch = this.findBranchByName(branch.getBranchName());
        const targetBranch = this.checkBranch(branch);
        if (targetBranch) {
            return branch.addCustomerTransaction(customerId, amount)
                ? `On ${branch.getBranchName()}`
                : `${branch.getBranchName()} Is Not Found`;
        }
    }
    findBranchByName(branchName) {
        const branch = this.Branches.find((branch) => branch.getBranchName().toLowerCase() === branchName.toLowerCase());
        return branch
            ? `The Branch :${branch.getBranchName()} Is Founded `
            : `The Branch :${branchName} Is Not Founded`;
    }
    checkBranch(branch) {
        return this.Branches.includes(branch);
    }
    listCustomers(branch, includeTransactions) {
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
                        console.log(`amount:${transaction["amount"]} date:${transaction["date"]}`);
                    }
                    console.log("____________");
                }
            }
        }
        else {
            console.error(`The ${branch.getBranchName()}is not found`);
        }
    }
}
exports.Bank = Bank;
const arizonaBank = new Bank("Arizona");
const westBranch = new Branch("West Branch");
const sunBranch = new Branch("Sun Branch");
const customer1 = new Customer("John", 1);
const customer2 = new Customer("Anna", 2);
const customer3 = new Customer("John", 3);
arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(sunBranch);
arizonaBank.addBranch(westBranch);
arizonaBank.findBranchByName("bank");
arizonaBank.findBranchByName("sun");
arizonaBank.addCustomer(westBranch, customer1);
arizonaBank.addCustomer(westBranch, customer3);
arizonaBank.addCustomer(sunBranch, customer1);
arizonaBank.addCustomer(sunBranch, customer2);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);
customer1.addTransaction(-1000);
console.log(customer1.getBalance());
console.log(arizonaBank.listCustomers(westBranch, true));
console.log(arizonaBank.listCustomers(sunBranch, true));
console.log(arizonaBank);
