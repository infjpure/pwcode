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
import { createProjectAction } from "@/lib/action/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { ToastAction } from "../ui/toast";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Ít nhất 2 kí tự" })
    .max(100, { message: "Tối đa 100 kí tự" }),
  description: z.string().max(1000, { message: "Tối đa 1000 kí tự" }),
  shared: z.boolean().default(true),
  sharedContent: z.string(),
});

const CreateProjectButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      shared: true,
      sharedContent: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { error, data } = await createProjectAction({
      name: values.name,
      description: values.description,
      shared: values.shared,
      sharedContent: values.sharedContent,
    });
    setIsLoading(false);
    if (error) {
      toast({
        title: "Lỗi",
        description: error,
      });
    } else if (data) {
      toast({
        title: "Thành công",
        description: "Dự án đã được tạo",
        action: (
          <ToastAction
            altText="Go project"
            onClick={() => router.push(`/projects/${data[0].id}`)}
          >
            Đến dự án
          </ToastAction>
        ),
      });
      form.reset();
      setOpen(false);
      router.refresh();
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button asChild className="mb-2">
        <DialogTrigger>Dự án mới</DialogTrigger>
      </Button>
      <DialogContent className="h-[calc(100vh-8rem)] overflow-auto">
        <DialogHeader>
          <DialogTitle>Tạo dự án mới</DialogTitle>
          <DialogDescription>
            Bạn có thể tạo dự án, viết mô tả, công khai dự án
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
              {isLoading ? "Đang tạo..." : "Tạo dự án"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectButton;
