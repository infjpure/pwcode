import { AssignmentSelect } from "@/lib/types";

type Props = {
  assign: AssignmentSelect;
};
const InfoAssign = ({ assign }: Props) => {
  return (
    <div>
      <h2>{assign.name}</h2>
      <div dangerouslySetInnerHTML={{ __html: assign.description as string }} />
    </div>
  );
};

export default InfoAssign;
