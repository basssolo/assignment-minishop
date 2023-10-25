import { QueryResolvers } from "./generated/graphql.js";
import { orders } from "./orderDatabase.js";
import { products } from "./productDatabase.js";

export const queries: QueryResolvers = {
  orders: async (_parent, { customerId }, _context) => {
    return orders
      .filter((order) => order.customerId === customerId)
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  },
  products: async (_parent, _args, _context) => {
    return products.sort((a, b) => a.name.localeCompare(b.name));
  },
  order: async (_parent, { customerId, orderId }, _dataSources) => {
    return orders.find(
      (o) => o.customerId === customerId && o.orderId === orderId
    );
  },
};
