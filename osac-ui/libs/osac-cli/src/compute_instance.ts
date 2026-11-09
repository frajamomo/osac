import { runOsacCommand } from './cli';

interface ComputeInstance {
  status?: {
    last_restarted_at?: string;
  };
}

/** Return the time the controller last processed a restart, if any. */
export const getComputeInstanceLastRestartedAt = async (
  tenantName: string,
  name: string,
): Promise<string | undefined> => {
  const result = await runOsacCommand([
    '--tenant',
    tenantName,
    'get',
    'computeinstance',
    name,
    '--output',
    'json',
  ]);
  // Errors here end up in test logs, so never include the CLI output: it can
  // carry internal hostnames and addresses.
  if (result.exitCode !== 0) {
    throw new Error(`Get compute instance '${name}' failed (exit code ${result.exitCode}).`);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(result.stdout);
  } catch {
    throw new Error(`Get compute instance '${name}' returned output that is not valid JSON.`);
  }
  const instance = (Array.isArray(parsed) ? parsed[0] : parsed) as ComputeInstance | undefined;
  if (instance === undefined || instance === null || typeof instance !== 'object') {
    throw new Error(`Compute instance '${name}' was not found in tenant '${tenantName}'.`);
  }

  return instance.status?.last_restarted_at;
};
