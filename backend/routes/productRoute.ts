import { FastifyInstance } from "fastify";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController";

async function userRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    url: "/products",
    handler: createProduct,
  });
  fastify.route({
    method: "PUT",
    url: "/products/:id",
    handler: updateProduct,
  });
  fastify.route({
    method: "DELETE",
    url: "/products/:id",
    handler: deleteProduct,
  });
  fastify.route({
    method: "GET",
    url: "/products/:id",
    handler: getSingleProduct,
  });
  fastify.route({
    method: "GET",
    url: "/products",
    handler: getProducts,
  });
}

export default userRoutes;
