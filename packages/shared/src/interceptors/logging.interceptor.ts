import {
  injectable,
  Provider,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Next,
} from '@loopback/core';

@injectable()
export class LoggingInterceptor implements Provider<Interceptor> {
  value() {
    return this.intercept.bind(this);
  }

  async intercept(
    invocationCtx: InvocationContext,
    next: Next,
  ): Promise<InvocationResult> {
    const start = Date.now();
    console.log(
      `Request to ${invocationCtx.targetName} with args:`,
      invocationCtx.args,
    );

    try {
      const result = await next();
      const duration = Date.now() - start;
      console.log(
        `Request to ${invocationCtx.targetName} completed in ${duration}ms.`,
      );
      return result;
    } catch (err) {
      console.error(
        `Error in ${invocationCtx.targetName}:`,
        err.message || err,
      );
      throw err;
    }
  }
}
