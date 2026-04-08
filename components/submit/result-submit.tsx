"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { updateSubmitAction } from "@/lib/action/submit";
import { StudentSelect, SubmitSelect } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  point: z
    .number()
    .min(0, "Điểm không được nhỏ hơn 0")
    .max(10, "Điểm không được lớn hơn 10"),
  feedback: z.string().min(2, "Ít nhất 2 kí tự").max(1000),
});

type Props = {
  submit: SubmitSelect;
  student: StudentSelect;
};

const ResultSubmit = ({ submit, student }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      point: submit.point,
      feedback: submit.feedback || "",
    },
    values: {
      point: submit.point,
      feedback: submit.feedback || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);
    const { error } = await updateSubmitAction(submit.id, {
      point: values.point,
      feedback: values.feedback,
      rated: true,
    });
    setIsLoading(false);
    if (error) {
      toast({
        title: "Lỗi",
        description: error,
      });
    } else {
      toast({
        title: "Thành công",
        description: "Lưu kết quả thành công",
      });
      router.refresh();
    }
  }
  return (
    <div className="w-4/5 mx-auto">
      <h1 className="text-lg">Học sinh: {student.name}</h1>
      <h2>Email: {student.userEmail}</h2>
      <h3>Trạng thái bài nộp: {submit.rated ? "Đã chấm" : "Chưa chấm"}</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="point"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Điểm</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Điểm của bài làm. Điểm từ 0 đến 10.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đánh giá</FormLabel>
                <FormControl>
                  <Textarea placeholder="Good!!!!" {...field} />
                </FormControl>
                <FormDescription>
                  Đánh giá của người tạo bài tập
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isLoading ? "Đang lưu" : "Lưu kết quả"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResultSubmit;
