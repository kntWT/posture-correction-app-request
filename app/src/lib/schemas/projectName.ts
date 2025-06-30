import { z } from "zod";

export const projectNameSchema = z
  .object({
    name: z
      .string()
      .min(1, "プロジェクト名を入力してください")
      .max(50, "プロジェクト名は50文字以内で入力してください"),
  })
  .required();

export type ProjectNameSchema = z.infer<typeof projectNameSchema>;
