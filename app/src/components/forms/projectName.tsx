import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import {
  projectNameSchema,
  ProjectNameSchema,
} from "@/lib/schemas/projectName";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

type Props = {
  onSubmit: (data: ProjectNameSchema) => void;
  loading: boolean;
};

export function ProjectNameForm({ onSubmit, loading }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProjectNameSchema>({
    resolver: zodResolver(projectNameSchema),
    defaultValues: {
      name: "",
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Label htmlFor="name">プロジェクト名</Label>
      <Input
        id="name"
        {...register("name")}
        className={errors ? "border-red-500" : ""}
      />
      {errors.name && (
        <p className="text-sm text-red-500">{errors.name.message}</p>
      )}
      <Button type="submit" disabled={loading} className="w-full">
        作成する
      </Button>
    </form>
  );
}
