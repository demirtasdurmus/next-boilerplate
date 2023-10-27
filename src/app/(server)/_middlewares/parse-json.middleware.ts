/* eslint-disable import/no-cycle */
import { NextHandler } from 'next-connect';
import { NextRequest } from 'next/server';
import { IBaseRequestContext } from '../_routers/base.router';

/**
 * Parses the request body as JSON and attaches it to the ctx object.
 * as `ctx.payload`.
 *
 * @export
 * @param {NextRequest} req
 * @param {*} ctx
 * @param {NextHandler} next
 * @return {*} {Promise<void>}
 */
export async function parseJsonMiddleware(
  req: NextRequest,
  ctx: IBaseRequestContext,
  next: NextHandler,
): Promise<void> {
  // Only parse the body for POST, PUT, and PATCH requests.
  const methods = ['POST', 'PUT', 'PATCH'];
  if (!methods.includes(req.method.toUpperCase())) return next();

  // Parse the body as JSON and attach it to the ctx object.
  let payload = {};
  try {
    const clonedReq = req.clone();
    payload = await clonedReq.json();
  } catch (error) {
    payload = {};
  }
  ctx.payload = payload;
  return next();
}
