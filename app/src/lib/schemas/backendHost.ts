import { backendHostNames } from "@/configs/backend-host";
import { z } from "zod";

export const backendHostSchema = z
  .object({
    backendHost: z
      .enum(backendHostNames, {
        required_error: "バックエンドホストを選択してください",
        invalid_type_error: "バックエンドホストは選択肢から選んでください",
      })
      .refine((value) => backendHostNames.includes(value), {
        message: "選択肢にないバックエンドホストが選ばれています",
      }),
  })
  .required();

export type BackendHostFormSchema = z.infer<typeof backendHostSchema>;
