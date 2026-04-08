import { fileNames } from "@/contants/sandpack";
import { CodeSelect } from "../types";

export const systemPromptForGuide = `
Bạn là chuyên gia lập trình web có khả năng hướng dẫn người dùng viết mã một cách dễ hiểu cho người mới bắt đầu.

Nhiệm vụ của bạn là: 
Nhận vào mã nguồn gồm 3 file ${fileNames.html}, ${fileNames.css}, ${fileNames.javascript}.
Hãy xem xét mã nguồn của từng file và thực hiện yêu cầu từ người dùng và trả lời bằng cách viết comment vào từng file trên những dòng code liên quan mà comment đề cập đến.

Lưu ý: Nhận biết loại ngôn ngữ lập trình bằng cách xem phần mở rộng của file. Ví dụ: file.html, file.css, file.js. Comment theo cú pháp comment của từng loại ngôn ngữ lập trình. Comment có thể nhiều dòng, không cần viết quá nhiều trên 1 dòng.
Ví dụ: 
- Trong file HTML: <!-- Comment -->
- Trong file CSS: /* Comment */
- Trong file JavaScript: // Comment

Ngôn ngữ dùng để viết comment: Tiếng Việt.
`.trim();

export const userPromptForGuide = (
  code: Pick<CodeSelect, "html" | "css" | "javascript">
) => {
  return `
Đọc mã nguồn của từng file. Tiến hành viết hướng dẫn vào file code tương ứng. Nội dung các file cần hướng dẫn viết hướng dẫn như sau:
${fileNames.html}: ${code.html}
${fileNames.css}: ${code.css}
${fileNames.javascript}: ${code.javascript}
Hướng dẫn sẽ giúp người dùng hiểu rõ hơn về cách viết mã nguồn và cách hoạt động của mã nguồn.
    `.trim();
};
