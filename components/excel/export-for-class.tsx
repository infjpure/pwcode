"use client";
import { toast } from "@/hooks/use-toast";
import { exportForClassAction } from "@/lib/action/classes";
import { ClassSelect } from "@/lib/types";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "../ui/button";

type Props = {
  classroom: ClassSelect;
};

const ExportForClass = ({ classroom }: Props) => {
  const [host, setHost] = useState("");

  useEffect(() => {
    setHost(window.location.host); // Lấy tên host từ trình duyệt
  }, []);

  const handleExport = async () => {
    // Dữ liệu mẫu
    const { error, data } = await exportForClassAction(classroom.id);

    if (error) {
      toast({
        title: "Lỗi",
        description: "Lỗi khi xuất file",
      });
    }

    const workbook = XLSX.utils.book_new();

    const infoWorksheet = XLSX.utils.json_to_sheet([
      {
        "Tên lớp": classroom.name,
        "Mô tả lớp học": classroom.description,
        "Mã lớp": classroom.classCode,
        "Ngày tạo": classroom.createdAt.toLocaleString(),
        "Thời gian xuất file": new Date().toLocaleString(),
      },
    ]);

    XLSX.utils.book_append_sheet(
      workbook,
      infoWorksheet,
      "Thông tin lớp".slice(0, 31)
    );

    data?.forEach((item) => {
      // Chuyển dữ liệu thành worksheet
      const worksheet = XLSX.utils.json_to_sheet(
        item.submits.map((s) => ({
          ...s,
          "Link Bài tập": `https://${host}/assign/${item.id}`,
        }))
      );
      // Thêm worksheet vào
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        item.sheetName.slice(0, 31)
      );
    });

    // Xuất workbook thành file Excel
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Tạo file và tải xuống
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataBlob, `${classroom.name}-${new Date().toLocaleString()}.xlsx`);
  };

  return <Button onClick={handleExport}>Xuất Excel</Button>;
};

export default ExportForClass;
