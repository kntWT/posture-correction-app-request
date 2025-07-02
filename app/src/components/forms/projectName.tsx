import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import {
  projectNameSchema,
  ProjectNameSchema,
} from "@/lib/schemas/projectName";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useEffect } from "react";

type Props = {
  onSubmit: (data: ProjectNameSchema) => void;
  onChange: (data: ProjectNameSchema) => void;
  loading: boolean;
};

export function ProjectNameForm({ onSubmit, onChange, loading }: Props) {
  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<ProjectNameSchema>({
    resolver: zodResolver(projectNameSchema),
    defaultValues: {
      name: "",
    },
  });

  const watchName = watch("name");
  useEffect(() => {
    if (watchName) {
      onChange({ name: watchName });
    }
  }, [watchName, onChange]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Label htmlFor="name">プロジェクト名</Label>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <>
            <Input
              id="name"
              {...field}
              className={errors.name ? "border-red-500" : ""}
              placeholder="プロジェクト名を入力してください"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              作成する
            </Button>
          </>
        )}
      ></Controller>
    </form>
  );
}
