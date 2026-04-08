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
import { checkClassCodeAction } from "@/lib/action/classes";
import { createStudentAction } from "@/lib/action/student";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";

const formSchema = z.object({
  classCode: z.string().refine(
    async (v) => {
      if (v.length <= 5) return false;
      else {
        const { error } = await checkClassCodeAction(v);
        return !error;
      }
    },
    { message: "Mã lớp không tồn tại" }
  ),
  name: z.string().nonempty().min(2).max(50),
});

const CreateStudent = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      classCode: "",
      name: "",
    },
    mode: "onBlur",
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { error } = await createStudentAction(values);
    if (error) {
      toast({
        title: "Lỗi",
        description: error,
      });
    } else {
      toast({
        title: "Thành công",
        description: "Tham gia lớp học thành công",
      });
      form.reset();
      setOpen(false);
      router.refresh();
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button asChild className="w-fit mb-2">
        <DialogTrigger>Tham gia lớp học</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tham gia lớp học mới</DialogTitle>
          <DialogDescription>
            Nhận mã lớp từ giáo viên, sau đó nhập vào form kèm với tên để biết
            bạn là ai.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="classCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="000001" {...field} />
                  </FormControl>
                  <FormDescription>
                    Mã lớp học do giáo viên cung cấp
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Lê Văn A" {...field} />
                  </FormControl>
                  <FormDescription>
                    Tên của học sinh để giáo viên nhận biết. Vui lòng dùng tên
                    thật
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Tham gia</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudent;
