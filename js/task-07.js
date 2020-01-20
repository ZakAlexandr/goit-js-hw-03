//task-07

// Напиши скрипт управления личным кабинетом интернет банка. Есть объект account в котором необходимо реализовать методы для работы с балансом и историей транзакций.
'use strict';

/*
 * Типов транзацкий всего два.
 * Можно положить либо снять деньги со счета.
 */
const Transaction = {
    DEPOSIT: 'deposit',
    WITHDRAW: 'withdraw',
  };
  
  /*
   * Каждая транзакция это объект со свойствами: id, type и amount
   */
  
  const account = {
    // Текущий баланс счета
    balance: 0,
  
    // История транзакций
    transactions: [],
  
    /*
     * Метод создает и возвращает объект транзакции.
     * Принимает сумму и тип транзакции.
     */

    createTransaction(id,amount, type) {
      const transaction ={
        id,
        type,
        amount
      }
      this.transactions.push(transaction);

    },
  
    /*
     * Метод отвечающий за добавление суммы к балансу.
     * Принимает сумму танзакции.
     * Вызывает createTransaction для создания объекта транзакции
     * после чего добавляет его в историю транзакций
     */
    deposit(amount) {
      this.createTransaction(this.transactions.length+1,amount,Transaction.DEPOSIT);
      this.balance += amount;
      return `Ваш счет пополнен на ${amount}$`;
    },
    /*
     * Метод отвечающий за снятие суммы с баланса.
     * Принимает сумму танзакции.
     * Вызывает createTransaction для создания объекта транзакции
     * после чего добавляет его в историю транзакций.
     *
     * Если amount больше чем текущий баланс, выводи сообщение
     * о том, что снятие такой суммы не возможно, недостаточно средств.
     */
    withdraw(amount) {
      if(this.balance > amount){
        this.balance = this.balance-amount;
        this.createTransaction(this.transactions.length+1,amount,Transaction.WITHDRAW);
        return `Вы успешно сняли ${amount}$`
      }
      else{
        return 'Cнятие такой суммы не возможно, недостаточно средств';
      }
    },
  
    /*
     * Метод возвращает текущий баланс
     */
    getBalance() {
      return `На вашем счету ${this.balance}$`;
    },
  
    /*
     * Метод ищет и возвращает объект транзации по id
     */
    getTransactionDetails(id) {
      for (let arr of this.transactions){
        for(let key in arr){
          if(arr[key] === id){
            return arr;
          }
        }
      }

    },
    /*
     * Метод возвращает количество средств
     * определенного типа транзакции из всей истории транзакций
     */
    getTransactionTotal(type) {
      if (type === Transaction.WITHDRAW){
        let total = 0;
          for (let arr of this.transactions){
            for(let key in arr){
              if(arr[key] === 'withdraw'){
                total += arr.amount;  
              }
            }
          }
          return `Всего было снято ${total}$`;
      }
      if (type === Transaction.DEPOSIT){
        let total = 0;
          for (let arr of this.transactions){
            for(let key in arr){
              if(arr[key] === 'deposit'){
                total += arr.amount;  
              }
            }
          }
          return `Всего залито денег:${total}$`;
      }
    },
  };

console.log(account.deposit(100));
console.log(account.deposit(200));


console.log(account.withdraw(10));
console.log(account.withdraw(30));


console.log(account.getBalance());
console.log(account.getTransactionDetails(1));
console.log(account.getTransactionTotal(Transaction.WITHDRAW));
console.log(account.getTransactionTotal(Transaction.DEPOSIT));
console.log(account.transactions);