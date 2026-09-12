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
  configData: ConfigPayload;
  fullSystemPrompt: string;
}
