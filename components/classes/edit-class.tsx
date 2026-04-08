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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "@/hooks/use-toast";
import { updateClassesAction } from "@/lib/action/classes";
import { ClassSelect, CodeErrorToMessage } from "@/lib/types";
import { Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { ToastAction } from "../ui/toast";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Ít nhất 2 kí tự" })
    .max(50, { message: "Nhiều nhất 50 kí tự" })
    .nonempty({ message: "Không được để trống" }),
  description: z.string().max(500, { message: "Nhiều nhất 500 kí tự" }),
});

type FormData = z.infer<typeof formSchema>;

type Props = {
  classroom: ClassSelect;
};

const EditClass = ({ classroom }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: classroom.name,
      description: classroom.description || "",
    },
  });

  async function onSubmit(values: FormData) {
    setLoading(true);
    console.log(values);
    const { status, data, error } = await updateClassesAction(classroom.id, {
      name: values.name,
      description: values.description as string,
    });
    setLoading(false);
    if (status === "success" && data) {
      toast({
        title: "Thành công",
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
      router.refresh();
      setOpen(false);
    } else if (error && error === "23505") {
      form.setError("name", {
        type: "manual",
        message: CodeErrorToMessage[error],
      });
    } else {
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi",
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button asChild className="w-fit">
        <DialogTrigger>
          <Edit2 />
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Điều chỉnh lớp học ở đây</DialogTitle>
          <DialogDescription>
            Bạn có thể: <br />
            - Thay đổi tên lớp học <br />
            - Điểu chỉnh mô tả lớp học <br />
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
              {loading ? "Đang lưu" : "Lưu"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditClass;
