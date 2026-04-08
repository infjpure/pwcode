"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { updateProjectAction } from "@/lib/action/project";
import { CodeErrorToMessage, ProjectSelect } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Ít nhất 2 kí tự" })
    .max(100, { message: "Tối đa 100 kí tự" }),
  description: z.string().max(1000, { message: "Tối đa 1000 kí tự" }),
  shared: z.boolean().default(true),
  sharedContent: z.string(),
});

type Props = {
  project: ProjectSelect;
};

const EditProjectButton = ({ project }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: project.name,
      description: project.description as string,
      shared: project.shared,
      sharedContent: (project.sharedContent as string) || "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { error } = await updateProjectAction(project.id, {
      name: values.name,
      description: values.description,
      shared: values.shared,
      sharedContent: values.sharedContent,
    });
    setIsLoading(false);
    if (error) {
      toast({
        title: "Lỗi",
        description: CodeErrorToMessage[error],
      });
    } else {
      toast({
        title: "Thành công",
        description: "Dự án đã được cập nhật",
      });
      form.reset();
      setOpen(false);
      router.refresh();
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button asChild>
        <DialogTrigger>Chỉnh sửa</DialogTrigger>
      </Button>
      <DialogContent className="h-[calc(100vh-8rem)] overflow-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin dự ánán</DialogTitle>
          <DialogDescription>
            Tương tự như tạo mới, bạn hoàn toàn có thể thay đổi thông tin
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên dự án</FormLabel>
                  <FormControl>
                    <Input placeholder="HTML Project" {...field} />
                  </FormControl>
                  <FormDescription>
                    Dự án của bạn tên gì? (2-100 kí tự)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả dự án</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Dự án thực hiện những điều đã được học từ..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Dự án của bạn dùng để làm gì? (tối đa 1000 kí tự)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shared"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Công khai dự án</FormLabel>
                    <FormDescription>
                      Mọi người có thể xem dự án của bạn
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {form.watch("shared") && (
              <FormField
                control={form.control}
                name="sharedContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả dự án</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Cảm ơn bạn đã quan tâm đến dự án này. Mong bạn sẽ học được gì đó từ dự án..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Viết gì đó mà bạn muốn mọi người biết.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit" className="float-end">
              {isLoading ? "Đang lưu..." : "Lưu"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectButton;
