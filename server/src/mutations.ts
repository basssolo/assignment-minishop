import { MutationResolvers, Order } from "./generated/graphql.js";
import { orders } from "./orderDatabase.js";
import { getProduct } from "./productDatabase.js";

export const mutations: MutationResolvers = {
  /**
   * Creates new order with fresh product prices and total
   * @param { input }
   * @returns New order with all the calculated information
   */
  createOrder: async (_parent, { input }, _dataSources) => {
    // Calculate total with fresh prices from product database
    const totalSum = input.products.reduce((sum, orderedProduct) => {
      const productInfo = getProduct(orderedProduct.ean);
      return sum + productInfo.price * orderedProduct.amount;
    }, 0.0);

    // Create actual order object
    const newOrder: Order = {
      orderId: `order-${orders.length + 1}`, // TODO! Change this to proper id generation when using real database
      customerId: input.customerId,
      timestamp: new Date().toISOString(),
      products: input.products.map((p) => ({
        product: getProduct(p.ean),
        amount: p.amount,
      })),
      totalSum,
    };

    // Push object to in-memory orders database and return it
    orders.push(newOrder);
    return newOrder;
  },
};
