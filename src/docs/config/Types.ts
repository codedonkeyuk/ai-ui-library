export interface ConfigPayload {
  baseModel: string;
  parameters: {
    temperature: number;
    top_p: number;
    stop: string;
  };
  systemSettings: string;
  componentInventory: string;
}

export interface OutputProps {
  modelName: string;
  configData: ConfigPayload;
  temperature: number;
  topP: number;
  fullSystemPrompt: string;
}
