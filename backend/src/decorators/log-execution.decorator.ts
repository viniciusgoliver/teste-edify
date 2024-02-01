import { Inject } from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

export function LogExecution() {
  return (target: any, propertyKey: string, propertyDescriptor: PropertyDescriptor) => {
    const injector = Inject(WINSTON_MODULE_NEST_PROVIDER)
    injector(target, 'logger')
    const originalMethod = propertyDescriptor.value
    propertyDescriptor.value = async function (...data: any[]) {
      const result = await originalMethod.apply(this, data)
      this.logger.setContext(`${target.constructor.name}.${propertyKey}`)
      this.logger.log({ data, result })
      return result
    }
  }
}
