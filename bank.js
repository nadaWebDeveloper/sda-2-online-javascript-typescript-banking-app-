// 1- CLASS TRANSACTION
class Transaction {
    amount;
    date;
    constructor(amount) {
     if (amount < 0) {
        throw("Transaction can not have negative amount");
      }
     try {
        this.amount = amount;
        this.date =  new Date();
     } catch (error) {
        console.error(error);
     }
    }
  
  }
  
  const t1 = new Transaction(90);
