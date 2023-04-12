import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import {
  badRequestResponse,
  errorResponse,
  mutationSuccessResponse,
  getSuccessResponse,
} from "../utility/responseJson";

const prisma = new PrismaClient();

enum UnitOptionType {
  SHEET = "SHEET",
  ROLL = "ROLL",
  PCS = "PCS",
}

export async function createProduct(
  req: FastifyRequest<{
    Body: {
      id: string;
      name: string;
      desc: string;
      price: number;
      unitOption: UnitOptionType;
    };
  }>,
  rep: FastifyReply
) {
  const { id, name, price, desc, unitOption } = req.body;
  try {
    if (!id || !name || typeof price !== "number" || !desc) {
      return badRequestResponse(rep, "Invalid request body!");
    }

    console.log("REQUESTBODY", req.body);

    if (unitOption in UnitOptionType) {
      const product = await prisma.product.create({
        data: {
          id,
          name,
          desc,
          price,
          unitOption,
        },
      });

      return mutationSuccessResponse(rep, product);
    }

    return badRequestResponse(rep, "Unit option undefine!");
  } catch (err: any) {
    return errorResponse(rep, err.message);
  }
}

export async function updateProduct(
  req: FastifyRequest<{
    Body: {
      id: string;
      name: string;
      desc: string;
      price: number;
      unitOption: UnitOptionType;
    };
  }>,
  rep: FastifyReply
) {
  const { id, name, price, desc, unitOption } = req.body;
  try {
    if (!id || !name || typeof price !== "number" || !desc) {
      return badRequestResponse(rep, "Invalid request body!");
    }

    console.log("REQUESTBODY", req.body);

    if (unitOption in UnitOptionType) {
      const product = await prisma.product.update({
        data: {
          id,
          name,
          desc,
          price,
          unitOption,
        },
        where: {
          id,
        },
      });

      return mutationSuccessResponse(rep, product);
    }

    return badRequestResponse(rep, "Unit option undefine!");
  } catch (err: any) {
    return errorResponse(rep, err.message);
  }
}

export async function deleteProduct(
  req: FastifyRequest<{
    Params: { id: string };
  }>,
  rep: FastifyReply
) {
  try {
    const { id } = req.params;
    const product = await prisma.product.delete({
      where: {
        id: id,
      },
    });

    mutationSuccessResponse(rep, product);
  } catch (err: any) {
    return errorResponse(rep, err.message);
  }
}

export async function getSingleProduct(
  req: FastifyRequest<{
    Params: { id: string };
  }>,
  rep: FastifyReply
) {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    getSuccessResponse(rep, product);
  } catch (err: any) {
    return errorResponse(rep, err.message);
  }
}

export async function getProducts(
  req: FastifyRequest<{
    Querystring: { keyword: string; page: number; limit: number };
  }>,
  rep: FastifyReply
) {
  const { keyword, limit, page } = req.query;
  try {
    if (!page || !limit) {
      return badRequestResponse(rep, "Invalid query params!");
    }
    const product = await prisma.product.findMany({
      where: {
        name: {
          contains: keyword,
          mode: "insensitive",
        },
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });
    const totalData = await prisma.product.count({
      where: {
        name: {
          contains: keyword,
          mode: "insensitive",
        },
      },
    });

    getSuccessResponse(rep, product, { totalData });
  } catch (err: any) {
    return errorResponse(rep, err.message);
  }
}
