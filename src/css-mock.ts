export async function resolve(
  specifier: string,
  context: any,
  nextResolve: (specifier: string, context: any) => Promise<any>,
): Promise<any> {
  if (specifier.includes(".css")) {
    return {
      format: "module",
      shortCircuit: true,
      url: 'data:text/javascript,export default "";',
    };
  }
  return nextResolve(specifier, context);
}
