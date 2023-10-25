import { Order } from "./generated/graphql";
import { getProduct } from "./productDatabase.js";

export const orders: Order[] = [
  {
    orderId: "order-2",
    timestamp: "2023-08-22T15:05:10+0000",
    customerId: "customer-1",
    products: [
      { product: getProduct("2000570800008"), amount: 3 },
      { product: getProduct("2000609200007"), amount: 1 },
      { product: getProduct("2000632900004"), amount: 7 },
    ],
    totalSum: 14.68,
  },
  {
    orderId: "order-1",
    timestamp: "2023-08-25T13:08:16+0000",
    customerId: "customer-2",
    products: [
      {
        product: getProduct("2000559900002"),
        amount: 12,
      },
      {
        product: getProduct("2005029300009"),
        amount: 10,
      },
    ],
    totalSum: 4.0,
  },
  {
    orderId: "order-3",
    timestamp: "2023-08-28T10:01:16+0000",
    customerId: "customer-1",
    products: [
      { product: getProduct("2000519200005"), amount: 8 },
      { product: getProduct("2000503700009"), amount: 6 },
      { product: getProduct("2000632900004"), amount: 1 },
      { product: getProduct("2005029300009"), amount: 4 },
    ],
    totalSum: 8.47,
  },
];
