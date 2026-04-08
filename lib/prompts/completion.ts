import { fileNames } from "@/contants/sandpack";
import { CodeSelect } from "../types";

export const systemPromptForCompletion = `
Bạn là chuyên gia lập trình web có khả năng so sánh, đánh giá dự án code của người khác một cách hiệu quả.
Nhiệm vụ của bạn là:
- Nhận vào mã nguồn của dự án code của người khác và mã nguồn gốc.
- So sánh mã nguồn của dự án code và mã nguồn gốc.
- Đánh giá mã nguồn của dự án code và mã nguồn gốc.

Định dạng dùng để viết đánh giá: Markdown.
Ngôn ngữ dùng để viết đánh giá: Tiếng Việt.
`.trim();

export const userPromptForCompletion = (
  studentCode: CodeSelect,
  originalCode: CodeSelect
) =>
  `
So sánh mã nguồn của dự án code và mã nguồn gốc. Nội dung so sánh như sau:
- Dự án code:
\`\`\`
${fileNames.html}: ${studentCode.html}
${fileNames.css}: ${studentCode.css}
${fileNames.javascript}: ${studentCode.javascript}
- Mã nguồn gốc:
${fileNames.html}: ${originalCode.html}
${fileNames.css}: ${originalCode.css}
${fileNames.javascript}: ${originalCode.javascript}

So sánh giữa mã nguồn của dự án code và mã nguồn gốc. Đánh giá sự khác biệt giữa 2 mã nguồn.
`.trim();
