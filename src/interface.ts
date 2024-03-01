import { Transaction, Customer, Branch } from "./bank";
// - INTERFACE CUSTOMER
export interface ICustomer {
  name: string;
  id: number;
  Transaction: Transaction[];
  getName(): string;
  getId(): number;
  getTransactions(): Transaction[];
  getBalance(): string;
  addTransaction(amount: number): string;
}
// - INTERFACE BRANCH
export interface IBranch {
  nameBranch: string;
  Customers: Customer[];
  getBranchName(): string;
  getCustomers(): Customer[];
  addCustomer(customer: Customer): boolean;
  addCustomerTransaction(customerId: number, amount: number): boolean;
}
// - INTERFACE TRANSACTION
export interface ITransaction {
  amount: number;
  date: Date;
}
// - INTERFACE BANK
export interface IBank {
  nameBank: string;
  Branches: Branch[];
  getName(): string;
  getBranches(): Branch[];
  addBranch(branch: Branch): boolean | undefined;
  addCustomer(branch: Branch, customer: Customer): boolean | undefined;
  addCustomerTransaction(
    branch: Branch,
    customerId: number,
    amount: number
  ): string | undefined;
  findBranchByName(branchName: string): Branch | string;
  checkBranch(branch: Branch): boolean;
  listCustomers(branch: Branch, includeTransactions: boolean): void;
  searchCustomer(branch: Branch, searchCustomer: string): void;
}
