// 1- CLASS TRANSACTION
class Transaction {
  constructor(amount) {
    if (amount < 0) {
        console.error(`Transaction can not have negative amount ${amount}`);
    }else{    
    try {
      this.amount = amount;
      this.date = new Date();
    } catch (error) {
      console.error(error);
    }}
  }
}

// 1- CLASS CUSTOMER
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

  getBalance(){
    let balance = this.Transaction.reduce((total,transaction)=> total + transaction.amount,0);
    return `Total of Balance is: ${balance}`
  }

  addTransaction(amount){
      const transaction = new Transaction(amount);
      const result = amount < 0 ? false :this.Transaction.push(transaction);
      const transactionString = JSON.stringify(this.Transaction);
      const isDone = result ? `\nThe transaction is successful for this amount[ ${amount} ]\n${transactionString}\n`:`\nThe transaction is Failed for this amount[ ${amount} ]\n`;
      return isDone;
  }
}


const c2 = new Customer('nada', '11283');
c2.addTransaction(8970);
const gg=c2.addTransaction(960);
const hhh=c2.addTransaction(-675);
const ll =c2.getBalance();
console.log(ll);
console.log(gg);
console.log(hhh);