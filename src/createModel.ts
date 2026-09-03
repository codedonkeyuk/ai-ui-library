import { settings } from "./model-settings.ts";

const createModel = () => `
FROM ${settings.from}

  PARAMETER temperature ${settings.temperature}
  PARAMETER top_p ${settings.top_p}
  PARAMETER stop "[${settings.stop}]"
  SYSTEM """
  ${settings.system}
  """
`;

export default createModel;
