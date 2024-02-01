import { Injectable, type OnModuleDestroy, type OnModuleInit } from '@nestjs/common'
import { type Prisma, PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit(): Promise<void> {
    await this.$connect()
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect()
  }

  async middlewareSoftDelete(): Promise<void> {
    this.$use(async (params, next) => {
      if (params.action === 'delete') {
        params.action = 'update'
        params.args.data = { deletedAt: new Date() }
      }

      if (params.action === 'deleteMany') {
        params.action = 'updateMany'
        if (params.args.data !== undefined) {
          params.args.data.deletedAt = new Date()
        } else {
          params.args.data = { deletedAt: new Date() }
        }
      }

      return next(params)
    })
  }

  async middlewareListSoftDelete(): Promise<void> {
    this.$use(async (params, next) => {
      if (params.action === 'findUnique' || params.action === 'findFirst') {
        params.action = 'findFirst'
        if (!params.args.where.deletedAt) {
          params.args.where = {
            ...params.args.where,
            deletedAt: null
          }
        }
      }

      if (params.action === 'findMany') {
        if (params.args.where) {
          if (params.args.where.deletedAt === undefined) {
            params.args.where = {
              ...params.args.where,
              deletedAt: null
            }
          }
        } else {
          params.args.where = { ...params.args.where, deletedAt: null }
        }
      }

      if (params.action === 'aggregate' && params.dataPath.includes('_count')) {
        if (params.args.where !== undefined) {
          if (params.args.where.deletedAt === undefined) {
            params.args.where = { ...params.args.where, deletedAt: null }
          }
        } else {
          params.args.where = { ...params.args.where, deletedAt: null }
        }
      }

      return next(params)
    })
  }

  private readonly deleteMiddleware: Prisma.Middleware = async (params, next) => {
    if (params.action === 'delete') {
      return next({
        ...params,
        action: 'update',
        args: {
          ...params.args,
          data: {
            deletedAt: new Date()
          }
        }
      })
    }

    return next(params)
  }

  private readonly findMiddleware: Prisma.Middleware = async (params, next) => {
    if (params.action === 'findUnique' || params.action === 'findFirst') {
      return next({
        ...params,
        action: 'findFirst',
        args: {
          ...params.args,
          where: {
            ...params.args?.where,
            deletedAt: null
          }
        }
      })
    }

    if (params.action === 'findMany') {
      return next({
        ...params,
        args: {
          ...params.args,
          where: {
            ...params.args?.where,
            deletedAt: null
          }
        }
      })
    }

    return next(params)
  }

  constructor() {
    super()
    this.$use(this.findMiddleware)
    this.$use(this.deleteMiddleware)
  }
}
