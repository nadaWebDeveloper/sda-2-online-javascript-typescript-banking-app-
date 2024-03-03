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
        return balance > 0
            ? `Total of Balance is: ${balance}`
            : `Your Bank Account Is Empty`;
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
        const existingCustomer = this.getCustomers().find((customerI) => customerI.getId() === customer.getId());
        if (!existingCustomer) {
            this.getCustomers().push(customer);
            console.log(`------------------------------------------------------------------`);
            console.log(this.Customers);
            return true;
        }
        else {
            console.log(`------------------------------------------------------------------`);
            console.log(this.Customers);
            return false;
        }
    }
    addCustomerTransaction(customerId, amount) {
        const IndexCustomer = this.getCustomers().findIndex((customer) => customer.getId() === customerId);
        const IndexCustomer0 = this.getCustomers().find((customer) => customer.getId() === customerId);
        IndexCustomer0 === undefined
            ? console.log(`Not Have Any Data To This User By ID: ${customerId}`)
            : console.log(IndexCustomer0);
        if (IndexCustomer === -1) {
            console.log(`Customer with id ${customerId} not found in ${this.nameBranch}`);
            console.log(`------------------------------------------------------------------`);
            return false;
        }
        else {
            console.log(this.getCustomers()[IndexCustomer].addTransaction(amount));
            return true;
        }
    }
}
exports.Branch = Branch;
// 4- CLASS BANK
class Bank {
    constructor(nameBank) {
        this.nameBank = nameBank;
        this.Branches = [];
    }
    getNameBank() {
        return this.nameBank;
    }
    getBranches() {
        return this.Branches;
    }
    addBranch(branch) {
        let existedBranch = this.checkBranch(branch);
        if (!existedBranch) {
            this.Branches.push(branch);
            console.log(`Branch: ${branch.getBranchName()} Added Successfully`);
            return true;
        }
        else {
            console.log(`------------------------------------------------------------------`);
            console.warn(`Branch: ${branch.getBranchName()} Already Exist`);
            return false;
        }
    }
    addCustomer(branch, customer) {
        if (this.checkBranch(branch)) {
            const existingCustomer = branch.addCustomer(customer);
            if (existingCustomer) {
                console.log(`Added New Customer [${customer.getName()}] with ID [${customer.getId()}] Added to ${branch.getBranchName()}'s Branch`);
                return true;
            }
            else {
                console.warn(`Customer: [ ${customer.getName()} ] ID:[ ${customer.getId()} ] already exists`);
                console.log(`------------------------------------------------------------------`);
                return false;
            }
        }
        else {
            console.log(`------------------------------------------------------------------`);
            console.warn(`The Branch ${branch.getBranchName()} Is not found On Bank`);
            console.log(`------------------------------------------------------------------`);
            return false;
        }
    }
    addCustomerTransaction(branch, customerId, amount) {
        const targetBranch2 = this.findBranchByName(branch.getBranchName());
        console.log(`------------------------------------------------------------------`);
        console.log(targetBranch2);
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
        if (this.checkBranch(branch)) {
            console.log(`\n---------------------------------${this.nameBank} bank ${branch.getBranchName()}---------------------------------`);
            console.log(`------------------------------Customers of ${branch.getBranchName()}:------------------------------------`);
            const customers = branch.getCustomers();
            customers.forEach((customer) => {
                console.log(`Customer: Id: ${customer.getId()} | name: ${customer.getName()}`);
                if (includeTransactions) {
                    let transactions = customer.getTransactions();
                    transactions.length > 0
                        ? console.log(transactions)
                        : console.log(`[ You have not made any transactions on your bank account ]`);
                    console.log(`------------------------------------------------------------------`);
                }
            });
        }
        else {
            console.error(`The Branch: ${branch.getBranchName()}Is Not Found`);
        }
    }
    searchCustomer(branch, searchCustomer) {
        if (this.checkBranch(branch)) {
            let customers = branch.getCustomers();
            let result = customers.filter((customer) => {
                return (customer
                    .getName()
                    .toLowerCase()
                    .includes(searchCustomer.toLowerCase()) ||
                    customer.getId().toString().includes(searchCustomer));
            });
            console.log('Search Result: ');
            result.length > 0 ? console.log(result) : console.log(`No Customer Found such [${searchCustomer}] On Branch: [${branch.getBranchName()}]`);
            console.log(`------------------------------------------------------------------`);
        }
        else {
            console.log(`${branch.getBranchName()} Not Found`);
        }
    }
}
exports.Bank = Bank;
const arizonaBank = new Bank("Arizona");
const westBranch = new Branch("West Branch");
const sunBranch = new Branch("Sun Branch");
const testBranch = new Branch("test Branch");
const customer1 = new Customer("John", 1);
const customer2 = new Customer("Anna", 2);
const customer3 = new Customer("John", 3);
const customer4 = new Customer("nada", 7);
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
console.log(arizonaBank.addCustomerTransaction(westBranch, customer4.getId(), 4000));
console.log(arizonaBank.searchCustomer(westBranch, 'John'));
console.log(arizonaBank);
customer1.addTransaction(0);
console.log(customer1.getBalance());
console.log(customer3.getBalance());
console.log(arizonaBank.listCustomers(westBranch, true));
console.log(arizonaBank.listCustomers(sunBranch, true));
console.log(arizonaBank);
