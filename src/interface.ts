import { Transaction, Customer, Branch } from "./bank";
// - INTERFACE CUSTOMER
export interface ICustomer {
  name: string;
  id: string;
  transaction: Transaction[];
  getName(): string;
  getId(): string;
  getTransactions(): Transaction[];
  getBalance(): string;
  addTransaction(amount: number): string;
}
// - INTERFACE BRANCH
export interface IBranch {
  nameBranch: string;
  customers: Customer[];
  getBranchName(): string;
  getCustomers(): Customer[];
  addCustomer(customer: Customer): boolean;
  // addCustomerTransaction(customerId: number, amount: number): string;
}
// - INTERFACE TRANSACTION
export interface ITransaction {
  amount: number;
  date: Date;
}
// - INTERFACE BANK
export interface IBank {
  nameBank: string;
  branches: Branch[];
  getNameBank(): string;
  getBranches(): Branch[];
  addBranch(branch: Branch): boolean ;
  addCustomer(branch: Branch, customer: Customer): boolean ;
  addCustomerTransaction(
    branch: Branch,
    customerId: string,
    amount: number
  ): string | undefined;
  findBranchByName(branchName: string): Branch | string;
  checkBranch(branch: Branch): boolean;
  listCustomers(branch: Branch, includeTransactions: boolean): void;
  searchCustomer(branch: Branch, searchCustomer: string): void;
}
