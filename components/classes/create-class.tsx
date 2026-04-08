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
import { ToastAction } from "@/components/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "@/hooks/use-toast";
import { createClassesAction } from "@/lib/action/classes";
import { CodeErrorToMessage } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Ít nhất 2 kí tự" })
    .max(50, { message: "Nhiều nhất 50 kí tự" })
    .nonempty({ message: "Không được để trống" }),
  description: z.string().max(500, { message: "Nhiều nhất 500 kí tự" }),
});

type FormData = z.infer<typeof formSchema>;

const CreateClass = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: FormData) {
    setLoading(true);
    const { status, data, error } = await createClassesAction({
      name: values.name,
      description: values.description as string,
    });
    setLoading(false);
    if (status === "success" && data) {
      toast({
        title: "Tạo lớp học thành công",
        description: "Bạn có thể bắt đầu làm việc",
        action: (
          <ToastAction
            altText="Go class"
            onClick={() => router.push(`/classes/${data[0].id}`)}
          >
            Chuyển đến lớp học
          </ToastAction>
        ),
      });
      form.reset();
      router.refresh();
      setOpen(false);
    } else if (error && error === "23505") {
      toast({
        title: "Lỗi",
        description: CodeErrorToMessage[error],
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button asChild className="w-fit mb-2">
        <DialogTrigger>Thêm lớp học</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm lớp học ở đây</DialogTitle>
          <DialogDescription>
            Bạn có thể: <br />
            - Đặt tên lớp học <br />
            - Mô tả lớp học <br />
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên lớp học (bắt buộc)</FormLabel>
                  <FormControl>
                    <Input placeholder="12A1" {...field} />
                  </FormControl>
                  <FormDescription>
                    Tên lớp học giúp hệ thống và bạn quản lí lớp học dễ dàng
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
                  <FormLabel>Mô tả lớp học (tùy chọn)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Đây là lớp học code ảo của 12A1..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Viết mô tả để dễ dàng nhận biết lớp học.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {loading ? "Đang tạo" : "Tạo"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClass;
