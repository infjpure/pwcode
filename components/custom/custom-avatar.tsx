import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  name: string;
  src: string;
  type: "name-left" | "name-right";
};

const Name = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="hidden font-bold md:block">{children}</h1>;
};

const CustomAvatar = ({ name, src, type }: Props) => {
  return (
    <div className="flex items-center gap-2">
      {type === "name-left" && <Name>{name}</Name>}
      <Avatar>
        <AvatarImage src={src} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {type === "name-right" && <Name>{name}</Name>}
    </div>
  );
};

export default CustomAvatar;
